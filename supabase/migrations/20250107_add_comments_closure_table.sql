-- Add comments feature using Closure Table pattern for hierarchical comments

-- Create comments table
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  doujinshi_id UUID NOT NULL REFERENCES public.doujinshi(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_edited BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create comment_closure table for hierarchical relationships
CREATE TABLE IF NOT EXISTS public.comment_closure (
  ancestor_id UUID NOT NULL REFERENCES public.comments(id) ON DELETE CASCADE,
  descendant_id UUID NOT NULL REFERENCES public.comments(id) ON DELETE CASCADE,
  depth INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (ancestor_id, descendant_id)
);

-- Enable RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comment_closure ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX idx_comments_doujinshi_id ON public.comments(doujinshi_id);
CREATE INDEX idx_comments_user_id ON public.comments(user_id);
CREATE INDEX idx_comments_created_at ON public.comments(created_at DESC);
CREATE INDEX idx_comment_closure_ancestor ON public.comment_closure(ancestor_id);
CREATE INDEX idx_comment_closure_descendant ON public.comment_closure(descendant_id);
CREATE INDEX idx_comment_closure_depth ON public.comment_closure(depth);

-- RLS Policies for comments
-- Everyone can view non-deleted comments
CREATE POLICY "Public comments are viewable by everyone" ON public.comments
  FOR SELECT USING (is_deleted = FALSE);

-- Authenticated users can create comments
CREATE POLICY "Authenticated users can create comments" ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = user_id AND is_deleted = FALSE);

-- Users can update their own comments
CREATE POLICY "Users can update own comments" ON public.comments
  FOR UPDATE USING (auth.uid() = user_id AND is_deleted = FALSE);

-- Users can soft delete their own comments
CREATE POLICY "Users can soft delete own comments" ON public.comments
  FOR UPDATE USING (auth.uid() = user_id) 
  WITH CHECK (is_deleted = TRUE);

-- RLS Policies for comment_closure
-- Everyone can view comment relationships
CREATE POLICY "Comment relationships are viewable by everyone" ON public.comment_closure
  FOR SELECT USING (true);

-- Only system can manage closure table (through functions)
CREATE POLICY "System manages closure table" ON public.comment_closure
  FOR ALL USING (false);

-- Function to insert a new root comment
CREATE OR REPLACE FUNCTION public.insert_root_comment(
  p_doujinshi_id UUID,
  p_content TEXT
) RETURNS UUID AS $$
DECLARE
  v_comment_id UUID;
BEGIN
  -- Insert the comment
  INSERT INTO public.comments (doujinshi_id, user_id, content)
  VALUES (p_doujinshi_id, auth.uid(), p_content)
  RETURNING id INTO v_comment_id;
  
  -- Insert self-reference in closure table
  INSERT INTO public.comment_closure (ancestor_id, descendant_id, depth)
  VALUES (v_comment_id, v_comment_id, 0);
  
  RETURN v_comment_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to insert a reply to a comment
CREATE OR REPLACE FUNCTION public.insert_reply_comment(
  p_parent_id UUID,
  p_content TEXT
) RETURNS UUID AS $$
DECLARE
  v_comment_id UUID;
  v_doujinshi_id UUID;
BEGIN
  -- Get doujinshi_id from parent comment
  SELECT doujinshi_id INTO v_doujinshi_id
  FROM public.comments
  WHERE id = p_parent_id;
  
  IF v_doujinshi_id IS NULL THEN
    RAISE EXCEPTION 'Parent comment not found';
  END IF;
  
  -- Insert the comment
  INSERT INTO public.comments (doujinshi_id, user_id, content)
  VALUES (v_doujinshi_id, auth.uid(), p_content)
  RETURNING id INTO v_comment_id;
  
  -- Insert closure records
  -- Self-reference
  INSERT INTO public.comment_closure (ancestor_id, descendant_id, depth)
  VALUES (v_comment_id, v_comment_id, 0);
  
  -- Copy all ancestors of parent and increment depth
  INSERT INTO public.comment_closure (ancestor_id, descendant_id, depth)
  SELECT ancestor_id, v_comment_id, depth + 1
  FROM public.comment_closure
  WHERE descendant_id = p_parent_id;
  
  RETURN v_comment_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get comment thread with hierarchy
CREATE OR REPLACE FUNCTION public.get_comment_thread(p_doujinshi_id UUID)
RETURNS TABLE (
  comment_id UUID,
  user_id UUID,
  username TEXT,
  avatar_url TEXT,
  content TEXT,
  is_edited BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  depth INTEGER,
  parent_id UUID
) AS $$
BEGIN
  RETURN QUERY
  WITH comment_tree AS (
    SELECT 
      c.id,
      c.user_id,
      c.content,
      c.is_edited,
      c.created_at,
      c.updated_at,
      cc.depth,
      CASE 
        WHEN cc.depth = 0 THEN NULL
        ELSE (
          SELECT ancestor_id 
          FROM public.comment_closure cc2 
          WHERE cc2.descendant_id = c.id 
          AND cc2.depth = 1
        )
      END as parent_id
    FROM public.comments c
    JOIN public.comment_closure cc ON c.id = cc.descendant_id
    WHERE c.doujinshi_id = p_doujinshi_id
    AND c.is_deleted = FALSE
    AND cc.ancestor_id = c.id
  )
  SELECT 
    ct.id,
    ct.user_id,
    p.username,
    p.avatar_url,
    ct.content,
    ct.is_edited,
    ct.created_at,
    ct.updated_at,
    ct.depth,
    ct.parent_id
  FROM comment_tree ct
  LEFT JOIN public.profiles p ON ct.user_id = p.id
  ORDER BY ct.created_at ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get direct replies to a comment
CREATE OR REPLACE FUNCTION public.get_comment_replies(p_comment_id UUID)
RETURNS TABLE (
  comment_id UUID,
  user_id UUID,
  username TEXT,
  avatar_url TEXT,
  content TEXT,
  is_edited BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.user_id,
    p.username,
    p.avatar_url,
    c.content,
    c.is_edited,
    c.created_at,
    c.updated_at
  FROM public.comments c
  JOIN public.comment_closure cc ON c.id = cc.descendant_id
  LEFT JOIN public.profiles p ON c.user_id = p.id
  WHERE cc.ancestor_id = p_comment_id
  AND cc.depth = 1
  AND c.is_deleted = FALSE
  ORDER BY c.created_at ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get comment count for a doujinshi
CREATE OR REPLACE FUNCTION public.get_comment_count(p_doujinshi_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM public.comments
    WHERE doujinshi_id = p_doujinshi_id
    AND is_deleted = FALSE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add trigger to update updated_at on comments
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
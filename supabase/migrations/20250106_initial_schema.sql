-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  cover_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create doujinshi table
CREATE TABLE IF NOT EXISTS public.doujinshi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  page_total INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create doujinshi_pages table
CREATE TABLE IF NOT EXISTS public.doujinshi_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  doujinshi_id UUID NOT NULL REFERENCES public.doujinshi(id) ON DELETE CASCADE,
  page_number INTEGER NOT NULL,
  page_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(doujinshi_id, page_number)
);

-- Create user_likes table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS public.user_likes (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  doujinshi_id UUID NOT NULL REFERENCES public.doujinshi(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, doujinshi_id)
);

-- Create RLS policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doujinshi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doujinshi_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_likes ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Doujinshi policies
CREATE POLICY "Doujinshi are viewable by everyone" ON public.doujinshi
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can upload doujinshi" ON public.doujinshi
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update own doujinshi" ON public.doujinshi
  FOR UPDATE USING (auth.uid() = uploaded_by);

CREATE POLICY "Users can delete own doujinshi" ON public.doujinshi
  FOR DELETE USING (auth.uid() = uploaded_by);

-- Doujinshi pages policies
CREATE POLICY "Doujinshi pages are viewable by everyone" ON public.doujinshi_pages
  FOR SELECT USING (true);

CREATE POLICY "Users can manage pages of their doujinshi" ON public.doujinshi_pages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.doujinshi 
      WHERE id = doujinshi_pages.doujinshi_id 
      AND uploaded_by = auth.uid()
    )
  );

-- User likes policies
CREATE POLICY "Likes are viewable by everyone" ON public.user_likes
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own likes" ON public.user_likes
  FOR ALL USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_doujinshi_created_at ON public.doujinshi(created_at DESC);
CREATE INDEX idx_doujinshi_uploaded_by ON public.doujinshi(uploaded_by);
CREATE INDEX idx_doujinshi_pages_doujinshi_id ON public.doujinshi_pages(doujinshi_id);
CREATE INDEX idx_user_likes_user_id ON public.user_likes(user_id);
CREATE INDEX idx_user_likes_doujinshi_id ON public.user_likes(doujinshi_id);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_doujinshi_updated_at BEFORE UPDATE ON public.doujinshi
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
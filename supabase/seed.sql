-- Seed data for development

-- Insert test user (password: password123)
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'test@example.com',
  '$2a$10$PkfLLsYM8JC5K0i7mY1yN.N9o3.9fz0QzJ9vJL8r2Xq3kzMz.YYkO',
  NOW(),
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Update test user profile
UPDATE public.profiles
SET 
  username = 'testuser',
  bio = 'This is a test user account',
  avatar_url = '/mock/mock-header-avatar.svg',
  cover_url = '/mock/user-cover.png'
WHERE id = '00000000-0000-0000-0000-000000000001';

-- Insert sample doujinshi
INSERT INTO public.doujinshi (id, title, thumbnail, page_total, uploaded_by) VALUES
  ('10000000-0000-0000-0000-000000000001', '[クロミ] 新作 異世界の出会いを大切にしました。ましたた。た。た。た。', '/mock/kuromi-isekai-deai.jpg', 24, '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000002', '[Scarlett Ann] JASHIN Reunion [English]', '/mock/scarlett-ann-jashin-reunion.jpg', 32, '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000003', '[COMICTOU] NakamotoAyaSeiyaku', '/mock/comictou-nakamoto-aya-seiyaku.jpg', 18, '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000004', 'Werewolf [Tokoro Soku] Koi (Futari wa Precure)', '/mock/werewolf-koi-precure.png', 28, '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000005', 'フリーレン 4', '/mock/frieren-4.jpg', 22, '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000006', '[Momonomi Plus (Momonomi)] Hahaoya Damasite Musume Tyoukyou [Digital]', '/mock/momonomi-plus-hahaoya-damasite.jpg', 16, '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000007', '[Over.J & Choi TaeYoung] Family with Benefits [Ch. 1- 49.5] [English] [The Blank] [On Hiatus]', '/mock/overj-choi-family-with-benefits.jpg', 30, '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000008', '[ie] Kouseinou AI Sexaroid  Highly Advanced Sex Android [English] [CarlJPTL]', '/mock/ie-kouseinou-ai-sexaroid.jpg', 26, '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000009', 'Demon (♂) vs Angel (♂) Battle', '/mock/demon-vs-angel-battle.jpg', 26, '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000010', '[Aweida] Iincho no Kuse ni Yuri Sex Chou Umakute Maji  Mukatsuku  She''s Crazy Good at Yuri Sex Despite Being the Student President and it Seriously Pisses Me Off [English] [Pangean]', '/mock/aweida-iincho-yuri-sex.jpg', 26, '00000000-0000-0000-0000-000000000001')
ON CONFLICT (id) DO NOTHING;

-- Insert sample pages for first doujinshi
INSERT INTO public.doujinshi_pages (doujinshi_id, page_number, page_url) VALUES
  ('10000000-0000-0000-0000-000000000001', 1, '/mock/mock-detail/detail-1.png'),
  ('10000000-0000-0000-0000-000000000001', 2, '/mock/mock-detail/detail-2.png'),
  ('10000000-0000-0000-0000-000000000001', 3, '/mock/mock-detail/detail-3.png'),
  ('10000000-0000-0000-0000-000000000001', 4, '/mock/mock-detail/detail-4.png')
ON CONFLICT (doujinshi_id, page_number) DO NOTHING;

-- Insert sample likes
INSERT INTO public.user_likes (user_id, doujinshi_id) VALUES
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002'),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000004'),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000008'),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000009')
ON CONFLICT (user_id, doujinshi_id) DO NOTHING;

-- Insert sample comments (using direct inserts for seeding)
-- Root comments
INSERT INTO public.comments (id, doujinshi_id, user_id, content) VALUES
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'This is an amazing work! The art style is incredible.'),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'I love the character development in this one.'),
  ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Great story! Looking forward to more.')
ON CONFLICT (id) DO NOTHING;

-- Insert closure table entries for root comments
INSERT INTO public.comment_closure (ancestor_id, descendant_id, depth) VALUES
  ('20000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 0),
  ('20000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 0),
  ('20000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000003', 0)
ON CONFLICT (ancestor_id, descendant_id) DO NOTHING;

-- Reply comments
INSERT INTO public.comments (id, doujinshi_id, user_id, content) VALUES
  ('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'I totally agree! The artist has really improved.'),
  ('20000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Yes! The details are amazing.')
ON CONFLICT (id) DO NOTHING;

-- Insert closure table entries for replies
INSERT INTO public.comment_closure (ancestor_id, descendant_id, depth) VALUES
  -- Reply to first comment
  ('20000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000004', 0),
  ('20000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000004', 1),
  -- Nested reply to the reply
  ('20000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000005', 0),
  ('20000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000005', 1),
  ('20000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000005', 2)
ON CONFLICT (ancestor_id, descendant_id) DO NOTHING;
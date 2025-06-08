-- Initialize storage bucket and policies for profile images
BEGIN;

-- Create profiles bucket for user profile avatars and banners
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'profiles',
    'profiles', 
    true,
    5242880, -- 5MB
    array['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for profiles bucket

-- 1. Anyone can view profile images
CREATE POLICY "Profile images are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'profiles');

-- 2. Users can upload images to their own folder
CREATE POLICY "Users can upload own profile images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'profiles' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- 3. Users can update their own profile images
CREATE POLICY "Users can update own profile images"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'profiles' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- 4. Users can delete their own profile images
CREATE POLICY "Users can delete own profile images"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'profiles' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

COMMIT;
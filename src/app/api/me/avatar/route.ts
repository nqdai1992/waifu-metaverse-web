import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
  try {
    const supabase = await createClient()
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated', code: 'AUTH_ERROR' },
        { status: 401 }
      )
    }
    
    // Get form data
    const formData = await request.formData()
    const file = formData.get('avatar') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided', code: 'NO_FILE' },
        { status: 400 }
      )
    }
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Please upload a JPG or PNG image', code: 'INVALID_TYPE' },
        { status: 400 }
      )
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Image size must be less than 5MB', code: 'FILE_TOO_LARGE' },
        { status: 400 }
      )
    }
    
    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Generate file name
    const fileExt = file.name.split('.').pop()
    const fileName = `avatar.${fileExt}`
    const filePath = `${user.id}/${fileName}`
    
    // Upload to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from('profiles')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false
      })
    
    if (uploadError) {
      return NextResponse.json(
        { error: `Failed to upload image: ${uploadError.message}`, code: 'UPLOAD_FAILED' },
        { status: 400 }
      )
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('profiles')
      .getPublicUrl(filePath)
    
    // Update profile with new avatar URL
    const { data: profile, error: updateError } = await supabase
      .from('profiles')
      .update({ 
        avatar_url: publicUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single()
    
    if (updateError) {
      // Try to delete the uploaded file if profile update fails
      await supabase.storage.from('profiles').remove([filePath])
      
      return NextResponse.json(
        { error: `Failed to update profile: ${updateError.message}`, code: 'UPDATE_FAILED' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({ profile, avatarUrl: publicUrl }, { status: 200 })
  } catch (error) {
    console.error('Avatar upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}
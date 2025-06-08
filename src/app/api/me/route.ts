import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { Profile } from '@/features/profile/types'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) {
      return NextResponse.json(
        { error: `Authentication error: ${authError.message}`, code: 'AUTH_ERROR' },
        { status: 401 }
      )
    }
    
    if (!user) {
      return NextResponse.json(
        { error: 'No authenticated user found', code: 'NO_USER' },
        { status: 401 }
      )
    }
    
    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    
    if (profileError) {
      // If profile doesn't exist, create it
      if (profileError.code === 'PGRST116') { // Not found error
        console.log('Profile not found, creating new profile for user:', user.id)
        
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({ id: user.id, avatar_url: user.user_metadata.avatar_url ?? null, email: user.email ?? null })
          .select()
          .single()
        
        if (createError) {
          return NextResponse.json(
            { error: `Failed to create profile: ${createError.message}`, code: 'CREATE_FAILED' },
            { status: 400 }
          )
        }
        
        return NextResponse.json({ profile: newProfile }, { status: 200 })
      }
      
      return NextResponse.json(
        { error: `Failed to fetch profile: ${profileError.message}`, code: 'FETCH_FAILED' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({ profile }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

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
    
    // Parse request body
    const updates = await request.json()
    
    // Validate updates
    const allowedFields = ['full_name', 'bio', 'phone', 'avatar_url', 'email']
    const sanitizedUpdates: Partial<Profile> = {}
    
    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        if (value !== null) {
          sanitizedUpdates[key as keyof Profile] = value
        }
      }
    }
    
    // Add updated_at timestamp
    sanitizedUpdates.updated_at = new Date().toISOString()
    
    const { data, error } = await supabase
      .from('profiles')
      .update(sanitizedUpdates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: `Failed to update profile: ${error.message}`, code: 'UPDATE_FAILED' },
        { status: 400 }
      )
    }

    return NextResponse.json({ profile: data }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
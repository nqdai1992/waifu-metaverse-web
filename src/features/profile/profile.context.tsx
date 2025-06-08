'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { Profile, ProfileError } from './types';
import { createClient } from '@/utils/supabase/client';

interface ProfileContextType {
  profile: Profile | null;
  loading: boolean;
  error: ProfileError | null;
  refetchProfile: () => Promise<void>;
  setProfile: (profile: Profile | null) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ProfileError | null>(null);
  
  // Create supabase client once using useMemo
  const supabase = useMemo(() => createClient(), []);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/me');
      const data = await response.json();
      
      if (!response.ok) {
        throw new ProfileError(data.error || 'Failed to fetch profile', data.code || 'FETCH_FAILED');
      }
      
      setProfile(data.profile);
    } catch (error) {
      if (error instanceof ProfileError) {
        setError(error);
        // Only set profile to null if it's an auth error
        if (error.code === 'AUTH_ERROR' || error.code === 'NO_USER') {
          setProfile(null);
        }
      } else {
        setError(new ProfileError('Failed to fetch profile', 'UNKNOWN_ERROR'));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setError(null);
      
      if (event === 'SIGNED_IN' && session?.user) {
        // Fetch profile through API
        fetchProfile();
      } else if (event === 'SIGNED_OUT') {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile, supabase]);

  const value = useMemo(
    () => ({
      profile,
      loading,
      error,
      refetchProfile: fetchProfile,
      setProfile
    }),
    [profile, loading, error, fetchProfile]
  );

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
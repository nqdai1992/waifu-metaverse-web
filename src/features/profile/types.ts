import { Database } from '@/types/database.types'

export type Profile = Database['public']['Tables']['profiles']['Row']

export class ProfileError extends Error {
  constructor(message: string, public code: string) {
    super(message)
    this.name = 'ProfileError'
  }
}

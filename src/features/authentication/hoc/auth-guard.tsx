

// Component Imports
import AuthRedirect from './auth-redirect'
import { PropsWithChildren } from 'react'
import { getServerSession } from "@/utils/supabase/server";

export default async function AuthGuard({ children }: PropsWithChildren) {
  const session = await getServerSession()

  return <>{session ? children : <AuthRedirect />}</>
}
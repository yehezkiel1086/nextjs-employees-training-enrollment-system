import 'server-only'
 
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { redirect } from 'next/navigation'
 
export const verifySession = async () => {
  const cookie = (await cookies()).get('jwt_token')?.value
  const session = await decrypt(cookie)
 
  if (!session?.email) {
    redirect('/login')
  }
 
  return {
    isAuth: true,
    email: session.email,
    name: session.name,
    role: session.role,
    jwt_token: cookie,
  };
}

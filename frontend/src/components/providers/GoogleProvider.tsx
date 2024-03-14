import ENV from '@/lib/environment'
import { GoogleOAuthProvider } from '@react-oauth/google'

export default function GoogleProvider({ children }: { children: React.ReactNode }) {
  return <GoogleOAuthProvider clientId={ENV.googleClientId}>{children}</GoogleOAuthProvider>
}

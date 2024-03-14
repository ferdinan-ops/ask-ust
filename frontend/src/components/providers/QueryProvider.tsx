import { QueryClient, QueryClientProvider } from 'react-query'
import * as React from 'react'

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient())

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

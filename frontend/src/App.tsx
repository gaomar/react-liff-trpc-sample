import './App.css'
import { useState } from 'react'
import { Router } from './routes/Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCReact } from '@trpc/react-query'
import { httpLink } from '@trpc/client'
import CssBaseline from '@mui/material/CssBaseline'
import { type ApiRouter } from 'backend/src/trpc'
import { LoadingContextProvider } from './libs/loading/Loading'

export const trpc = createTRPCReact<ApiRouter>()
const createTRPCClient = () => {
  return trpc.createClient({
    links: [
      httpLink({
        url: '/api'
      })
    ]
  })
}

function App () {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() => createTRPCClient())

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <LoadingContextProvider>
          <Router />
        </LoadingContextProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App

"use client"

import { authClient } from "@/lib/auth-client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { UnauthorizedCard } from "./unauthorized-card"
import { PageSkeleton } from "./page-skeleton"

const queryClient = new QueryClient()

export function WrapperWithQuery(props: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  )
}

export function ProtectedWrapper(props: { children: React.ReactNode }) {
  const { data, isPending } = authClient.useSession()
  if (isPending) {
    return <PageSkeleton />
  }

  if (!data) {
    return <UnauthorizedCard />
  }

  return <>{props.children}</>
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ComponentProps } from "react"
export function RQProvider(props: ComponentProps<"div">) {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            {props.children}
        </QueryClientProvider>
    )
}

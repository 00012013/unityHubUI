import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RQProvider } from "./components/query-client-provider";
import { ThemeProvider } from "./components/ui/theme-provider";
import { RootLayout } from "./layout";
function App() {
    
    return (
        <RQProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <RootLayout />
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={true} />
        </RQProvider>
    )
}

export default App

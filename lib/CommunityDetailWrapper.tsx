import ReactQueryProvider from "./react-query-provider"

export const CommunityDetailWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReactQueryProvider>
            {children}
        </ReactQueryProvider>
    )
}
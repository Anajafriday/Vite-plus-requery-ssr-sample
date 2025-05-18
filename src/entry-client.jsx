import './index.css'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'
import { hydrate, HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'
import Index from './routes'
import { HelmetProvider } from 'react-helmet-async'
// import helmetSycn from 'react-helmet-async'
// const { HelmetProvider } = helmetSycn

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// const { HelmetProvider } = helmet
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      experimental_prefetchInRender: true,
    }
  }
})
const dehydratedState = window.__REACT_QUERY_STATE__;
hydrate(queryClient)
hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <HelmetProvider>
      <App>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <BrowserRouter>
              <Index />
            </BrowserRouter>
          </HydrationBoundary>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </App>
    </HelmetProvider>
  </StrictMode>,
)

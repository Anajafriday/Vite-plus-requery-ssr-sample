import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import App from './App'
import { StaticRouter } from 'react-router'
import Index from './routes'
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { getMenu, getMenus } from './lib/apiMenu'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import helmetSycn from 'react-helmet-async'
// const { HelmetProvider } = helmetSycn
/**
 * @param {string} url
 * @param {import('react-dom/server').RenderToPipeableStreamOptions} [options]
 */
const prefetchData = async (queryClient, url) => {
  const match = url.match(/\/menu\/(\d+)/);
  const menuId = match ? match[1] : null;
  await queryClient.prefetchQuery({ queryKey: ['menus'], queryFn: async () => await getMenus() })
  await queryClient.prefetchQuery({ queryKey: ['menu', menuId], queryFn: async () => await getMenu(Number(menuId)) })

}
export async function render(url, options, others) {
  // console.log({ url })
  const { queryClient, helmetContext, dehydratedState } = others
  await prefetchData(queryClient, url)
  const app = <StrictMode>
    <HelmetProvider context={helmetContext}>
      <App>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <StaticRouter location={url}>
              <Index />
            </StaticRouter>
          </HydrationBoundary>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </App>
    </HelmetProvider>
  </StrictMode>
  return renderToPipeableStream(
    app,
    options,
  )
}

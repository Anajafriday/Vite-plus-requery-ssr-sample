import fs from 'node:fs/promises'
import express from 'express'
import { Transform } from 'node:stream'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { console } from 'node:inspector'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'
const ABORT_DELAY = 10000
// resolved dirname in esmodule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

// Create http server
const app = express()

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}
app.use(express.static(path.resolve(__dirname, 'dist'))); // or 'public'
// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    /** @type {string} */
    let template
    /** @type {import('./src/entry-server.jsx').render} */
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }
    const helmetContext = {}
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
          experimental_prefetchInRender: true,
        }
      }
    })

    let didError = false
    const dehydratedState = dehydrate(queryClient)
    const { pipe, abort } = await render(`/${url}`, {
      onShellError(error) {
        console.log(error)
        res.status(500)
        res.set({ 'Content-Type': 'text/html' })
        res.send(`
          <center>
          <div width="500px">
          <h1>Something went wrong</h1>
          <p>${error}</p>
          </div>
          </center>`)
      },
      onShellReady() {
        res.status(didError ? 500 : 200)
        res.set({ 'Content-Type': 'text/html' })

        const transformStream = new Transform({
          transform(chunk, encoding, callback) {
            res.write(chunk, encoding)
            callback()
          },
        })

        const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`)
        const { helmet } = helmetContext
        const appHead =
          `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <link rel="stylesheet" href="/src/index.css">
        `
        const fullStart = htmlStart.replace('<!--app-head-->', appHead)

        res.write(fullStart)
        console.log(`${fullStart}${htmlEnd}`)
        transformStream.on('finish', () => {
          res.end(htmlEnd.replace("<!--app-script-->", `<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)};</script>`))
        })

        pipe(transformStream)
      },
      onError(error) {
        didError = true
        console.error(error)
      },
    }, {
      helmetContext,
      dehydratedState,
      queryClient
    })
    setTimeout(() => {
      abort()
    }, ABORT_DELAY)
    console.log("RUNNING....")
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
console.log(`Server 1 started at http://localhost:${port}`)
app.listen(port, () => {
  console.log(`Server 2 started at http://localhost:${port}`)
})
console.log(`Server 3 started at http://localhost:${port}`)

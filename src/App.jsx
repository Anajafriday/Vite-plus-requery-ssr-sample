import { useEffect, useState } from "react"

function App({ children }) {
  console.log("Render on", typeof window !== 'undefined' ? "client" : "server")

  // const [hydrated, setHydrated] = useState(false)
  // useEffect(() => {
  //   setHydrated(true)
  // }, [])
  // if (!hydrated) { return null }
  return children
}

export default App

import { Route } from "react-router"
import { Routes } from "react-router"
import { lazy, Suspense } from "react"
import { Navigate } from "react-router"
import { useQueryClient } from "@tanstack/react-query"
import { useGetMenus } from "../features/menu/useGetMenus"

const Home = lazy(() => import("../pages/Home"))
const Menu = lazy(() => import("../pages/Menu"))
const MenuList = lazy(() => import("../features/menu/MenuList"))
const MenuDetails = lazy(() => import("../features/menu/MenuDetails"))
const Contact = lazy(() => import("../pages/Contact"))


function Index() {
    return (
        // <Suspense fallback={<p>SUSPENSING...</p>}>
        <Routes>
            <Route
                path="/"
                index
                element={<Home />}
            />

            <Route
                index
                element={<Navigate to="/menu" />}
            />

            <Route
                path="/menu"
                element={<MenuList />}
            // loader={() => {
            //     console.log("LOAIFNFNF")

            //     const queryClient = useQueryClient()
            //     queryClient.prefetchQuery({
            //         queryKey: ["menus"],
            //         queryFn: async () => await getMenus()
            //     })
            //     const { isLoading, recipes } = useGetMenus()
            //     return { isLoading, recipes }
            // }}
            />

            <Route
                path="/menu/:id/:title"
                hydrateFallbackElement={<p>LOADING...</p>}
                element={<MenuDetails />}

            />

            <Route
                path="/contact"
                hydrateFallbackElement={<p>LOADING...</p>}
                element={<Contact />}
            />
        </Routes>

        // </Suspense>
    )
}

export default Index

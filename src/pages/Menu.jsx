import { Outlet } from "react-router"

function Menu() {
    return (
        <div className="bg-grey-light1 min-h-screen px-4 py-8">
            <Outlet />
        </div>
    )
}

export default Menu

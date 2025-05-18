import { Link } from "react-router"

function Navbar() {
    return (
        <div className="flex justif">
            <div>
                <p>SSRMENU</p>
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </div>
    )
}

export default Navbar

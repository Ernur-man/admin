import { Link } from "react-router-dom"
import './header.less'
export default function Header() {
    return(
        <header>
            <div className="container">
                <h2>LOGO</h2>
                <menu>
                    <Link to="/">Home</Link>
                    <Link to={"/admin"}>Admin</Link>
                </menu>
            </div>
        </header>
    )
}
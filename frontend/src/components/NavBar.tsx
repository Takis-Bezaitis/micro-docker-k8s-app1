import { Link } from "react-router";
import { navLinks } from "../routes/navLinks";

const NavBar = () => {
  return (
    <nav className="navbar">
        <ul className="flex gap-4">
            {navLinks.map((link) => (
                <li key={link.label}>
                    <Link to={link.to}>
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default NavBar;
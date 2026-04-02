

import Link from 'next/link';
import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <header>
      <nav className="navbar">
        {/* Left Navigation */}
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/properties">Properties</Link></li>
          <li><Link href="/about">About Us</Link></li>
          <li className="dropdown">
            <details>
              <summary>Services</summary>
              <ul className="dropdown-menu">
                <li><Link href="/buy">Buy</Link></li>
                <li><Link href="/rent">Rent</Link></li>
                <li><Link href="/commercial">Commercial</Link></li>
              </ul>
            </details>
          </li>
        </ul>

        {/* Center Brand */}
        <div className="brand">
          <img src="/assets/logo.png" alt="Joy Homes Logo" className="logo" />
        </div>

        {/* Right Auth Links */}
        <ul className="auth-links">
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/register">Register</Link></li>
        </ul>
      </nav>
    </header>
  );
}   // <-- this was missing

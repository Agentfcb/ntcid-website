import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NavLink } from '../types'

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const location = useLocation()

  const navLinks: NavLink[] = [
    { path: '/', label: 'Главная' },
    { path: '/services', label: 'Услуги' },
    { path: '/about', label: 'О компании' },
    { path: '/contact', label: 'Контакты' },
  ]

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-content">
          <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
            <span>НТЦ</span> НКИД
          </Link>
          
          <ul className="nav-links">
            {navLinks.map((link: NavLink) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={location.pathname === link.path ? 'active' : ''}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button 
            className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
        <ul>
          {navLinks.map((link: NavLink) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={location.pathname === link.path ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Navbar
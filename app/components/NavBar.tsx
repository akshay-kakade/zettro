import React from 'react'
import { Link } from 'react-router'

const NavBar = () => {
  return (
    <nav className='navbar'>
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="logo" height={50} width={50} className="inline-block" />
          <p className="text-2xl font-bold text-gradient">ZETTRO</p>
        </Link>
        <Link to="/upload" className='primary-button w-fit'>Upload Resume</Link>

    </nav>
  )
}

export default NavBar

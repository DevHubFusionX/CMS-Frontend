import React, { useState, useEffect } from 'react'
import { useAuth, authService } from '../../Services'
import NavBrand from './components/NavBrand'
import DesktopNav from './components/DesktopNav'
import UserDropdown from './components/UserDropdown'
import AuthButtons from './components/AuthButtons'
import MobileMenuButton from './components/MobileMenuButton'
import MobileMenu from './components/MobileMenu'

const Navbar = () => {
  const { user, logout: contextLogout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const handleLogout = () => {
    authService.logout()
    contextLogout()
    setIsMenuOpen(false)
  }
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-gray-900 border-b border-gray-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <NavBrand />
          
          <DesktopNav user={user} />
          
          <div className="hidden md:flex md:items-center">
            {user ? (
              <UserDropdown user={user} onLogout={handleLogout} />
            ) : (
              <AuthButtons />
            )}
          </div>
          
          <MobileMenuButton 
            isMenuOpen={isMenuOpen} 
            onToggle={() => setIsMenuOpen(!isMenuOpen)} 
          />
        </div>
      </div>
      
      <MobileMenu 
        isMenuOpen={isMenuOpen}
        user={user}
        onLogout={handleLogout}
        onCloseMenu={() => setIsMenuOpen(false)}
      />
    </nav>
  )
}

export default Navbar

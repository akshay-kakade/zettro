import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { usePuterStore } from '~/lib/puter'

const NavBar = () => {
  const { auth, isLoading } = usePuterStore();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowLogoutConfirm(false);
      }
    };

    if (showLogoutConfirm) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showLogoutConfirm]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setShowLogoutConfirm(false);
      await auth.signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowLogoutConfirm(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
          <Link to="/" className="flex items-center space-x-0.5">
            <img src="/logo.png" alt="logo" height={50} width={50} className="inline-block" />
            <p className="text-2xl font-bold text-gradient">ZETTRO</p>
          </Link>
          
          <div className="flex items-center gap-4">
            {!isLoading && auth.isAuthenticated && (
              <>
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                  <span>Welcome,</span>
                  <span className="font-medium text-gray-800">
                    {auth.user?.username || 'User'}
                  </span>
                </div>
                
                <Link
                  to="/upload"
                  className="primary-button w-fit px-2 py-1 text-sm md:px-4 md:py-2 md:text-base"
                >
                  Upload Resume
                </Link>
                
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  disabled={isLoggingOut}
                  className="px-3 py-1 text-sm md:px-4 md:py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 border border-red-200 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Logout"
                >
                  {isLoggingOut ? (
                    <span className="hidden md:inline">Logging out...</span>
                  ) : (
                    <span className="hidden md:inline">Logout</span>
                  )}
                  <svg 
                    className={`w-5 h-5 md:hidden ${isLoggingOut ? 'animate-spin' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                    />
                  </svg>
                </button>
              </>
            )}
            
            {!isLoading && !auth.isAuthenticated && (
              <Link
                to="/auth"
                className="primary-button w-fit px-2 py-1 text-sm md:px-4 md:py-2 md:text-base"
              >
                Login
              </Link>
            )}
          </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleModalClick}
        >
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Confirm Logout</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You'll need to sign in again to access your account.
            </p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                disabled={isLoggingOut}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoggingOut && (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NavBar

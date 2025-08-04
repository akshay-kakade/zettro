import { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router';
import { usePuterStore } from '~/lib/puter'

export const metadata =()=>([
    {title: 'Zettro |Auth',},
    {name: 'description', content: 'Log into your application.'},
])

const  Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1] || '/';
    const navigate = useNavigate();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        if (auth.isAuthenticated && !showLogoutConfirm) navigate(next) 
    }, [auth.isAuthenticated, next, showLogoutConfirm])

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

    // If user is authenticated and not showing logout confirm, show account management
    if (auth.isAuthenticated && !showLogoutConfirm) {
        return (
            <main className='bg-[url("/images/bg-auth.svg")] bg-cover min-h-screen flex items-center justify-center'>
                <div className='gradient-border shadow-lg'>
                    <section className='flex flex-col gap-8 bg-white rounded-2xl p-10'>
                        <div className='flex flex-col items-center gap-2'>
                            <h1 className='text-3xl font-bold text-center'>Account</h1>
                            <p className='text-center text-gray-600 mt-2'>
                                Welcome back, <span className="font-semibold">{auth.user?.username || 'User'}</span>!
                            </p>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Link 
                                to="/"
                                className='auth-button bg-blue-600 hover:bg-blue-700'
                            >
                                <p>Go to Dashboard</p>
                            </Link>
                            <button 
                                className='auth-button bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed' 
                                onClick={() => setShowLogoutConfirm(true)}
                                disabled={isLoggingOut}
                            >
                                <p>{isLoggingOut ? 'Logging out...' : 'Log Out'}</p>
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        );
    }

    return (
        <>
            <main className='bg-[url("/images/bg-auth.svg")] bg-cover min-h-screen flex items-center justify-center'>
                <div className='gradient-border shadow-lg'>
                    <section className='flex flex-col gap-8 bg-white rounded-2xl p-10'>
                        <div className='flex flex-col items-center gap-2'>
                            <h1 className='text-3xl font-bold text-center'>Welcome Back!</h1>
                            <p className='text-center text-gray-600 mt-2'>Please log in to continue.</p>
                        </div>
                        <div>
                            {isLoading ? (
                                <button className='auth-button animate-pulse'> 
                                    <p>Signing you in ...</p>
                                </button>
                            ) : (
                                <button className='auth-button' onClick={auth.signIn}>
                                    <p>Log in</p>
                                </button>
                            )}
                        </div>
                    </section>
                </div>
            </main>

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

export default  Auth

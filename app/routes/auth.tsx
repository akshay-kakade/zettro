import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
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

    useEffect(() => {
        if (auth.isAuthenticated) navigate(next) 
    }, [auth.isAuthenticated, next] )
  return (
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

            ): (
                <>
                {auth.isAuthenticated ?(
                    <button className='auth-button' onClick={auth.signOut}>
                      <p>Log Out</p>  
                    </button>
                ):(
                    <button className='auth-button' onClick={auth.signIn}>
                        <p>Log in</p>
                    </button>
                )}
                </>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default  Auth

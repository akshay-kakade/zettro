import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import ATS from '~/components/ATS'
import Details from '~/components/Details'
import Summary from '~/components/Summary'
import { usePuterStore } from '~/lib/puter'

export const metadata = () => ([
  { title: 'Zettro | Resume' },
  { name: 'description', content: 'Detailed Overview of your resume.' },
])

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore()
  const { id } = useParams()
  const [imageUrl, setImageUrl] = useState('')
  const [resumeUrl, setResumeUrl] = useState('')
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`)
    }
  }, [isLoading])

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`)
      if (!resume) return

      const data = JSON.parse(resume)

      const resumeBlob = await fs.read(data.resumePath)
      if (!resumeBlob) return

      const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' })
      const resumeUrl = URL.createObjectURL(pdfBlob)
      setResumeUrl(resumeUrl)

      const imageBlob = await fs.read(data.imagePath)
      if (!imageBlob) return

      const imageUrl = URL.createObjectURL(imageBlob)
      setImageUrl(imageUrl)

      setFeedback(data.feedback)
      console.log({ resumeUrl, imageUrl, feedback: data.feedback })
    }

    loadResume()
  }, [id])

  return (
    <main className='!pt-0'>
      <nav className='resume-nav'>
        <Link to='/' className='back-button'>
          <img src="/icons/back.svg" alt="logo" className='w-2.5 h-2.5' />
          <span className='text-gray-800 text-sm font-semibold'>Back to Home page</span>
        </Link>
      </nav>

      <div className='flex flex-row w-full max-lg:flex-col-reverse'>
        <section className='feedback-section bg-[url(/images/bg-small.svg)] bg-cover h-[100vh] sticky top-0 items-center justify-center'>
          {imageUrl && resumeUrl && (
            <div className='animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit '>
              <a href={resumeUrl} target='_blank' rel='noopener noreferrer'>
                <img
                  src={imageUrl}
                  alt="resume"
                  className='w-full h-full object-contain rounded-2xl'
                  title='resume'
                />
              </a>
            </div>
          )}
        </section>

        <section className='feedback-section'>
          <h2 className='text-4xl !text-black font-bold'>Resume Review</h2>

          {feedback ? (
            <div className='flex flex-col gap-8 animate-in fade-in duration-1000'>
              <Summary feedback={feedback} />
              <ATS score={feedback.ATS.score || 0 } suggestions={feedback.ATS.tips || []} />
              <Details feedback={feedback}/>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-500 opacity-30 rounded-full animate-ping" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full blur-xl opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <svg
                      className="animate-spin h-6 w-6 text-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                  </div>
                </div>
            </div>
          </div>

          )}
        </section>
      </div>
    </main>
  )
}

export default Resume

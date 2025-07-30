import NavBar from "~/components/NavBar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter'


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Zettro" },
    { name: "description", content: "Welcome to smart Resume checker" },
  ];
}

export default function Home() {

    const { auth, kv } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1] || '/';
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);

    useEffect(() => {
        if (!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated, next] )
  
    useEffect(() => {
      const loadResumes = async () => {
        setLoadingResumes(true);

        const resumes = (await kv.list('resume:*', true)) as KVItem[];
        const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
        ))
        console.log("parsedResumes", parsedResumes);
        setResumes(parsedResumes || [])
        setLoadingResumes(false);
      }
      loadResumes()
    },[])
 
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <NavBar />
  <section className="main-section">
    <div className="page-headig py-16 text-center">
      <h1>Track Resume Performance Across ATS Filters</h1>
     {!loadingResumes && resumes?.length === 0 ? (
       <div className="flex flex-col items-center justify-center gap-8 mt-10">
         <h2>No Resume Found. Upload your first resume to get feedback.</h2>
    <Link to="/upload" className="primary-button w-fit text-xl font-semibold" >
    Upload Resume</Link>
  </div>
     ) :(


     <h2 className="text-center">
  Uncover AI Insights to Strengthen Every Submission
  Analyze Job Matches. Improve Outreach. <br /> Stand Out.
  Track Growth. Polish Your Resume. Secure Your Future.
</h2>
     ) }
    </div>
    {loadingResumes && (
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
    
 
 {!loadingResumes && resumes.length > 0 && (
   <div className="resumes-section">
    { resumes.map((resume) => (
      
      <ResumeCard key={resume.id} resume={resume} />
      
    ))}

  </div>
 )
}

  
</section>
        <div className="fixed right-8 bottom-8 z-50">
   <Link to="/wipe" className="text-gradient font-semibold   mb-0 ml-0">
    Admin Access
  </Link>
</div>
  </main>;
}
///00:51:29
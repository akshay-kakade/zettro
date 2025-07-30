import NavBar from "~/components/NavBar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter'


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Zettro" },
    { name: "description", content: "Welcome to smart Resume checker" },
  ];
}

export default function Home() {

    const { auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1] || '/';
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated, next] )

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <NavBar />
  <section className="main-section">
    <div className="page-headig py-16 text-center">
      <h1>Track Resume Performance Across ATS Filters</h1>
     <h2 className="text-center">
  Uncover AI Insights to Strengthen Every Submission
  Analyze Job Matches. Improve Outreach. <br /> Stand Out.
  Track Growth. Polish Your Resume. Secure Your Future.
</h2>
    </div>
    
 
 { resumes.length > 0 && (
   <div className="resumes-section">
    { resumes.map((resume) => (
      
      <ResumeCard key={resume.id} resume={resume} />
      
    ))}

  </div>
 )
}
</section>
        
  </main>;
}
///00:51:29
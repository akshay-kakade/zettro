import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import ScoreCircle from './ScoreCircle'
import { usePuterStore } from '~/lib/puter';

const ResumeCard = ( { resume: { companyName, jobTitle, id, feedback, imagePath } }: { resume: Resume}) => {
      const [resumeUrl, setResumeUrl] = useState('');
       const {  fs } = usePuterStore();

    useEffect(() => {
      const loadResumes = async () => {
        const blob = await fs.read(imagePath);
        if(!blob) return;
        let url = URL.createObjectURL(blob);
        setResumeUrl(url);

      }
      loadResumes();
    }, [imagePath])
  return (
    <Link to={`/resume/${id}`} className='resume-card animate-in fade-in duration-1000'>
        <div className='resume-card-header'>

    <div className='flex flex-col gap-2'>
    {companyName &&    <h2 className='!text-black font-bold break-words '>{companyName} </h2>}
       {jobTitle && <h3>{jobTitle}</h3>}
       {!companyName && !jobTitle && <h3 className='text-gray-500 font-bold'>No details provided</h3>}
    </div>
         <div className='flex-shrink-0'>

                 <ScoreCircle score={feedback.overallScore} />

            </div>
        </div>

     {resumeUrl &&(  <div className='gradient-border animate-in fade-in duration-1000'>
            <div className='w-full h-full'>
                <img 
                src={resumeUrl} 
                alt='resume'
                className='w-full h-[350px] max-sm:h-[200px] object-cover object-top'
                 />

            </div>  
        </div> )}
    
    </Link>
  )
}

export default ResumeCard

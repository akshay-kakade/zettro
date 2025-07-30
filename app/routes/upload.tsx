import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router';
import FileUploader from '~/components/FileUploader';
import NavBar from '~/components/NavBar'

const upload = () => {
   const [isProcessing, setIsProcessing] = useState(false);
   const [statusText, setStatusText] = useState('');
   const [file, setFile] =useState<File | null>(null)

   const handleFileSelect = (file: File | null) => {
    setFile(file);
   }
   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement | null = e.currentTarget.closest('form');
    if (!form) return;
    const formData = new FormData(form);

    const companyName: FormDataEntryValue | null = formData.get('company-name');
    const jobTitle: FormDataEntryValue | null = formData.get('job-title');
    const jobDescription: FormDataEntryValue | null = formData.get('job-description');

    console.log({
        companyName,
        jobTitle,
        jobDescription,
        file
    })
   }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
  <section className="main-section"> 
     <NavBar />
    <div className='page-heading py-16'>
        <h1 className="whitespace-nowrap">Smart feedback for your dream job</h1>
        {isProcessing ? (
            <>
            <h2>{statusText} </h2>
            <img src="/images/resume-scan.gif" alt="Status" className='w-full' />
            </>
        ):(
            <>
            <h2>Upload your resume for an <i>ATS </i> score and improvement tips</h2>
            </>
        )}

        {!isProcessing && (
            <form id='upload-form' onSubmit={handleSubmit}
             className='flex flex-col gap-4 mt-8' >
                <div className='form-div'>
                    <label htmlFor="company-name"> Company Name</label>
                    <input type="text" id="company-name" name="company-name" placeholder='Company Name' required />
                </div>

                  <div className='form-div'>
                    <label htmlFor="job-title"> Job Title</label>
                    <input type="text" id="job-title" name="job-title" placeholder='Job Title' required />
                  </div>
                    <div className='form-div'>
                    <label htmlFor="job-description"> Job Description</label>
                    <textarea rows={5} id="job-description" name="job-description" placeholder='Job Description' required />
                    </div>
                <div className='form-div'> 
                    <label htmlFor="uploader">Resume Resume</label>
                    <FileUploader onFileSelect={handleFileSelect} />
                </div>
                <button className='primary-button' type='submit' >
                    Analyze Resume
                </button>

          
            </form>

        )}
    </div>
  </section>

  </main>
  )
}

export default upload

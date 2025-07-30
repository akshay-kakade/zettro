import { prepareInstructions } from 'constants/index';
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router';
import FileUploader from '~/components/FileUploader';
import NavBar from '~/components/NavBar'
import { convertPdfToImage } from '~/lib/pdf2image';
import { usePuterStore } from '~/lib/puter';
import { generateUUID } from '~/lib/utils';

const upload = () => {
    const { auth, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
   const [isProcessing, setIsProcessing] = useState(false);
   const [statusText, setStatusText] = useState('');
   const [file, setFile] =useState<File | null>(null)

   const handleFileSelect = (file: File | null) => {
    setFile(file);
   }

   const handleAnalyze = async({ companyName, jobTitle, jobDescription, file}: {companyName: string, jobTitle: string, jobDescription: string, file: File}) =>{
        setIsProcessing(true);

    setStatusText('Uploading your resume...');
        const uploadFile =await fs.upload([file])
        if (!uploadFile) return setStatusText('Failed to upload file. Please try again.');

    setStatusText("Converting your resume to image...")
        const imageFile = await convertPdfToImage(file)
        if (!imageFile.file) return setStatusText('Failed to convert PDF to image. Please try again.');

    setStatusText("Uploadig the Image...")
        const uploadImage = await fs.upload([imageFile.file])
        if (!uploadImage) return setStatusText('Failed to upload image. Please try again.');

    setStatusText("Preparing your resume for analysis...")
        const uuid = generateUUID();
        const data = {
            Id: uuid,
            resumePath: uploadFile.path,
            imagePath: uploadImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText("Analyzing your resume...");

        const feedback = await ai.feedback(
            uploadFile.path,
            prepareInstructions({jobTitle, jobDescription})
        )
        if (!feedback) return setStatusText('Failed to analyze resume. Please try again.');

        const feedbackText = typeof feedback.message.content === 'string' 
           ? feedback.message.content 
           : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
     setStatusText("Analysis Complete, redirecting to results...");
     console.log(data);
     navigate(`/resume/${uuid}`)
   }
   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement | null = e.currentTarget.closest('form');
    if (!form) return;
    const formData = new FormData(form);

    const companyName: FormDataEntryValue | null = formData.get('company-name') as string;
    const jobTitle: FormDataEntryValue | null = formData.get('job-title') as string;
    const jobDescription: FormDataEntryValue | null = formData.get('job-description') as string;

     if(!file) return alert('Please upload a resume file');
     
     handleAnalyze({companyName, jobTitle, jobDescription, file})

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
            <img src="/images/resume-scan.gif" alt="Status" className='w-[350px] h-[400px]' />
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

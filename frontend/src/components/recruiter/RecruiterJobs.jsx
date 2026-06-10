import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '../../utils/constant'

const RecruiterJobs = () => {
    const navigate = useNavigate()
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getrecruterjobs`,
                    { withCredentials: true })
                if (res.data.success) setJobs(res.data.jobs)
            } catch (error) {
                console.log(error)
            }
        }
        fetchJobs()
    }, [])

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 max-w-6xl mx-auto px-4 py-10 w-full'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-bold text-gray-800'>My Jobs</h1>
                    <button
                        onClick={() => navigate('/recruiter/jobs/post')}
                        className='px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium'>
                        Post New Job
                    </button>
                </div>

                {jobs.length === 0 ? (
                    <div className='text-center text-gray-500 mt-20'>
                        <p>No jobs posted yet</p>
                    </div>
                ) : (
                    <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
                        <table className='w-full text-sm'>
                            <thead className='bg-gray-50 border-b border-gray-200'>
                                <tr>
                                    <th className='text-left px-6 py-3 text-gray-600 font-medium'>Title</th>
                                    <th className='text-left px-6 py-3 text-gray-600 font-medium'>Company</th>
                                    <th className='text-left px-6 py-3 text-gray-600 font-medium'>Date</th>
                                    <th className='text-left px-6 py-3 text-gray-600 font-medium'>Applicants</th>
                                    <th className='text-left px-6 py-3 text-gray-600 font-medium'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map(job => (
                                    <tr key={job._id} className='border-b border-gray-100 hover:bg-gray-50'>
                                        <td className='px-6 py-4 font-medium text-gray-800'>{job.title}</td>
                                        <td className='px-6 py-4 text-gray-500'>{job.company?.name}</td>
                                        <td className='px-6 py-4 text-gray-500'>{job.createdAt?.split('T')[0]}</td>
                                        <td className='px-6 py-4 text-gray-500'>{job.applications?.length}</td>
                                        <td className='px-6 py-4'>
                                            <button
                                                onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
                                                className='text-purple-600 hover:underline text-sm font-medium'>
                                                View Applicants
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default RecruiterJobs
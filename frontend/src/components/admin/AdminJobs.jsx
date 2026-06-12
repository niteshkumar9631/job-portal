import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import axios from 'axios'
import { ADMIN_API_END_POINT } from '../../utils/constant'
import toast from 'react-hot-toast'

const AdminJobs = () => {
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${ADMIN_API_END_POINT}/jobs`, { withCredentials: true })
                if (res.data.success) setJobs(res.data.jobs)
            } catch (error) {
                toast.error('Failed to load jobs')
            }
        }
        fetchJobs()
    }, [])

    const deleteJob = async (id) => {
        if (!window.confirm('Delete this job?')) return
        try {
            const res = await axios.delete(`${ADMIN_API_END_POINT}/jobs/${id}`, { withCredentials: true })
            if (res.data.success) {
                setJobs(prev => prev.filter(j => j._id !== id))
                toast.success('Job deleted')
            }
        } catch (error) {
            toast.error('Failed to delete job')
        }
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 max-w-7xl mx-auto px-4 py-10 w-full'>
                <h1 className='text-2xl font-bold text-gray-800 mb-6'>Manage Jobs</h1>
                <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
                    <table className='w-full text-sm'>
                        <thead className='bg-gray-50 border-b border-gray-200'>
                            <tr>
                                <th className='text-left px-6 py-3 text-gray-600 font-medium'>Title</th>
                                <th className='text-left px-6 py-3 text-gray-600 font-medium'>Company</th>
                                <th className='text-left px-6 py-3 text-gray-600 font-medium'>Location</th>
                                <th className='text-left px-6 py-3 text-gray-600 font-medium'>Type</th>
                                <th className='text-left px-6 py-3 text-gray-600 font-medium'>Salary</th>
                                <th className='text-left px-6 py-3 text-gray-600 font-medium'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map(job => (
                                <tr key={job._id} className='border-b border-gray-100 hover:bg-gray-50'>
                                    <td className='px-6 py-4 font-medium text-gray-800'>{job.title}</td>
                                    <td className='px-6 py-4 text-gray-500'>{job.company?.name}</td>
                                    <td className='px-6 py-4 text-gray-500'>{job.location}</td>
                                    <td className='px-6 py-4'>
                                        <span className='bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full'>
                                            {job.jobType}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4 text-gray-500'>{job.salary} LPA</td>
                                    <td className='px-6 py-4'>
                                        <button
                                            onClick={() => deleteJob(job._id)}
                                            className='text-red-500 hover:underline text-sm font-medium'>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminJobs
import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import toast from 'react-hot-toast'

const Applicants = () => {
    const { id } = useParams()
    const [job, setJob] = useState(null)

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/${id}/applicants`,
                    { withCredentials: true }
                )
                if (res.data.success) setJob(res.data.job)
            } catch (error) {
                console.log(error)
            }
        }
        fetchApplicants()
    }, [id])

    const updateStatus = async (status, applicationId) => {
        try {
            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/status/${applicationId}/update`,
                { status },
                { withCredentials: true }
            )
            if (res.data.success) {
                setJob(prev => ({
                    ...prev,
                    applications: prev.applications.map(app =>
                        app._id === applicationId ? { ...app, status: status } : app
                    )
                }))
                toast.success(`Status updated to ${status}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 max-w-6xl mx-auto px-4 py-10 w-full'>
                <h1 className='text-2xl font-bold text-gray-800 mb-6'>
                    Applicants — {job?.title}
                </h1>

                {!job || job.applications?.length === 0 ? (
                    <div className='text-center text-gray-500 mt-20'>
                        <p>No applicants yet</p>
                    </div>
                ) : (
                    <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
                        <table className='w-full text-sm'>
                            <thead className='bg-gray-50 border-b border-gray-200'>
                                <tr>
                                    <th className='text-left px-6 py-3 text-gray-600 font-medium'>Name</th>
                                    <th className='text-left px-6 py-3 text-gray-600 font-medium'>Email</th>
                                    <th className='text-left px-6 py-3 text-gray-600 font-medium'>Resume</th>
                                    <th className='text-left px-6 py-3 text-gray-600 font-medium'>Status</th>
                                    <th className='text-left px-6 py-3 text-gray-600 font-medium'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {job.applications.map(app => (
                                    <tr key={app._id} className='border-b border-gray-100 hover:bg-gray-50'>
                                        <td className='px-6 py-4 font-medium text-gray-800'>
                                            {app.applicant?.fullname}
                                        </td>
                                        <td className='px-6 py-4 text-gray-500'>
                                            {app.applicant?.email}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {app.applicant?.profile?.resume ? (
                                                <a href={app.applicant.profile.resume} target='_blank' rel='noreferrer' className='text-purple-600 hover:underline'>
                                                    View Resume
                                                </a>
                                            ) : (
                                                <span className='text-gray-400'>No resume</span>
                                            )}
                                        </td>
                                        <td className='px-6 py-4'>
                                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${app.status === 'accepted' ? 'bg-green-100 text-green-700' : app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <select
                                                onChange={(e) => updateStatus(e.target.value, app._id)}
                                                defaultValue=''
                                                className='text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500'>
                                                <option value='' disabled>Update</option>
                                                <option value='accepted'>Accept</option>
                                                <option value='rejected'>Reject</option>
                                                <option value='pending'>Pending</option>
                                            </select>
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

export default Applicants
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleJob } from '../redux/jobSlice'
import toast from 'react-hot-toast'

const JobDescription = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const [isApplied, setIsApplied] = useState(false)

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`,
                    { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    // Check already applied
                    const applied = res.data.job.applications?.some(
                        app => app.applicant === user?._id
                    )
                    setIsApplied(applied)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchJob()
    }, [id])

    const applyHandler = async () => {
        try {
            const res = await axios.get(
                `${APPLICATION_API_END_POINT}/apply/${id}`,
                { withCredentials: true }
            )
            if (res.data.success) {
                setIsApplied(true)
                toast.success('Applied successfully!')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong')
        }
    }

    if (!singleJob) return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 flex items-center justify-center'>
                <p className='text-gray-500'>Loading...</p>
            </div>
            <Footer />
        </div>
    )

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 max-w-4xl mx-auto px-4 py-10 w-full'>


                {/* Header */}
                <div className='bg-white border border-gray-200 rounded-xl p-6 mb-6'>
                    <div className='flex justify-between items-start'>
                        <div className='flex gap-4 items-center'>
                            {singleJob.company?.logo && (
                                <img src={singleJob.company.logo} alt='logo'
                                    className='w-16 h-16 rounded-xl object-cover' />
                            )}
                            <div>
                                <h1 className='text-2xl font-bold text-gray-800'>
                                    {singleJob.title}
                                </h1>
                                <p className='text-gray-500'>
                                    {singleJob.company?.name} • {singleJob.location}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={applyHandler}
                            disabled={isApplied}
                            className={`px-6 py-2 rounded-md font-medium text-white
                                ${isApplied
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-purple-600 hover:bg-purple-700'}`}>
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </button>
                    </div>

                    {/* Badges */}
                    <div className='flex gap-2 mt-4 flex-wrap'>
                        <span className='bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium'>
                            {singleJob.jobType}
                        </span>
                        <span className='bg-purple-50 text-purple-700 text-xs px-3 py-1 rounded-full font-medium'>
                            {singleJob.salary} LPA
                        </span>
                        <span className='bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium'>
                            {singleJob.position} Positions
                        </span>
                        <span className='bg-yellow-50 text-yellow-700 text-xs px-3 py-1 rounded-full font-medium'>
                            {singleJob.experience} yrs exp
                        </span>
                    </div>
                </div>

                {/* Details */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                    <h2 className='text-lg font-bold text-gray-800 mb-4'>Job Details</h2>

                    <div className='flex flex-col gap-4'>
                        <div>
                            <span className='font-semibold text-gray-700'>Description: </span>
                            <span className='text-gray-600'>{singleJob.description}</span>
                        </div>
                        <div>
                            <span className='font-semibold text-gray-700'>Requirements: </span>
                            <div className='flex gap-2 flex-wrap mt-1'>
                                {singleJob.requirements?.map((req, i) => (
                                    <span key={i}
                                        className='bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full'>
                                        {req}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className='font-semibold text-gray-700'>Total Applicants: </span>
                            <span className='text-gray-600'>{singleJob.applications?.length}</span>
                        </div>
                        <div>
                            <span className='font-semibold text-gray-700'>Posted On: </span>
                            <span className='text-gray-600'>
                                {singleJob.createdAt?.split('T')[0]}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default JobDescription
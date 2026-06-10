import { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import axios from 'axios'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const Browse = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { allJobs, searchJobQuery } = useSelector(store => store.job)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${searchJobQuery}`,
                    { withCredentials: true }
                )
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchJobs()
    }, [searchJobQuery])

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 max-w-7xl mx-auto px-4 py-10 w-full'>

                <h1 className='text-2xl font-bold text-gray-800 mb-2'>
                    Search Results
                </h1>
                <p className='text-gray-500 mb-6'>
                    {allJobs.length} jobs found {searchJobQuery && `for "${searchJobQuery}"`}
                </p>

                {allJobs.length === 0 ? (
                    <div className='text-center text-gray-500 mt-20'>
                        <p className='text-xl'>No jobs found</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {allJobs.map(job => (
                            <div
                                key={job._id}
                                onClick={() => navigate(`/description/${job._id}`)}
                                className='bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md cursor-pointer transition-all'>

                                <div className='flex justify-between items-start mb-3'>
                                    <div>
                                        <h2 className='font-bold text-gray-800'>{job.title}</h2>
                                        <p className='text-gray-500 text-sm'>{job.company?.name}</p>
                                    </div>
                                    {job.company?.logo && (
                                        <img src={job.company.logo} alt='logo'
                                            className='w-10 h-10 rounded-lg object-cover' />
                                    )}
                                </div>

                                <p className='text-gray-600 text-sm line-clamp-2 mb-3'>
                                    {job.description}
                                </p>

                                <div className='flex gap-2 flex-wrap'>
                                    <span className='bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full'>
                                        {job.jobType}
                                    </span>
                                    <span className='bg-purple-50 text-purple-700 text-xs px-3 py-1 rounded-full'>
                                        {job.salary} LPA
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default Browse
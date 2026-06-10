import { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import axios from 'axios'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const Jobs = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { allJobs } = useSelector(store => store.job)
    const [filterSalary, setFilterSalary] = useState('')
    const [filterType, setFilterType] = useState('')

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get`,
                    { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchJobs()
    }, [])

    const filteredJobs = allJobs.filter(job => {
        let match = true
        if (filterSalary) match = match && job.salary >= Number(filterSalary)
        if (filterType) match = match && job.jobType === filterType
        return match
    })

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 max-w-7xl mx-auto px-4 py-10 w-full flex gap-6'>

                {/* Filters Sidebar */}
                <div className='w-64 shrink-0'>
                    <div className='bg-white border border-gray-200 rounded-xl p-5 sticky top-4'>
                        <h2 className='font-bold text-lg text-gray-800 mb-4'>Filter Jobs</h2>

                        <div className='mb-4'>
                            <label className='text-sm font-medium text-gray-600'>Job Type</label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'>
                                <option value=''>All</option>
                                <option value='Full Time'>Full Time</option>
                                <option value='Part Time'>Part Time</option>
                                <option value='Remote'>Remote</option>
                                <option value='Internship'>Internship</option>
                            </select>
                        </div>

                        <div className='mb-4'>
                            <label className='text-sm font-medium text-gray-600'>Min Salary (LPA)</label>
                            <input
                                type='number'
                                value={filterSalary}
                                onChange={(e) => setFilterSalary(e.target.value)}
                                placeholder='e.g. 5'
                                className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
                            />
                        </div>

                        <button
                            onClick={() => { setFilterSalary(''); setFilterType('') }}
                            className='w-full py-2 text-sm text-purple-600 border border-purple-300 rounded-md hover:bg-purple-50'>
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Jobs List */}
                <div className='flex-1'>
                    <h1 className='text-2xl font-bold text-gray-800 mb-6'>
                        {filteredJobs.length} Jobs Found
                    </h1>

                    {filteredJobs.length === 0 ? (
                        <div className='text-center text-gray-500 mt-20'>
                            <p className='text-xl'>No jobs found</p>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-4'>
                            {filteredJobs.map(job => (
                                <JobCard key={job._id} job={job} navigate={navigate} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
            <Footer />
        </div>
    )
}

const JobCard = ({ job, navigate }) => {
    return (
        <div className='bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all'>
            <div className='flex justify-between items-start'>
                <div>
                    <h2 className='text-lg font-bold text-gray-800'>{job.title}</h2>
                    <p className='text-gray-500 text-sm'>{job.company?.name} • {job.location}</p>
                </div>
                {job.company?.logo && (
                    <img src={job.company.logo} alt='logo'
                        className='w-12 h-12 rounded-lg object-cover' />
                )}
            </div>

            <p className='text-gray-600 text-sm mt-3 line-clamp-2'>{job.description}</p>

            <div className='flex gap-2 mt-4 flex-wrap'>
                <span className='bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium'>
                    {job.jobType}
                </span>
                <span className='bg-purple-50 text-purple-700 text-xs px-3 py-1 rounded-full font-medium'>
                    {job.salary} LPA
                </span>
                <span className='bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium'>
                    {job.position} Positions
                </span>
            </div>

            <button
                onClick={() => navigate(`/description/${job._id}`)}
                className='mt-4 px-5 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700'>
                View Details
            </button>
        </div>
    )
}

export default Jobs
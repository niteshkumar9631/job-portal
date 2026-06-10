import { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT, COMPANY_API_END_POINT } from '../../utils/constant'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const PostJob = () => {
    const navigate = useNavigate()
    const [companies, setCompanies] = useState([])
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: '',
        companyId: ''
    })

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,
                    { withCredentials: true })
                if (res.data.success) setCompanies(res.data.companies)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCompanies()
    }, [])

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                `${JOB_API_END_POINT}/post`,
                input,
                { withCredentials: true }
            )
            if (res.data.success) {
                toast.success('Job posted successfully!')
                navigate('/recruiter/jobs')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong')
        }
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='max-w-2xl mx-auto px-4 py-10 w-full'>
                <h1 className='text-2xl font-bold text-gray-800 mb-6'>Post a New Job</h1>

                <form onSubmit={submitHandler} className='flex flex-col gap-4 bg-white border border-gray-200 rounded-xl p-6'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='text-sm font-medium text-gray-700'>Job Title</label>
                            <input type='text' name='title' value={input.title}
                                onChange={changeHandler}
                                placeholder='Frontend Developer'
                                className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500' />
                        </div>
                        <div>
                            <label className='text-sm font-medium text-gray-700'>Location</label>
                            <input type='text' name='location' value={input.location}
                                onChange={changeHandler}
                                placeholder='Bangalore'
                                className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500' />
                        </div>
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Description</label>
                        <textarea name='description' value={input.description}
                            onChange={changeHandler} rows={3}
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500' />
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Requirements (comma separated)</label>
                        <input type='text' name='requirements' value={input.requirements}
                            onChange={changeHandler}
                            placeholder='React, Node.js, MongoDB'
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500' />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='text-sm font-medium text-gray-700'>Salary (LPA)</label>
                            <input type='number' name='salary' value={input.salary}
                                onChange={changeHandler}
                                placeholder='12'
                                className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500' />
                        </div>
                        <div>
                            <label className='text-sm font-medium text-gray-700'>Positions</label>
                            <input type='number' name='position' value={input.position}
                                onChange={changeHandler}
                                placeholder='2'
                                className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500' />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='text-sm font-medium text-gray-700'>Job Type</label>
                            <select name='jobType' value={input.jobType}
                                onChange={changeHandler}
                                className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'>
                                <option value=''>Select</option>
                                <option value='Full Time'>Full Time</option>
                                <option value='Part Time'>Part Time</option>
                                <option value='Remote'>Remote</option>
                                <option value='Internship'>Internship</option>
                            </select>
                        </div>
                        <div>
                            <label className='text-sm font-medium text-gray-700'>Experience (years)</label>
                            <input type='number' name='experience' value={input.experience}
                                onChange={changeHandler}
                                placeholder='1'
                                className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500' />
                        </div>
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Company</label>
                        <select name='companyId' value={input.companyId}
                            onChange={changeHandler}
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'>
                            <option value=''>Select Company</option>
                            {companies.map(c => (
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className='flex gap-3 mt-2'>
                        <button type='button'
                            onClick={() => navigate('/recruiter/jobs')}
                            className='px-5 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50'>
                            Cancel
                        </button>
                        <button type='submit'
                            className='px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium'>
                            Post Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostJob
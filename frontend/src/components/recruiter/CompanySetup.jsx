import { useState, useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import toast from 'react-hot-toast'

const CompanySetup = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [input, setInput] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
        file: null
    })

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const res = await axios.get(
                    `${COMPANY_API_END_POINT}/get/${id}`,
                    { withCredentials: true }
                )
                if (res.data.success) {
                    const c = res.data.company
                    setInput({
                        name: c.name || '',
                        description: c.description || '',
                        website: c.website || '',
                        location: c.location || '',
                        file: null
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchCompany()
    }, [id])

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const fileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', input.name)
        formData.append('description', input.description)
        formData.append('website', input.website)
        formData.append('location', input.location)
        if (input.file) formData.append('file', input.file)

        try {
            const res = await axios.put(
                `${COMPANY_API_END_POINT}/update/${id}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            )
            if (res.data.success) {
                toast.success('Company updated!')
                navigate('/recruiter/companies')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong')
        }
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='max-w-xl mx-auto px-4 py-10 w-full'>
                <div className='flex items-center gap-3 mb-8'>
                    <button
                        onClick={() => navigate('/recruiter/companies')}
                        className='text-gray-500 hover:text-gray-800'>
                        Back
                    </button>
                    <h1 className='text-2xl font-bold text-gray-800'>Company Setup</h1>
                </div>

                <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                    <div>
                        <label className='text-sm font-medium text-gray-700'>Company Name</label>
                        <input type='text' name='name' value={input.name}
                            onChange={changeHandler}
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500' />
                    </div>
                    <div>
                        <label className='text-sm font-medium text-gray-700'>Description</label>
                        <textarea name='description' value={input.description}
                            onChange={changeHandler} rows={3}
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500' />
                    </div>
                    <div>
                        <label className='text-sm font-medium text-gray-700'>Website</label>
                        <input type='text' name='website' value={input.website}
                            onChange={changeHandler}
                            placeholder='https://yourcompany.com'
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500' />
                    </div>
                    <div>
                        <label className='text-sm font-medium text-gray-700'>Location</label>
                        <input type='text' name='location' value={input.location}
                            onChange={changeHandler}
                            placeholder='Bangalore, Delhi...'
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500' />
                    </div>
                    <div>
                        <label className='text-sm font-medium text-gray-700'>Company Logo</label>
                        <input type='file' accept='image/*'
                            onChange={fileHandler}
                            className='w-full mt-1 text-sm text-gray-500' />
                    </div>
                    <div className='flex gap-3 mt-2'>
                        <button type='button'
                            onClick={() => navigate('/recruiter/companies')}
                            className='px-5 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50'>
                            Cancel
                        </button>
                        <button type='submit'
                            className='px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium'>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup
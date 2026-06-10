import { useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import toast from 'react-hot-toast'

const CompanyCreate = () => {
    const [companyName, setCompanyName] = useState('')
    const navigate = useNavigate()

    const registerHandler = async () => {
        if (!companyName) {
            return toast.error('Company name required')
        }
        try {
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                { withCredentials: true }
            )
            if (res.data.success) {
                navigate(`/recruiter/companies/${res.data.company._id}`)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong')
        }
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 max-w-xl mx-auto px-4 py-20 w-full'>
                <div className='mb-8'>
                    <h1 className='text-2xl font-bold text-gray-800'>Register Your Company</h1>
                    <p className='text-gray-500 mt-1'>Give your company a name to get started</p>
                </div>
                <div className='mb-6'>
                    <label className='text-sm font-medium text-gray-700'>Company Name</label>
                    <input
                        type='text'
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder='Google, Microsoft...'
                        className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                    />
                </div>
                <div className='flex gap-3'>
                    <button
                        onClick={() => navigate('/recruiter/companies')}
                        className='px-5 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50'>
                        Cancel
                    </button>
                    <button
                        onClick={registerHandler}
                        className='px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium'>
                        Continue
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CompanyCreate
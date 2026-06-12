import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import axios from 'axios'
import { ADMIN_API_END_POINT } from '../../utils/constant'
import toast from 'react-hot-toast'

const AdminCompanies = () => {
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${ADMIN_API_END_POINT}/companies`, { withCredentials: true })
                if (res.data.success) setCompanies(res.data.companies)
            } catch (error) {
                toast.error('Failed to load companies')
            }
        }
        fetchCompanies()
    }, [])

    const deleteCompany = async (id) => {
        if (!window.confirm('Delete this company?')) return
        try {
            const res = await axios.delete(`${ADMIN_API_END_POINT}/companies/${id}`, { withCredentials: true })
            if (res.data.success) {
                setCompanies(prev => prev.filter(c => c._id !== id))
                toast.success('Company deleted')
            }
        } catch (error) {
            toast.error('Failed to delete company')
        }
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 max-w-7xl mx-auto px-4 py-10 w-full'>
                <h1 className='text-2xl font-bold text-gray-800 mb-6'>Manage Companies</h1>
                <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
                    <table className='w-full text-sm'>
                        <thead className='bg-gray-50 border-b border-gray-200'>
                            <tr>
                                <th className='text-left px-6 py-3 text-gray-600 font-medium'>Logo</th>
                                <th className='text-left px-6 py-3 text-gray-600 font-medium'>Name</th>
                                <th className='text-left px-6 py-3 text-gray-600 font-medium'>Location</th>
                                <th className='text-left px-6 py-3 text-gray-600 font-medium'>Website</th>
                                <th className='text-left px-6 py-3 text-gray-600 font-medium'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map(company => (
                                <tr key={company._id} className='border-b border-gray-100 hover:bg-gray-50'>
                                    <td className='px-6 py-4'>
                                        {company.logo ? (
                                            <img src={company.logo} alt='logo' className='w-10 h-10 rounded-lg object-cover' />
                                        ) : (
                                            <div className='w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-bold'>
                                                {company.name[0]}
                                            </div>
                                        )}
                                    </td>
                                    <td className='px-6 py-4 font-medium text-gray-800'>{company.name}</td>
                                    <td className='px-6 py-4 text-gray-500'>{company.location || 'N/A'}</td>
                                    <td className='px-6 py-4'>
                                        {company.website ? (
                                            <a href={company.website} target='_blank' rel='noreferrer'
                                                className='text-purple-600 hover:underline text-sm'>
                                                Visit
                                            </a>
                                        ) : 'N/A'}
                                    </td>
                                    <td className='px-6 py-4'>
                                        <button
                                            onClick={() => deleteCompany(company._id)}
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

export default AdminCompanies
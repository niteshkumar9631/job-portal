import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../utils/constant'

const Companies = () => {
    const navigate = useNavigate()
    const [companies, setCompanies] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,
                    { withCredentials: true })
                if (res.data.success) {
                    setCompanies(res.data.companies)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchCompanies()
    }, [])

    const filtered = companies.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 max-w-6xl mx-auto px-4 py-10 w-full'>

                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-bold text-gray-800'>My Companies</h1>
                    <button
                        onClick={() => navigate('/recruiter/companies/create')}
                        className='px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium'>
                        New Company
                    </button>
                </div>

                <input
                    type='text'
                    placeholder='Search company...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500'
                />

                {filtered.length === 0 ? (
                    <div className='text-center text-gray-500 mt-20'>
                        <p>No companies registered yet</p>
                    </div>
                ) : (
                    <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
                        <table className='w-full text-sm'>
                            <thead className='bg-gray-50 border-b border-gray-200'>
                                <tr>
                                    <th className='text-left px-6 py-3 text-gray-600 font-medium'>Logo</th>
                                    <th className='text-left px-6 py-3 text-gray-600 font-medium'>Name</th>
                                    <th className='text-left px-6 py-3 text-gray-600 font-medium'>Date</th>
                                    <th className='text-left px-6 py-3 text-gray-600 font-medium'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(company => (
                                    <tr key={company._id} className='border-b border-gray-100 hover:bg-gray-50'>
                                        <td className='px-6 py-4'>
                                            {company.logo ? (
                                                <img src={company.logo} alt='logo'
                                                    className='w-10 h-10 rounded-lg object-cover' />
                                            ) : (
                                                <div className='w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-bold'>
                                                    {company.name[0]}
                                                </div>
                                            )}
                                        </td>
                                        <td className='px-6 py-4 font-medium text-gray-800'>
                                            {company.name}
                                        </td>
                                        <td className='px-6 py-4 text-gray-500'>
                                            {company.createdAt?.split('T')[0]}
                                        </td>
                                        <td className='px-6 py-4'>
                                            <button
                                                onClick={() => navigate(`/recruiter/companies/${company._id}`)}
                                                className='text-purple-600 hover:underline text-sm font-medium'>
                                                Edit
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

export default Companies
import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ADMIN_API_END_POINT } from '../../utils/constant'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
    const navigate = useNavigate()
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${ADMIN_API_END_POINT}/stats`, { withCredentials: true })
                if (res.data.success) setStats(res.data.stats)
            } catch (error) {
                toast.error('Failed to load stats')
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) return (
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
            <div className='flex-1 max-w-7xl mx-auto px-4 py-10 w-full'>
                <h1 className='text-2xl font-bold text-gray-800 mb-8'>Admin Dashboard</h1>

                {/* Stats */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-10'>
                    {[
                        { label: 'Total Students', value: stats?.totalUsers, icon: '👨‍🎓', bg: 'bg-blue-50', color: 'text-blue-600' },
                        { label: 'Total Recruiters', value: stats?.totalRecruiters, icon: '👔', bg: 'bg-purple-50', color: 'text-purple-600' },
                        { label: 'Total Jobs', value: stats?.totalJobs, icon: '💼', bg: 'bg-green-50', color: 'text-green-600' },
                        { label: 'Total Companies', value: stats?.totalCompanies, icon: '🏢', bg: 'bg-yellow-50', color: 'text-yellow-600' },
                        { label: 'Total Applications', value: stats?.totalApplications, icon: '📋', bg: 'bg-pink-50', color: 'text-pink-600' },
                        { label: 'Pending', value: stats?.pendingApplications, icon: '⏳', bg: 'bg-orange-50', color: 'text-orange-600' },
                        { label: 'Accepted', value: stats?.acceptedApplications, icon: '✅', bg: 'bg-emerald-50', color: 'text-emerald-600' },
                        { label: 'Rejected', value: stats?.rejectedApplications, icon: '❌', bg: 'bg-red-50', color: 'text-red-600' },
                    ].map((s, i) => (
                        <div key={i} className={`${s.bg} rounded-xl p-5`}>
                            <div className='flex justify-between items-center mb-2'>
                                <span className='text-2xl'>{s.icon}</span>
                                <span className={`text-3xl font-bold ${s.color}`}>{s.value}</span>
                            </div>
                            <p className='text-gray-600 text-sm font-medium'>{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                    <h2 className='text-lg font-bold text-gray-800 mb-4'>Manage</h2>
                    <div className='flex gap-4 flex-wrap'>
                        <button onClick={() => navigate('/admin/users')}
                            className='px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium text-sm'>
                            Manage Users
                        </button>
                        <button onClick={() => navigate('/admin/companies')}
                            className='px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm'>
                            Manage Companies
                        </button>
                        <button onClick={() => navigate('/admin/jobs')}
                            className='px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm'>
                            Manage Jobs
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminDashboard
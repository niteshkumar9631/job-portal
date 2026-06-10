import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT, APPLICATION_API_END_POINT, COMPANY_API_END_POINT } from '../../utils/constant'

const Dashboard = () => {
    const navigate = useNavigate()
    const [stats, setStats] = useState({
        totalJobs: 0,
        totalCompanies: 0,
        totalApplications: 0,
        pendingApplications: 0,
        acceptedApplications: 0,
        rejectedApplications: 0,
    })
    const [recentJobs, setRecentJobs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [jobsRes, companiesRes] = await Promise.all([
                    axios.get(`${JOB_API_END_POINT}/getrecruterjobs`, { withCredentials: true }),
                    axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true })
                ])

                const jobs = jobsRes.data.jobs || []
                const companies = companiesRes.data.companies || []

                let totalApplications = 0
                let pending = 0
                let accepted = 0
                let rejected = 0

                jobs.forEach(job => {
                    totalApplications += job.applications?.length || 0
                })

                // Fetch applicants for each job
                const applicantPromises = jobs.map(job =>
                    axios.get(`${APPLICATION_API_END_POINT}/${job._id}/applicants`,
                        { withCredentials: true })
                )
                const applicantResults = await Promise.allSettled(applicantPromises)

                applicantResults.forEach(result => {
                    if (result.status === 'fulfilled') {
                        const applications = result.value.data.job?.applications || []
                        applications.forEach(app => {
                            if (app.status === 'pending') pending++
                            else if (app.status === 'accepted') accepted++
                            else if (app.status === 'rejected') rejected++
                        })
                    }
                })

                setStats({
                    totalJobs: jobs.length,
                    totalCompanies: companies.length,
                    totalApplications,
                    pendingApplications: pending,
                    acceptedApplications: accepted,
                    rejectedApplications: rejected,
                })

                setRecentJobs(jobs.slice(0, 5))
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 flex items-center justify-center'>
                <p className='text-gray-500'>Loading dashboard...</p>
            </div>
            <Footer />
        </div>
    )

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 max-w-7xl mx-auto px-4 py-10 w-full'>

                <h1 className='text-2xl font-bold text-gray-800 mb-8'>Recruiter Dashboard</h1>

                {/* Stats Cards */}
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-10'>
                    <StatCard
                        title='Total Jobs'
                        value={stats.totalJobs}
                        bg='bg-purple-50'
                        color='text-purple-600'
                        icon='💼'
                        onClick={() => navigate('/recruiter/jobs')}
                    />
                    <StatCard
                        title='Total Companies'
                        value={stats.totalCompanies}
                        bg='bg-blue-50'
                        color='text-blue-600'
                        icon='🏢'
                        onClick={() => navigate('/recruiter/companies')}
                    />
                    <StatCard
                        title='Total Applications'
                        value={stats.totalApplications}
                        bg='bg-green-50'
                        color='text-green-600'
                        icon='📋'
                    />
                    <StatCard
                        title='Pending'
                        value={stats.pendingApplications}
                        bg='bg-yellow-50'
                        color='text-yellow-600'
                        icon='⏳'
                    />
                    <StatCard
                        title='Accepted'
                        value={stats.acceptedApplications}
                        bg='bg-emerald-50'
                        color='text-emerald-600'
                        icon='✅'
                    />
                    <StatCard
                        title='Rejected'
                        value={stats.rejectedApplications}
                        bg='bg-red-50'
                        color='text-red-600'
                        icon='❌'
                    />
                </div>

                {/* Application Status Bar */}
                <div className='bg-white border border-gray-200 rounded-xl p-6 mb-8'>
                    <h2 className='text-lg font-bold text-gray-800 mb-4'>Application Overview</h2>
                    {stats.totalApplications === 0 ? (
                        <p className='text-gray-500 text-sm'>No applications yet</p>
                    ) : (
                        <div>
                            <div className='flex rounded-full overflow-hidden h-4 mb-3'>
                                {stats.pendingApplications > 0 && (
                                    <div
                                        className='bg-yellow-400'
                                        style={{ width: `${(stats.pendingApplications / stats.totalApplications) * 100}%` }}
                                    />
                                )}
                                {stats.acceptedApplications > 0 && (
                                    <div
                                        className='bg-green-500'
                                        style={{ width: `${(stats.acceptedApplications / stats.totalApplications) * 100}%` }}
                                    />
                                )}
                                {stats.rejectedApplications > 0 && (
                                    <div
                                        className='bg-red-400'
                                        style={{ width: `${(stats.rejectedApplications / stats.totalApplications) * 100}%` }}
                                    />
                                )}
                            </div>
                            <div className='flex gap-6 text-sm'>
                                <span className='flex items-center gap-2'>
                                    <span className='w-3 h-3 rounded-full bg-yellow-400 inline-block'></span>
                                    Pending ({stats.pendingApplications})
                                </span>
                                <span className='flex items-center gap-2'>
                                    <span className='w-3 h-3 rounded-full bg-green-500 inline-block'></span>
                                    Accepted ({stats.acceptedApplications})
                                </span>
                                <span className='flex items-center gap-2'>
                                    <span className='w-3 h-3 rounded-full bg-red-400 inline-block'></span>
                                    Rejected ({stats.rejectedApplications})
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recent Jobs */}
                <div className='bg-white border border-gray-200 rounded-xl p-6 mb-8'>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='text-lg font-bold text-gray-800'>Recent Jobs</h2>
                        <button
                            onClick={() => navigate('/recruiter/jobs')}
                            className='text-purple-600 text-sm hover:underline'>
                            View All
                        </button>
                    </div>
                    {recentJobs.length === 0 ? (
                        <p className='text-gray-500 text-sm'>No jobs posted yet</p>
                    ) : (
                        <div className='flex flex-col gap-3'>
                            {recentJobs.map(job => (
                                <div key={job._id}
                                    className='flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-purple-50 cursor-pointer transition-all'
                                    onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}>
                                    <div>
                                        <p className='font-medium text-gray-800 text-sm'>{job.title}</p>
                                        <p className='text-gray-500 text-xs'>{job.company?.name} • {job.location}</p>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <span className='bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full'>
                                            {job.applications?.length} applicants
                                        </span>
                                        <span className='text-gray-400 text-xs'>
                                            {job.createdAt?.split('T')[0]}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                    <h2 className='text-lg font-bold text-gray-800 mb-4'>Quick Actions</h2>
                    <div className='flex gap-4 flex-wrap'>
                        <button
                            onClick={() => navigate('/recruiter/jobs/post')}
                            className='px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium text-sm'>
                            Post New Job
                        </button>
                        <button
                            onClick={() => navigate('/recruiter/companies/create')}
                            className='px-5 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 font-medium text-sm'>
                            Add Company
                        </button>
                        <button
                            onClick={() => navigate('/recruiter/jobs')}
                            className='px-5 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 font-medium text-sm'>
                            Manage Jobs
                        </button>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

const StatCard = ({ title, value, bg, color, icon, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`${bg} rounded-xl p-5 ${onClick ? 'cursor-pointer hover:shadow-md transition-all' : ''}`}>
            <div className='flex items-center justify-between mb-2'>
                <span className='text-2xl'>{icon}</span>
                <span className={`text-3xl font-bold ${color}`}>{value}</span>
            </div>
            <p className='text-gray-600 text-sm font-medium'>{title}</p>
        </div>
    )
}

export default Dashboard
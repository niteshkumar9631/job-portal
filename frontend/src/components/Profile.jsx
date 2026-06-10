import { useState, useEffect } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import axios from 'axios'
import { USER_API_END_POINT, APPLICATION_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/authSlice'
import toast from 'react-hot-toast'

const Profile = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const [appliedJobs, setAppliedJobs] = useState([])
    const [input, setInput] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills?.join(', ') || '',
        file: null
    })

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/get`,
                    { withCredentials: true }
                )
                if (res.data.success) {
                    setAppliedJobs(res.data.applications)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (user?.role === 'student') fetchAppliedJobs()
    }, [user])

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const fileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('fullname', input.fullname)
        formData.append('email', input.email)
        formData.append('phoneNumber', input.phoneNumber)
        formData.append('bio', input.bio)
        formData.append('skills', input.skills)
        if (input.file) formData.append('file', input.file)
        try {
            const res = await axios.post(
                `${USER_API_END_POINT}/profile/update`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
            )
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                setIsEdit(false)
                toast.success('Profile updated!')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong')
        }
    }

    const getStatusStyle = (status) => {
        if (status === 'accepted') return 'bg-green-100 text-green-700'
        if (status === 'rejected') return 'bg-red-100 text-red-700'
        return 'bg-yellow-100 text-yellow-700'
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 max-w-3xl mx-auto px-4 py-10 w-full'>

                {/* Profile Card */}
                <div className='bg-white border border-gray-200 rounded-xl p-6 mb-6'>
                    <div className='flex justify-between items-start'>
                        <div className='flex gap-4 items-center'>
                            <img
                                src={user?.profile?.profilePhoto || 'https://github.com/shadcn.png'}
                                alt='profile'
                                className='w-20 h-20 rounded-full object-cover'
                            />
                            <div>
                                <h1 className='text-xl font-bold text-gray-800'>{user?.fullname}</h1>
                                <p className='text-gray-500 text-sm mt-1'>
                                    {user?.profile?.bio || 'No bio added yet'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsEdit(!isEdit)}
                            className='px-4 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 text-sm font-medium'>
                            {isEdit ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>
                </div>

                {/* Edit Form */}
                {isEdit && (
                    <div className='bg-white border border-gray-200 rounded-xl p-6 mb-6'>
                        <h2 className='text-lg font-bold text-gray-800 mb-4'>Edit Profile</h2>
                        <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                            <div>
                                <label className='text-sm font-medium text-gray-700'>Full Name</label>
                                <input type='text' name='fullname' value={input.fullname}
                                    onChange={changeHandler}
                                    className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500' />
                            </div>
                            <div>
                                <label className='text-sm font-medium text-gray-700'>Email</label>
                                <input type='email' name='email' value={input.email}
                                    onChange={changeHandler}
                                    className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500' />
                            </div>
                            <div>
                                <label className='text-sm font-medium text-gray-700'>Phone Number</label>
                                <input type='text' name='phoneNumber' value={input.phoneNumber}
                                    onChange={changeHandler}
                                    className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500' />
                            </div>
                            <div>
                                <label className='text-sm font-medium text-gray-700'>Bio</label>
                                <textarea name='bio' value={input.bio} onChange={changeHandler} rows={3}
                                    placeholder='Tell us about yourself...'
                                    className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500' />
                            </div>
                            <div>
                                <label className='text-sm font-medium text-gray-700'>Skills (comma separated)</label>
                                <input type='text' name='skills' value={input.skills}
                                    onChange={changeHandler}
                                    placeholder='React, Node.js, MongoDB'
                                    className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500' />
                            </div>
                            <div>
                                <label className='text-sm font-medium text-gray-700'>Resume (PDF)</label>
                                <input type='file' accept='application/pdf' onChange={fileHandler}
                                    className='w-full mt-1 text-sm text-gray-500' />
                            </div>
                            <button type='submit'
                                className='w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium'>
                                Save Changes
                            </button>
                        </form>
                    </div>
                )}

                {/* Contact Info */}
                <div className='bg-white border border-gray-200 rounded-xl p-6 mb-6'>
                    <h2 className='text-lg font-bold text-gray-800 mb-4'>Contact Info</h2>
                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center gap-3'>
                            <span className='text-gray-500 text-sm w-24'>Email</span>
                            <span className='text-gray-700 text-sm'>{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <span className='text-gray-500 text-sm w-24'>Phone</span>
                            <span className='text-gray-700 text-sm'>{user?.phoneNumber}</span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <span className='text-gray-500 text-sm w-24'>Role</span>
                            <span className='bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium capitalize'>
                                {user?.role}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Skills */}
                <div className='bg-white border border-gray-200 rounded-xl p-6 mb-6'>
                    <h2 className='text-lg font-bold text-gray-800 mb-4'>Skills</h2>
                    {user?.profile?.skills?.length > 0 ? (
                        <div className='flex gap-2 flex-wrap'>
                            {user.profile.skills.map((skill, i) => (
                                <span key={i} className='bg-purple-50 text-purple-700 text-sm px-3 py-1 rounded-full'>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className='text-gray-500 text-sm'>No skills added yet</p>
                    )}
                </div>

                {/* Resume */}
                <div className='bg-white border border-gray-200 rounded-xl p-6 mb-6'>
                    <h2 className='text-lg font-bold text-gray-800 mb-4'>Resume</h2>
                    {user?.profile?.resume ? (
                        <a href={user.profile.resume} target='_blank' rel='noreferrer'
                            className='text-purple-600 hover:underline text-sm font-medium'>
                            {user.profile.resumeOriginalName || 'View Resume'}
                        </a>
                    ) : (
                        <p className='text-gray-500 text-sm'>No resume uploaded yet</p>
                    )}
                </div>

                {/* Applied Jobs — sirf student ko dikhega */}
                {user?.role === 'student' && (
                    <div className='bg-white border border-gray-200 rounded-xl p-6'>
                        <h2 className='text-lg font-bold text-gray-800 mb-4'>Applied Jobs</h2>
                        {appliedJobs.length === 0 ? (
                            <p className='text-gray-500 text-sm'>No applications yet</p>
                        ) : (
                            <div className='overflow-x-auto'>
                                <table className='w-full text-sm'>
                                    <thead className='bg-gray-50 border-b border-gray-200'>
                                        <tr>
                                            <th className='text-left px-4 py-3 text-gray-600 font-medium'>Date</th>
                                            <th className='text-left px-4 py-3 text-gray-600 font-medium'>Job</th>
                                            <th className='text-left px-4 py-3 text-gray-600 font-medium'>Company</th>
                                            <th className='text-left px-4 py-3 text-gray-600 font-medium'>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appliedJobs.map(app => (
                                            <tr key={app._id} className='border-b border-gray-100 hover:bg-gray-50'>
                                                <td className='px-4 py-3 text-gray-500'>
                                                    {app.createdAt?.split('T')[0]}
                                                </td>
                                                <td className='px-4 py-3 font-medium text-gray-800'>
                                                    {app.job?.title}
                                                </td>
                                                <td className='px-4 py-3 text-gray-500'>
                                                    {app.job?.company?.name}
                                                </td>
                                                <td className='px-4 py-3'>
                                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(app.status)}`}>
                                                        {app.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

            </div>
            <Footer />
        </div>
    )
}

export default Profile
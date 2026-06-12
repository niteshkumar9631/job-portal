import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import axios from 'axios'
import { ADMIN_API_END_POINT } from '../../utils/constant'
import toast from 'react-hot-toast'

const AdminUsers = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${ADMIN_API_END_POINT}/users`, { withCredentials: true })
                if (res.data.success) setUsers(res.data.users)
            } catch (error) {
                toast.error('Failed to load users')
            }
        }
        fetchUsers()
    }, [])

    const deleteUser = async (id) => {
        if (!window.confirm('Delete this user?')) return
        try {
            const res = await axios.delete(`${ADMIN_API_END_POINT}/users/${id}`, { withCredentials: true })
            if (res.data.success) {
                setUsers(prev => prev.filter(u => u._id !== id))
                toast.success('User deleted')
            }
        } catch (error) {
            toast.error('Failed to delete user')
        }
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 max-w-7xl mx-auto px-4 py-10 w-full'>
                <h1 className='text-2xl font-bold text-gray-800 mb-6'>Manage Users</h1>
                <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
                    <table className='w-full text-sm'>
                        <thead className='bg-gray-50 border-b border-gray-200'>
                            <tr>
                                <th className='text-left px-6 py-3 text-gray-600 font-medium'>Photo</th>
                                <th className='text-left px-6 py-3 text-gray-600 font-medium'>Name</th>
                                <th className='text-left px-6 py-3 text-gray-600 font-medium'>Email</th>
                                <th className='text-left px-6 py-3 text-gray-600 font-medium'>Role</th>
                                <th className='text-left px-6 py-3 text-gray-600 font-medium'>Joined</th>
                                <th className='text-left px-6 py-3 text-gray-600 font-medium'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} className='border-b border-gray-100 hover:bg-gray-50'>
                                    <td className='px-6 py-4'>
                                        <img
                                            src={user.profile?.profilePhoto || 'https://github.com/shadcn.png'}
                                            alt='photo'
                                            className='w-9 h-9 rounded-full object-cover'
                                        />
                                    </td>
                                    <td className='px-6 py-4 font-medium text-gray-800'>{user.fullname}</td>
                                    <td className='px-6 py-4 text-gray-500'>{user.email}</td>
                                    <td className='px-6 py-4'>
                                        <span className={`text-xs px-3 py-1 rounded-full font-medium
                                            ${user.role === 'recruiter' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4 text-gray-500'>{user.createdAt?.split('T')[0]}</td>
                                    <td className='px-6 py-4'>
                                        <button
                                            onClick={() => deleteUser(user._id)}
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

export default AdminUsers
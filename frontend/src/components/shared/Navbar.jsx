import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { setUser } from '../../redux/authSlice'

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`,
                { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null))
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className='bg-white shadow-sm'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>

                {/* Logo */}
                <Link to='/'>
                    <h1 className='text-2xl font-bold'>
                        Job<span className='text-purple-600'>Portal</span>
                    </h1>
                </Link>

                {/* Nav Links */}
                <div className='flex items-center gap-8'>
                    {user && user.role === 'recruiter' ? (
                        <>
                            <Link to='/recruiter/dashboard'
                                className='text-gray-600 hover:text-purple-600 font-medium'>
                                Dashboard
                             </Link>

                            <Link to='/recruiter/jobs'
                                className='text-gray-600 hover:text-purple-600 font-medium'>
                                Jobs
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to='/'
                                className='text-gray-600 hover:text-purple-600 font-medium'>
                                Home
                            </Link>
                            <Link to='/jobs'
                                className='text-gray-600 hover:text-purple-600 font-medium'>
                                Jobs
                            </Link>
                            <Link to='/browse'
                                className='text-gray-600 hover:text-purple-600 font-medium'>
                                Browse
                            </Link>
                        </>
                    )}
                </div>

                {user && user.role === 'admin' && (
    <>
        <Link to='/admin/dashboard'
            className='text-gray-600 hover:text-purple-600 font-medium'>
            Dashboard
        </Link>
        <Link to='/admin/users'
            className='text-gray-600 hover:text-purple-600 font-medium'>
            Users
        </Link>
        <Link to='/admin/companies'
            className='text-gray-600 hover:text-purple-600 font-medium'>
            Companies
        </Link>
        <Link to='/admin/jobs'
            className='text-gray-600 hover:text-purple-600 font-medium'>
            Jobs
        </Link>
    </>
)}

                {/* Auth Buttons */}
                <div className='flex items-center gap-4'>
                    {!user ? (
                        <>
                            <Link to='/login'>
                                <button className='px-4 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 font-medium'>
                                    Login
                                </button>
                            </Link>
                            <Link to='/signup'>
                                <button className='px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium'>
                                    Signup
                                </button>
                            </Link>
                        </>
                    ) : (
                        <div className='flex items-center gap-3'>
                            <Link to='/profile'>
                                <img
                                    src={user?.profile?.profilePhoto || 'https://github.com/shadcn.png'}
                                    alt='profile'
                                    className='w-9 h-9 rounded-full object-cover cursor-pointer'
                                />
                            </Link>
                            <button
                                onClick={logoutHandler}
                                className='px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 font-medium'>
                                Logout
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    )
}

export default Navbar
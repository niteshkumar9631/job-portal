import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice'
import toast from 'react-hot-toast'

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: ''
    })

    const { loading } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            dispatch(setLoading(true))
            const res = await axios.post(
                `${USER_API_END_POINT}/login`,
                input,
                { withCredentials: true }
            )
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong')
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
            <div className='bg-white p-8 rounded-xl shadow-md w-full max-w-md'>
                <h1 className='text-2xl font-bold text-center mb-6'>
                    Welcome Back
                </h1>

                <form onSubmit={submitHandler} className='flex flex-col gap-4'>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Email</label>
                        <input
                            type='email'
                            name='email'
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder='nitesh@gmail.com'
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                        />
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Password</label>
                        <input
                            type='password'
                            name='password'
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder='********'
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className='text-sm font-medium text-gray-700'>Role</label>
                        <div className='flex gap-6 mt-2'>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input
                                    type='radio'
                                    name='role'
                                    value='student'
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className='accent-purple-600'
                                />
                                <span className='text-sm'>Student</span>
                            </label>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input
                                    type='radio'
                                    name='role'
                                    value='recruiter'
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className='accent-purple-600'
                                />
                                <span className='text-sm'>Recruiter</span>
                            </label>
                        </div>
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium mt-2 disabled:opacity-60'>
                        {loading ? 'Please wait...' : 'Login'}
                    </button>

                    <p className='text-sm text-center text-gray-600'>
                        Don't have an account?{' '}
                        <Link to='/signup' className='text-purple-600 font-medium hover:underline'>
                            Signup
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Login
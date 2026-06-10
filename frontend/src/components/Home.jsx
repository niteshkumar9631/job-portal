import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchJobQuery } from '../redux/jobSlice'

const Home = () => {
    const [query, setQuery] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchHandler = () => {
        dispatch(setSearchJobQuery(query))
        navigate('/browse')
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />

            {/* Hero Section */}
            <section className='flex-1 bg-gradient-to-br from-purple-50 to-white flex flex-col items-center justify-center text-center px-4 py-20'>

                <span className='bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-medium mb-4'>
                    No. 1 Job Hunt Website
                </span>

                <h1 className='text-5xl font-bold text-gray-900 leading-tight mb-4'>
                    Search, Apply & <br />
                    Get Your <span className='text-purple-600'>Dream Job</span>
                </h1>

                <p className='text-gray-500 text-lg max-w-xl mb-8'>
                    Find the best jobs from top companies. Apply with one click and track your applications easily.
                </p>

                {/* Search Bar */}
                <div className='flex items-center bg-white border border-gray-200 shadow-md rounded-full px-4 py-2 w-full max-w-xl gap-2'>
                    <input
                        type='text'
                        placeholder='Find your dream jobs...'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className='flex-1 outline-none text-gray-700 bg-transparent px-2'
                    />
                    <button
                        onClick={searchHandler}
                        className='bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 font-medium'>
                        Search
                    </button>
                </div>

            </section>

            {/* Category Section */}
            <section className='max-w-7xl mx-auto px-4 py-16 w-full'>
                <h2 className='text-3xl font-bold text-center text-gray-800 mb-10'>
                    Browse by Category
                </h2>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {categories.map((cat, i) => (
                        <div
                            key={i}
                            onClick={() => {
                                dispatch(setSearchJobQuery(cat.name))
                                navigate('/browse')
                            }}
                            className='flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl hover:border-purple-400 hover:shadow-md cursor-pointer transition-all'>
                            <span className='text-3xl mb-2'>{cat.icon}</span>
                            <span className='text-gray-700 font-medium text-sm'>{cat.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    )
}

const categories = [
    { name: 'Frontend Developer', icon: '💻' },
    { name: 'Backend Developer', icon: '🖥️' },
    { name: 'Full Stack Developer', icon: '🚀' },
    { name: 'Data Science', icon: '📊' },
    { name: 'DevOps', icon: '⚙️' },
    { name: 'UI/UX Designer', icon: '🎨' },
    { name: 'Cybersecurity', icon: '🔒' },
    { name: 'Mobile Developer', icon: '📱' },
]

export default Home
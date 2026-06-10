import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setUser } from './redux/authSlice'
import { USER_API_END_POINT } from './utils/constant'
import { ProtectedRoute, StudentRoute, RecruiterRoute, AuthRoute } from './components/ProtectedRoute'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/recruiter/Companies'
import CompanyCreate from './components/recruiter/CompanyCreate'
import CompanySetup from './components/recruiter/CompanySetup'
import RecruiterJobs from './components/recruiter/RecruiterJobs'
import PostJob from './components/recruiter/PostJob'
import Applicants from './components/recruiter/Applicants'
import Dashboard from './components/recruiter/Dashboard'

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/login',
        element: <AuthRoute><Login /></AuthRoute>
    },
    {
        path: '/signup',
        element: <AuthRoute><Signup /></AuthRoute>
    },
    {
        path: '/jobs',
        element: <StudentRoute><Jobs /></StudentRoute>
    },
    {
        path: '/browse',
        element: <StudentRoute><Browse /></StudentRoute>
    },
    {
        path: '/profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>
    },
    {
        path: '/description/:id',
        element: <StudentRoute><JobDescription /></StudentRoute>
    },
    {
        path: '/recruiter/companies',
        element: <RecruiterRoute><Companies /></RecruiterRoute>
    },
    {
        path: '/recruiter/companies/create',
        element: <RecruiterRoute><CompanyCreate /></RecruiterRoute>
    },
    {
        path: '/recruiter/companies/:id',
        element: <RecruiterRoute><CompanySetup /></RecruiterRoute>
    },
    {
        path: '/recruiter/jobs',
        element: <RecruiterRoute><RecruiterJobs /></RecruiterRoute>
    },
    {
        path: '/recruiter/jobs/post',
        element: <RecruiterRoute><PostJob /></RecruiterRoute>
    },
    {
        path: '/recruiter/jobs/:id/applicants',
        element: <RecruiterRoute><Applicants /></RecruiterRoute>
    },

    {
    path: '/recruiter/dashboard',
    element: <RecruiterRoute><Dashboard /></RecruiterRoute>
},

])

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(
                    `${USER_API_END_POINT}/profile`,
                    { withCredentials: true }
                )
                if (res.data.success) {
                    dispatch(setUser(res.data.user))
                }
            } catch (error) {
                console.log('Not logged in')
            }
        }
        getUser()
    }, [])

    return <RouterProvider router={appRouter} />
}

export default App
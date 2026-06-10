import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

// Sirf logged in users ke liye
export const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth)
    if (!user) return <Navigate to='/login' />
    return children
}

// Sirf students ke liye
export const StudentRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth)
    if (!user) return <Navigate to='/login' />
    if (user.role !== 'student') return <Navigate to='/recruiter/companies' />
    return children
}

// Sirf recruiters ke liye
export const RecruiterRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth)
    if (!user) return <Navigate to='/login' />
    if (user.role !== 'recruiter') return <Navigate to='/' />
    return children
}

// Login page pe logged in user na jaaye
export const AuthRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth)
    if (user) {
        if (user.role === 'recruiter') return <Navigate to='/recruiter/companies' />
        return <Navigate to='/' />
    }
    return children
}
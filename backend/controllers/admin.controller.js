import User from '../models/user.model.js'
import Job from '../models/job.model.js'
import Company from '../models/company.model.js'
import Application from '../models/application.model.js'

// GET ALL USERS
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } }).select('-password')
        return res.status(200).json({ users, success: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

// DELETE USER
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: 'User deleted', success: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

// GET ALL COMPANIES
export const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find()
        return res.status(200).json({ companies, success: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

// DELETE COMPANY
export const deleteCompany = async (req, res) => {
    try {
        await Company.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: 'Company deleted', success: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('company')
        return res.status(200).json({ jobs, success: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

// DELETE JOB
export const deleteJob = async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: 'Job deleted', success: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

// GET STATS
export const getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'student' })
        const totalRecruiters = await User.countDocuments({ role: 'recruiter' })
        const totalJobs = await Job.countDocuments()
        const totalCompanies = await Company.countDocuments()
        const totalApplications = await Application.countDocuments()
        const pendingApplications = await Application.countDocuments({ status: 'pending' })
        const acceptedApplications = await Application.countDocuments({ status: 'accepted' })
        const rejectedApplications = await Application.countDocuments({ status: 'rejected' })

        return res.status(200).json({
            stats: {
                totalUsers,
                totalRecruiters,
                totalJobs,
                totalCompanies,
                totalApplications,
                pendingApplications,
                acceptedApplications,
                rejectedApplications
            },
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}
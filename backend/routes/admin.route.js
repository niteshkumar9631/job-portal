import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import isAdmin from '../middlewares/isAdmin.js'
import {
    getAllUsers, deleteUser,
    getAllCompanies, deleteCompany,
    getAllJobs, deleteJob,
    getStats
} from '../controllers/admin.controller.js'

const router = express.Router()

router.route('/stats').get(isAuthenticated, isAdmin, getStats)
router.route('/users').get(isAuthenticated, isAdmin, getAllUsers)
router.route('/users/:id').delete(isAuthenticated, isAdmin, deleteUser)
router.route('/companies').get(isAuthenticated, isAdmin, getAllCompanies)
router.route('/companies/:id').delete(isAuthenticated, isAdmin, deleteCompany)
router.route('/jobs').get(isAuthenticated, isAdmin, getAllJobs)
router.route('/jobs/:id').delete(isAuthenticated, isAdmin, deleteJob)

export default router
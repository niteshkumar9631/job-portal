import express from 'express'
import { postJob, getAllJobs, getJobById, getRecruiterJobs } from '../controllers/job.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const router = express.Router()

router.route('/post').post(isAuthenticated, postJob)
router.route('/get').get(getAllJobs)
router.route('/getrecruterjobs').get(isAuthenticated, getRecruiterJobs)
router.route('/get/:id').get(isAuthenticated, getJobById)

export default router
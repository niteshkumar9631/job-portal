import express from 'express'
import { registerCompany, getMyCompanies, getCompanyById, updateCompany } from '../controllers/company.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import { upload } from '../middlewares/multer.js'

const router = express.Router()

router.route('/register').post(isAuthenticated, registerCompany)
router.route('/get').get(isAuthenticated, getMyCompanies)
router.route('/get/:id').get(isAuthenticated, getCompanyById)
router.route('/update/:id').put(isAuthenticated, upload.single('file'), updateCompany)

export default router
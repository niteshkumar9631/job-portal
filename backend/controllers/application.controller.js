import Application from '../models/application.model.js'
import Job from '../models/job.model.js'

// APPLY JOB
export const applyJob = async (req, res) => {
    try {
        const userId = req.id
        const jobId = req.params.id

        if (!jobId) {
            return res.status(400).json({ message: 'Job id required', success: false })
        }

        // Already applied check
        const existing = await Application.findOne({
            job: jobId,
            applicant: userId
        })
        if (existing) {
            return res.status(400).json({
                message: 'Already applied for this job',
                success: false
            })
        }

        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({ message: 'Job not found', success: false })
        }

        const application = await Application.create({
            job: jobId,
            applicant: userId
        })

        job.applications.push(application._id)
        await job.save()

        return res.status(201).json({
            message: 'Applied successfully',
            success: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

// GET MY APPLICATIONS
export const getAppliedJobs = async (req, res) => {
    try {
        const applications = await Application.find({ applicant: req.id })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                options: { sort: { createdAt: -1 } },
                populate: { path: 'company', options: { sort: { createdAt: -1 } } }
            })

        return res.status(200).json({ applications, success: true })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

// GET APPLICANTS (recruiter)
export const getApplicants = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: { path: 'applicant' }
        })

        if (!job) {
            return res.status(404).json({ message: 'Job not found', success: false })
        }

        return res.status(200).json({ job, success: true })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

// UPDATE APPLICATION STATUS
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body
        const applicationId = req.params.id

        if (!status) {
            return res.status(400).json({ message: 'Status required', success: false })
        }

        const application = await Application.findById(applicationId)
        if (!application) {
            return res.status(404).json({ message: 'Application not found', success: false })
        }

        application.status = status.toLowerCase()
        await application.save()

        return res.status(200).json({
            message: 'Status updated successfully',
            success: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}
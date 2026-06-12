import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter','admin'],
        required: true
    },
    profile: {
        bio: String,
        skills: [String],
        resume: String,        // Cloudinary URL
        resumeOriginalName: String,
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        profilePhoto: {
            type: String,
            default: ''
        }
    }
}, { timestamps: true })

export default mongoose.model('User', userSchema)
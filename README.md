# 🚀 Job Portal — Full Stack MERN Application

A full-featured Job Portal built with the MERN stack where Job Seekers can find and apply for jobs, and Recruiters can post jobs and manage applications.

## 🌐 Live Demo

- **Frontend:** https://job-portal-kappa-coral.vercel.app
- **Backend:** https://job-portal-35u8.onrender.com

---

## ✨ Features

### Job Seeker
- Register & Login with profile photo
- Search & filter jobs by type and salary
- Browse jobs by category
- Apply to jobs with one click
- Track application status (Pending / Accepted / Rejected)
- Upload resume (PDF) via Cloudinary
- Edit profile — bio, skills, contact info

### Recruiter
- Register & Login as recruiter
- Create and manage companies
- Post, view, and manage jobs
- View all applicants for each job
- Update application status in real time
- Dashboard with stats and overview

### General
- JWT Authentication with HTTP-only cookies
- Role-based protected routes
- Persistent login on page refresh
- Toast notifications
- Fully responsive UI

---

## 🛠️ Tech Stack

### Frontend
| Tech | Usage |
|------|-------|
| React + Vite | UI Framework |
| Tailwind CSS | Styling |
| Redux Toolkit | State Management |
| React Router DOM | Routing |
| Axios | API Calls |
| React Hot Toast | Notifications |

### Backend
| Tech | Usage |
|------|-------|
| Node.js + Express | Server |
| MongoDB + Mongoose | Database |
| JWT + bcryptjs | Authentication |
| Cloudinary | File Storage |
| Multer | File Upload |
| Cookie Parser | Cookie Handling |

---

## 📁 Project Structure

job-portal/
-├── backend/
-│   ├── controllers/
-│   │   ├── user.controller.js
-│   │   ├── job.controller.js
-│   │   ├── company.controller.js
-│   │   └── application.controller.js
-│   ├── models/
│   │   ├── user.model.js
│   │   ├── job.model.js
│   │   ├── company.model.js
│   │   └── application.model.js
│   ├── routes/
│   │   ├── user.route.js
│   │   ├── job.route.js
│   │   ├── company.route.js
│   │   └── application.route.js
│   ├── middlewares/
│   │   ├── isAuthenticated.js
│   │   └── multer.js
│   ├── utils/
│   │   ├── cloudinary.js
│   │   └── datauri.js
│   └── index.js
└── frontend/
└── src/
├── components/
│   ├── auth/
│   ├── recruiter/
│   ├── shared/
│   └── ...pages
├── redux/
│   ├── store.js
│   ├── authSlice.js
│   ├── jobSlice.js
│   └── applicationSlice.js
└── utils/
└── constant.js

---

## ⚙️ Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/niteshkumar9631/job-portal.git
cd job-portal
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🔗 API Endpoints

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/user/register | Register user |
| POST | /api/v1/user/login | Login user |
| GET | /api/v1/user/logout | Logout user |
| GET | /api/v1/user/profile | Get profile |
| POST | /api/v1/user/profile/update | Update profile |

### Job
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/job/post | Post a job |
| GET | /api/v1/job/get | Get all jobs |
| GET | /api/v1/job/get/:id | Get job by ID |
| GET | /api/v1/job/getrecruterjobs | Get recruiter jobs |

### Company
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/company/register | Register company |
| GET | /api/v1/company/get | Get my companies |
| GET | /api/v1/company/get/:id | Get company by ID |
| PUT | /api/v1/company/update/:id | Update company |

### Application
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/application/apply/:id | Apply to job |
| GET | /api/v1/application/get | Get applied jobs |
| GET | /api/v1/application/:id/applicants | Get applicants |
| POST | /api/v1/application/status/:id/update | Update status |

---

## 🚀 Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| File Storage | Cloudinary |

---

## 👨‍💻 Author

**Nitesh Kumar**
- GitHub: [@niteshkumar9631](https://github.com/niteshkumar9631)
- LinkedIn: [linkedin.com/in/niteshkumar9631](https://linkedin.com/in/niteshkumar9631)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

import { createSlice } from '@reduxjs/toolkit'

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        allJobs: [],
        allRecruiterJobs: [],
        singleJob: null,
        searchJobQuery: ''
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAllRecruiterJobs: (state, action) => {
            state.allRecruiterJobs = action.payload
        },
        setSearchJobQuery: (state, action) => {
            state.searchJobQuery = action.payload
        }
    }
})

export const { setAllJobs, setSingleJob, setAllRecruiterJobs, setSearchJobQuery } = jobSlice.actions
export default jobSlice.reducer
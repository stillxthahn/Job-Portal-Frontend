import { Job } from "../interface/interface"
import { del, get, post, put } from "../utilities/request"

export const getJob = async (id: number | undefined) => {
    const query = `job/${id}` 
    const response = await get(query)
    return response
}

export const getJobSearch = async (keyword?: string, city?: string) => {
    const query = keyword && city ? `job/search?keyword=${keyword}&city=${city}` : "job/search"
    const response = await get(query)
    return response
}

export const getJobList = async () => {
    const query = "job/list"
    const response = await get(query)
    return response
}

export const createJob = async (values: Job) => {
    const result = await post("job", values)
    return result
}

export const updateJob = async (id: string | number, options: Job) => {
    const result = await put(`job/${id}`, options)
    return result
}

export const deleteJob = async (id: number | undefined) => {
    const result = await del(`job/${id}`)
    return result
}

export const getJobsByCompanyId = async (id: number | undefined) => {
    const response = await get(`job/company/${id}`)
    return response
}

// export const getJobList = async (start?: number | string, end?: number | string) => {
//     const query = start && end ? `jobs?_start=${start}&_end=${end}` : "jobs"
//     const response = await get(query)
//     return response
// }
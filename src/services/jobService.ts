import { get } from "../utilities/request"

export const getJob = async (id?: number | string) => {
    const query = id ? `jobs/${id}` : "jobs"
    const response = await get(query)
    return response
}

export const getJobsByCompanyId = async (id: number | string) => {
    const response = await get(`jobs?idCompany=${id}`)
    return response
}

export const getJobList = async (start?: number | string, end?: number | string) => {
    const query = start && end ? `jobs?_start=${start}&_end=${end}` : "jobs"
    const response = await get(query)
    return response
}
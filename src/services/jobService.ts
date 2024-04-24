import { get } from "../utilities/request"

export const getAllJob = async () => {
    const response = await get('jobs')
    return response
}

export const getJobsByCompanyId = async (id: number | string) => {
    const response = await get(`jobs?idCompany=${id}`)
    return response
}
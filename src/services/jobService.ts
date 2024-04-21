import { get } from "../utilities/request"

export const getAllJob = async () => {
    const response = await get('jobs')
    return response
}
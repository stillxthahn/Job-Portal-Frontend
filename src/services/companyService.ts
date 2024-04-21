import { get } from "../utilities/request"

export const getCompany = async (id? : number) => {
    const query = id ? `company/${id}` : "company"
    const response = await get(query)
    return response
}
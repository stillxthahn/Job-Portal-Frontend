import { get } from "../utilities/request";

export const getListTag = async() => {
    const result = await get('tags');
    return result;
}
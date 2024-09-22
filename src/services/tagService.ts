import { get } from "../utilities/request";

export const getListTag = async(suggested? : boolean) => {
    const query = "tag"
    const result = await get(query)
    if (suggested) {
        return result.slice(0, 10)
    }
    return result;
}
import { CV } from "../interface/interface";
import { get, post } from "../utilities/request";

export const getCVByIdCompany = async (id: number | string) => {
  const result = await get(`cv?idCompany=${id}`)
  return result
}
export const createCV = async (values: CV) => {
  const result = await post(`cv`, values);
  return result;
};
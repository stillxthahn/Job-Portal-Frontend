import { CV } from "../interface/interface";
import { post } from "../utilities/request";

export const createCV = async (values: CV) => {
  const result = await post(`cv`, values);
  return result;
};
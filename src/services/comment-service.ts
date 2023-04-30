import axios from 'axios'
import { axiosInstance } from '../helper/axiosInstance'

const API_URL = import.meta.env.VITE_API_URL
type TCommentData = {
  text: string
}
export const create_new_comment = async (id:string | undefined ,commentData: TCommentData) => {
  const response = await axiosInstance.post(`${API_URL}/comment/${id}`, commentData)
  return response.data
}
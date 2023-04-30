import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
type TCommentData = {
  text: string
}
export const create_new_comment = async (id:string | undefined ,commentData: TCommentData) => {
  const response = await axios.post(`${API_URL}/comment/${id}`, commentData)
  return response.data
}
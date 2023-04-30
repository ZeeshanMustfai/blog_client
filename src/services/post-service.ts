import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

type TNewPost = {
  title: string
  description: string
  photo?: string
}

export const upload_image = async (data: any) => {
const response = await axios.post(`${API_URL}/upload`, data)
return response.data
}
export const create_new_post = async (postData: TNewPost) => {
  const response = await axios.post(`${API_URL}/post`, postData)
  return response.data
}

export const get_all_posts = async (id: string | undefined) => {
    const response = await axios.get(`${API_URL}/post/all`, {
      params: {
        id
      }
    })
    return response.data
}

export const get_one_post = async (id: string | undefined) => {
  const response = await axios.get(`${API_URL}/post/${id}`)
  return response.data
}

export const delete_one_post = async(id: string | undefined) => {
  const response = await axios.delete(`${API_URL}/post/${id}`)
  return response.data
}

export const update_one_post = async(id: string | undefined, formData: TNewPost) => {
  const response = await axios.put(`${API_URL}/post/${id}`, formData)
  return response.data
}
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
})

axiosInstance.interceptors.request.use((req) => {
  const user = localStorage.getItem('user') as string
  const userData = JSON.parse(user)
  if (userData) {
    req.headers.Authorization = `Bearer ${userData?.token}`
  }
  return req
})

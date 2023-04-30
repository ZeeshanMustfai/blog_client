import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const register = async (userData: any) => {
  const response = await axios.post(`${API_URL}/user/signup`, userData)
  return response?.data
}

const logout = () => {
  localStorage.removeItem('user')
}

const login = async (userData: any) => {
  const response = await axios.post(`${API_URL}/user/login`, userData)
  if(response?.data){
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response?.data
}
const authService = {
  register,
  logout,
  login
}

export default authService
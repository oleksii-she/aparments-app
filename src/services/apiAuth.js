// import axios from 'axios'
import axiosInstance from '../utils/axios'

export const registerUser = async (userData) => {
  const response = await axiosInstance.post(`auth/register`, userData)
  return response.data
}

export const loginUser = async (userData) => {
  const response = await axiosInstance.post(`auth/login`, userData)
  return response.data
}

export const getCurrentUser = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await axiosInstance.get('auth/current', config)
  return response.data
}

export const logoutUser = async () => {
  const response = await axiosInstance.post('auth/logout')
  return response.data
}

export const updateUser = async (data) => {
  const response = await axiosInstance.patch(`/users/user`, data)
  return response.data
}

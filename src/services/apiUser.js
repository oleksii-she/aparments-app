import axiosInstance from '../utils/axios'

export const userApartments = async (id, page) => {
  const response = await axiosInstance.get(`/users/${id}/apartments/?limit=9&page=${page}`)
  return response.data
}

export const userRating = async (id) => {
  const response = await axiosInstance.get(`/users/${id}/rate`)
  return response.data
}

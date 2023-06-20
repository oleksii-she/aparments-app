import axiosInstance from '../utils/axios'

export const userApartments = async (id, page) => {
  const response = await axiosInstance.get(`/users/${id}/apartments/?limit=9&page=${page}`)
  return response.data
}

export const userRating = async (id, rating) => {
  const response = await axiosInstance.patch(`/users/${id}/rate`, {
    userRating: rating
  })
  return response.data
}

export const getUser = async (id) => {
  const response = await axiosInstance.get(`/users/${id}/user`)
  return response.data
}

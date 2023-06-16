import axiosInstance from '../utils/axios'

export const getAllReservers = async (page) => {
  const response = await axiosInstance.get(`/reserves/?limit=9&page=${page}`)
  return response.data
}

export const getReserversIdInfo = async (id) => {
  const response = await axiosInstance.get(`/reserves/${id}`)
  return response.data
}

export const getReserversDelete = async (id) => {
  const response = await axiosInstance.delete(`/reserves/${id}`)
  return response.data
}

export const addReserve = async (id, data) => {
  const response = await axiosInstance.post(`reserves/${id}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.data
}

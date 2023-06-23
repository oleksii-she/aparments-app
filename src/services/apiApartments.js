import axiosInstance from '../utils/axios'

export const addApartment = async (userData) => {
  const response = await axiosInstance.post(`apartments/`, userData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data
}

export const apartments = async (page, country) => {
  const response = await axiosInstance.get(`apartments/?limit=9&page=${page}&country=${country}`)
  return response.data
}

export const apartmentsId = async (id) => {
  const response = await axiosInstance.get(`apartments/${id}`)
  return response.data
}
export const apartmentDelleteId = async (id) => {
  const response = await axiosInstance.delete(`apartments/${id}`)
  return response.data
}

export const addComment = async (id, formData) => {
  const response = await axiosInstance.post(`apartments/${id}/comments`, formData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response.data
}
//

export const getComments = async (id, page) => {
  const response = await axiosInstance.get(`apartments/${id}/comments?limit=2&page=${page}`)
  return response.data
}

export const commentDelleteId = async (id) => {
  const response = await axiosInstance.delete(`apartments/${id}/comments`)
  return response.data
}

export const apartmentRating = async (id, index) => {
  const response = await axiosInstance.put(`apartments/${id}/rating`, { rating: index })
  return response.data
}

export const updateReserve = async (id, data) => {
  const response = await axiosInstance.patch(`apartments/${id}/reserved`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.data
}

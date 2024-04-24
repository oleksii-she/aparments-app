import axiosInstance from '../utils/axios'

export const getAllChat = async () => {
  const response = await axiosInstance.get(`/chat`)
  return response.data
}

export const getAllChatQueryPage = async (page) => {
  const response = await axiosInstance.get(`/chat?page=${page}`)
  return response.data
}

export const updateChatId = async (id, data) => {
  const response = await axiosInstance.patch(`/chat/${id}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log(response, 'response')
  return response.data
}
// export const getReserversIdInfo = async (id) => {
//   const response = await axiosInstance.get(`/reserves/${id}`)
//   return response.data
// }

// export const getReserversDelete = async (id) => {
//   const response = await axiosInstance.delete(`/reserves/${id}`)
//   return response.data
// }

// export const addReserve = async (id, data) => {
//   const response = await axiosInstance.post(`reserves/${id}`, data, {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   return response.data
// }

import axiosInstance from '../utils/axios'

export const allCountries = async () => {
  const response = await axiosInstance.get(`countries`)
  return response.data
}

export const countriesApi = async (name) => {
  try {
    if (!name) {
      return
    }
    const result = await axiosInstance(`https://restcountries.com/v3.1/name/${name}`)
    return result.data
  } catch (error) {
    console.log(error.message)
  }
}

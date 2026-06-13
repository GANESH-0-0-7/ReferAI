import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          window.location.href = '/login'
          return Promise.reject(error)
        }

        const response = await axios.post(
          `${API_BASE_URL}/api/v1/auth/refresh`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        )

        const { accessToken, refreshToken: newRefreshToken } = response.data
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', newRefreshToken)

        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return axiosInstance(originalRequest)
      } catch (err) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export const authService = {
  register: async (data: {
    email: string
    password: string
    firstName: string
    lastName: string
    userType?: string
  }) => {
    const response = await axiosInstance.post('/auth/register', data)
    return response.data
  },

  login: async (email: string, password: string) => {
    const response = await axiosInstance.post('/auth/login', { email, password })
    return response.data
  },

  refreshToken: async (refreshToken: string) => {
    const response = await axiosInstance.post('/auth/refresh', { refreshToken })
    return response.data
  },

  logout: async () => {
    await axiosInstance.post('/auth/logout')
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get('/auth/me')
    return response.data
  },
}

export default axiosInstance

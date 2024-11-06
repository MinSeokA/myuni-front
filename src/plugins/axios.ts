import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

// 요청 인터셉터로 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    console.log('Token in Request:', token) // 요청에 포함된 토큰을 로그로 확인
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export default api

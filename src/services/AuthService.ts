import api from '@/plugins/axios' // 설정된 Axios 인스턴스

export async function login(credentials: any) {
  try {
    const response = await api.post('/auth/google:dev', credentials)
    const token = response.data.access_token

    if (token) {
      const expiresIn = 1 * 60 * 60 * 1000
      // 1시간 (1시간 * 60분 * 60초 * 1000밀리초)
      const expiryTime: Number = Date.now() + expiresIn // 현재 시간에 1시간 더한 만료 시간

      // 토큰과 만료 시간을 localStorage에 저장
      localStorage.setItem('token', token)
      localStorage.setItem('tokenExpiry', expiryTime.toString())

      console.log('JWT token saved:', token)
    }

    return response.data
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

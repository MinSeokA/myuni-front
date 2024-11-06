import { ref } from 'vue'
import api from '../plugins/axios'

const isAuthenticated = ref(false)

// 토큰 확인 및 로그인 상태 설정 함수
function checkAuth() {
  const token = localStorage.getItem('token')
  const tokenExpiry = localStorage.getItem('tokenExpiry')

  if (!token || !tokenExpiry) return null

  // 만료 시간 확인
  if (Date.now() > parseInt(tokenExpiry)) {
    console.log('Token has expired')
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiry')
    return null
  }

  isAuthenticated.value = !!token // 토큰이 있으면 로그인 상태로 설정
}

// 로그아웃 함수
function logout() {
  localStorage.removeItem('token')
  isAuthenticated.value = false
}

// 프로필 정보를 가져와 로그인 상태를 갱신하는 함수
async function fetchProfile() {
  try {
    const response = await api.post('/user/profile')
    isAuthenticated.value = true // 프로필이 성공적으로 로드되면 인증된 상태로 설정
    return response.data
  } catch (error) {
    console.error('Failed to fetch profile:', error)
    logout() // 프로필 가져오기 실패 시 로그아웃
  }
}

// 초기화: 페이지 로드 시 `checkAuth` 호출하여 초기 상태 설정
checkAuth()

export function useAuth() {
  return {
    isAuthenticated,
    checkAuth,
    logout,
    fetchProfile,
  }
}

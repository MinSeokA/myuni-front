<template>
  <!-- 로고와 제목 -->
  <div class="scroll-section h-full text-center pt-[20rem]" id="home">
    <img
      src="https://cdn.lunaiz.com/my_uni_assets/logo-l.svg"
      alt="my uni"
      class="w-40 mx-auto mb-2"
    />
    <p class="text-lg text-gray-600 mt-2">내가 지원한 대학과 결과를 공유해보세요</p>
    <button
      @click="loginWithGoogle"
      class="mt-[250px] rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 py-2 w-[90%] text-lg text-white font-semibold"
    >
      로그인
    </button>
  </div>
</template>
<script>
import { login } from '../services/AuthService'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async handleLogin() {
      try {
        const credentials = {
          email: this.email,
          password: this.password,
        }
        const response = await login(credentials)
        console.log('로그인 성공:', response)

        // 필요 시 페이지 이동 또는 상태 업데이트
        this.$router.push('/my') // 로그인 후 프로필 페이지로 이동
      } catch (error) {
        console.error('로그인 오류:', error)
      }
    },
    loginWithGoogle() {
      // 백엔드의 Google OAuth 엔드포인트로 이동
      window.location.href = 'http://localhost:3000/api/v1/auth/google:dev'
    },
  },
}
</script>

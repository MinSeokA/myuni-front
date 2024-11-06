<script setup>
import { RouterView } from 'vue-router'
import { onMounted, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'

// 현재 날짜와 시간을 가져오기
const currentDate = new Date()

// 날짜와 시간을 문자열로 포맷팅 AM/PM 12시간 형식
const hour = `${currentDate.getHours() % 12 || 12}`.padStart(2, '0')
const AM_PM = currentDate.getHours() < 12 ? '오전' : '오후'
const minute = `${currentDate.getMinutes()}`.padStart(2, '0')

// 다크 모드 여부를 계산하는 computed 프로퍼티
const isDarkMode = computed(() => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('color-theme') === 'dark'
  }
  return false // localStorage가 undefined일 경우 false 반환
})

// 앱 로드 시 초기 인증 상태 설정
onMounted(() => {
  const { checkAuth } = useAuth()
  checkAuth()
})
</script>

<script>
import { useAuth } from '@/composables/useAuth'
import { onMounted } from 'vue'

export default {
  setup() {
    const { checkAuth } = useAuth()

    onMounted(() => {
      checkAuth() // 앱 로드 시 초기 인증 상태 설정
    })
  },
}
</script>

<template>
  <div class="frame">
    <div class="content scroll-container">
      <div class="sticky top-0 status-bar">
        <div
          class="clock text-dark bg-[#f9f9f9] border-gray-200 dark:bg-gray-900 dark:border-gray-700"
        >
          <div
            :class="
              ('hour',
              {
                'text-white': isDarkMode,
                'text-black': !isDarkMode,
              })
            "
          >
            {{ AM_PM }} {{ hour }}:
          </div>
          <div
            :class="
              ('minute',
              {
                'text-white': isDarkMode,
                'text-black': !isDarkMode,
              })
            "
          >
            {{ minute }}
          </div>
        </div>
        <img
          class="mr-2 bg-[#f9f9f9] border-gray-200 dark:bg-gray-900 dark:border-gray-700"
          src="https://newjeans.kr/imgs/common/status-bar.png"
          alt=""
        />
      </div>
      <RouterView />
    </div>
  </div>
</template>

<template>
  <div class="auth-callback">
    <p>로그인 중입니다...</p>
  </div>
</template>

<script>
export default {
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      const expiresIn = 1 * 60 * 60 * 1000; // 1시간 (1시간 * 60분 * 60초 * 1000밀리초)
      const expiryTime = Date.now() + expiresIn; // 현재 시간에 1시간 더한 만료 시간
      
      // 토큰과 만료 시간을 localStorage에 저장
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpiry', expiryTime);

      this.$router.push({ name: 'my' });
    } else {
      this.$router.push({ name: 'home' });
    }
  },
};
</script>

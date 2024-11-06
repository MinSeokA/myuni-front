<template>
  <div class="max-w-2xl mx-auto p-4">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-semibold">{{ profileName }}님의 합격 스토리</h1>
      <p class="text-gray-600">지원 결과를 확인해 보세요</p>
    </div>

    <!-- 수시 지원 정보 -->
    <div v-if="showSuji" class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">수시 지원</h2>
      <div class="grid grid-cols-2 gap-4">
        <Card v-for="(entry, index) in sujiApplications" :key="index" :university="entry.university"
          :department="entry.department" :applicationType="entry.applicationType" :status="entry.status"
          :showStatus="showPassFail" />
      </div>
    </div>

    <!-- 정시 지원 정보 -->
    <div v-if="showJeongsi" class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">정시 지원</h2>
      <div class="flex gap-4 overflow-x-auto">
        <HorizontalCard v-for="(entry, index) in jeongsiApplications" :key="index" :university="entry.university"
          :department="entry.department" :applicationType="entry.applicationType" :status="entry.status"
          :showStatus="showPassFail" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/card.vue';
import HorizontalCard from '../components/horizontalcard.vue';

export default {
  components: {
    Card,
    HorizontalCard
  },
  props: {
    userUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      profileName: '',
      showSuji: false,
      showJeongsi: false,
      showPassFail: false,
      sujiApplications: [],
      jeongsiApplications: []
    };
  },
  created() {
    this.fetchUserData(this.userId);
  },
  methods: {
    async fetchUserData(userId) {
      try {
        // 서버에서 사용자 데이터를 가져옴 (예: /api/user/:userUrl)
        const response = await fetch(`/user/public/${userId}`);
        const data = await response.json();

        // 받아온 데이터를 컴포넌트의 상태에 저장
        this.profileName = data.profileName;
        this.showSuji = data.showSuji;
        this.showJeongsi = data.showJeongsi;
        this.showPassFail = data.showPassFail;
        this.sujiApplications = data.sujiApplications;
        this.jeongsiApplications = data.jeongsiApplications;
      } catch (error) {
        console.error("사용자 데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    }
  }
};
</script>

<style scoped>
/* 추가적인 스타일을 여기서 설정할 수 있습니다 */
</style>

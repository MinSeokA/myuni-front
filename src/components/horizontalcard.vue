<template>
  <div class="flex items-center p-4 text-left bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg">
    <img v-if="university.logo" :src="university.logo" :alt="university.name"
      class="bg-white p-3 w-20 h-20 mr-5 my-2 rounded-full">
    <div v-else class="w-20 h-20 my-2 mr-5 bg-white rounded-full"></div>
    <div>
      <h3 class="text-2xl font-bold">{{ university.name }}</h3>
      <p class="text-base">{{ university.department }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    university: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
/* 필요에 따라 추가적인 스타일링 */
</style>

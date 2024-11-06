<template>
  <div class="bg-gradient-to-br from-blue-500 to-purple-500 text-white px-1 pt-2 pb-4 rounded-lg flex flex-col items-center">
    <img v-if="university.logo" :src="university.logo" :alt="university.name"
      class="bg-white p-3 w-20 h-20 my-2 rounded-full">
    <div v-else class="w-20 h-20 my-2 bg-white rounded-full"></div>
    <h3 class="text-lg font-bold">{{ university.name }}</h3>
    <p class="text-sm">{{ university.department }}</p>
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

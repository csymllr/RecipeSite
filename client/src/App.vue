<template>
  <div class="relative min-h-screen bg-cover bg-center" :style="backgroundStyle">
    <div class="absolute inset-0 bg-black bg-opacity-40 pointer-events-none"></div>
    <div class="relative z-10">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import mainBg from '@/assets/MainBackground.png';
const backgroundStyle = {
  backgroundImage: `url(${mainBg})`
};
</script>

<style>
/* You can add global styles here if needed */
</style>

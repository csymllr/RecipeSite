<template>
  <div class="relative min-h-screen bg-cover bg-center" style="background-image: url('/TheSharedTables_BG.png'); background-size: cover; background-position: center;">
    <div class="absolute inset-0 bg-black bg-opacity-40 pointer-events-none"></div>
    <div class="relative z-10">
      <router-view />
    </div>
  </div>
</template>

<script setup>
// No script needed for static background style
</script>

<style>
/* All background styles handled inline for global consistency */
</style>

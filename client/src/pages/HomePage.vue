<template>
  <div style="color: black; padding: 40px;" class="min-h-screen flex flex-col gap-8 px-4 py-8">
    <!-- Top Nav Bar Placeholder -->
    <nav class="w-full h-16 bg-white/80 rounded-lg shadow flex items-center justify-between px-6 mb-6">
      <div class="font-bold text-xl text-gray-800">[Nav Bar Placeholder]</div>
      <div class="text-gray-600">Links/Icons</div>
    </nav>

    <!-- Recent Recipes Grid -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-white mb-4">Most Recent Recipes</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div v-for="i in 5" :key="i" class="bg-white/80 rounded-lg shadow p-4 text-gray-800">
          <div class="font-bold">Recipe {{ i }}</div>
          <div class="text-sm text-gray-600">[Recipe details placeholder]</div>
        </div>
      </div>
    </section>

    <!-- URL Input for Recipe Parsing -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-white mb-4">Add a Recipe by URL</h2>
      <form class="flex gap-2 max-w-xl">
        <input type="url" placeholder="Paste recipe URL here..." class="flex-1 px-4 py-2 rounded border border-gray-300" />
        <button type="submit" class="px-6 py-2 rounded bg-blue-600 text-white font-semibold">Parse</button>
      </form>
      <div class="text-white/70 text-sm mt-2">[URL parsing placeholder]</div>
    </section>

    <!-- Top 5 Recent Shared Recipes -->
    <section>
      <h2 class="text-2xl font-semibold text-white mb-4">Top 5 Recent Shared Recipes</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div v-for="i in 5" :key="i" class="bg-white/80 rounded-lg shadow p-4 text-gray-800">
          <div class="font-bold">Shared Recipe {{ i }}</div>
          <div class="text-sm text-gray-600">[Shared recipe details placeholder]</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// No logic yet
</script>

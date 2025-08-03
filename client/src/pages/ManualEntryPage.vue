<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const rawText = ref('');
const result = ref(null);
const loading = ref(false);

const parseRecipe = async () => {
  loading.value = true;
  result.value = null;
  try {
    const { data } = await axios.post('https://us-central1-your-project-id.cloudfunctions.net/parseRecipe', { text: rawText.value });
    result.value = data;
  } catch (err) {
    alert('Failed to parse recipe');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="p-4 max-w-xl mx-auto">
    <h2 class="text-xl font-bold mb-2">Paste Recipe Text</h2>
    <textarea v-model="rawText" rows="10" class="w-full border p-2 mb-4" placeholder="Paste a social media recipe post..."/>
    <button @click="parseRecipe" class="bg-blue-600 text-white px-4 py-2" :disabled="loading">
      {{ loading ? 'Parsing...' : 'Parse Recipe' }}
    </button>

    <div v-if="result" class="mt-6">
      <h3 class="font-semibold text-lg">{{ result.title }}</h3>
      <h4 class="mt-4 font-medium">Ingredients:</h4>
      <ul class="list-disc list-inside">
        <li v-for="(item, index) in result.ingredients" :key="index">{{ item }}</li>
      </ul>

      <h4 class="mt-4 font-medium">Instructions:</h4>
      <ol class="list-decimal list-inside">
        <li v-for="(step, index) in result.instructions" :key="index">{{ step }}</li>
      </ol>
    </div>
  </div>
</template>

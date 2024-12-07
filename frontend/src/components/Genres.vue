<script setup>
import { defineProps, ref } from 'vue';
import Genre from './Genre.vue';

const props = defineProps({
  genres: {
    type: Array,
    required: true
  }
});

const selectedGenres = ref([]);

function toggleGenreSelection(genre) {
  if (selectedGenres.value.includes(genre)) {
    selectedGenres.value = selectedGenres.value.filter(g => g !== genre);
  } else {
    selectedGenres.value.push(genre);
  }
}

</script>

<template>
  <div class="genres-container">
    <Genre
        v-for="genre in genres"
        :key="genre"
        :genre="genre"
        :isSelected="selectedGenres.includes(genre)"
        @select="toggleGenreSelection"
    />
  </div>
</template>

<style scoped>
.genres-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Adjust the gap between genres as needed */
  background-color: #292929; /* Change this to your desired background color */
  border-radius: 10px; /* Change this to your desired border radius */
  padding: 10px;
}
</style>
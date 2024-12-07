<script setup>
import { defineProps } from 'vue';
import Tracks from './Tracks.vue';

const props = defineProps({
  filteredTracks: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div>
    <Tracks :tracks="filteredTracks.map(track => track.track)" />
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
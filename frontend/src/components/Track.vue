<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  track: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="track-item">
    <p>{{ track.name }} - {{ track.artists.map(artist => artist.name).join(', ') }}</p>
  </div>
</template>

<style scoped>
.track-item {
  padding: 10px;
  background-color: #373737;
  border-radius: 5px;
}

p {
  margin: 0;
}
</style>
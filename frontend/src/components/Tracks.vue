<script setup>
import { defineProps } from 'vue';
import Track from './Track.vue';

const props = defineProps({
  tracks: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="tracks-container">
    <h2>Tracks</h2>
    <ul>
      <li v-for="track in tracks" :key="track.id">
        <Track :track="track" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.tracks-container {
  padding: 20px;
  background-color: #292929;
  border-radius: 10px;
}

h2 {
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>
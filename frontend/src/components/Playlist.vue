<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  playlist: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['select']);
</script>

<template>
  <div
      class="playlist"
      :class="{ 'selected': isSelected }"
      @click="$emit('select')"
  >
    <h3>{{ playlist.name }}</h3>
    <p>{{ playlist.type }} - {{ playlist.owner.display_name }}</p>
  </div>
</template>

<style scoped>
.playlist {
  border-radius: 10px;
  margin: 5px 20px;
  padding: 10px 10px;
}

.playlist h3 {
  color: white; /* Title color */
}

.playlist p {
  color: #b8b8b8; /* Slightly darker color for the rest */
}

.playlist:hover {
  background-color: #303030;
}

.playlist.selected {
  background-color: #373737; /* Selected playlist color */
}
</style>
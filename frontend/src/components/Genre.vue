<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  genre: {
    type: String,
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
      class="genre"
      :class="{ 'selected': isSelected }"
      @click="$emit('select', genre)"
  >
    {{ genre }}
  </div>
</template>

<style scoped>
.genre {
  border-radius: 10px;
  width: fit-content;
  background-color: #303030;
  padding: 0px 10px;
}

.genre:hover {
  background-color: #373737;
}

.genre.selected {
  background-color: #1db954;
}
</style>
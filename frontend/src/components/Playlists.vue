<template>
  <div v-if="playlists && playlists.length" class="playlists-container">
    <h2>Playlists</h2>
    <Playlist
        v-for="playlist in playlists"
        :key="playlist.id"
        :playlist="playlist"
        :isSelected="selectedPlaylist === playlist.id"
        @select="selectPlaylist(playlist.id)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import Playlist from './Playlist.vue';

const playlists = ref([]);
const selectedPlaylist = ref(null);
const emit = defineEmits(['update:selectedPlaylist']);

async function fetchPlaylists() {
  const response = await fetch('/playlists/all');
  if (response.ok) {
    playlists.value = (await response.json()).items;
  } else {
    console.error('Failed to fetch playlists');
  }
}

function selectPlaylist(playlistId) {
  selectedPlaylist.value = playlistId;
  emit('update:selectedPlaylist', playlistId);
}

onMounted(() => {
  fetchPlaylists();
});
</script>

<style scoped>
.playlists-container {
  background-color: #292929; /* Change this to your desired background color */
  border-radius: 10px; /* Change this to your desired border radius */
  padding: 10px;
}
</style>
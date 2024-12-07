<script setup>
import { ref } from 'vue';
import Playlists from "./Playlists.vue";
import Genres from "./Genres.vue";

const selectedPlaylist = ref(null);
const playlist = ref(null);
const artists = ref(null);
const genres = ref([]);
const selectedGenres = ref([]);

async function updateSelectedPlaylist(playlistId) {
  selectedPlaylist.value = playlistId;
  await updateGenres(playlistId);
}

async function updateGenres(playlistId) {
  const responsePlaylit = await fetch(`/playlists/${playlistId}`);
  if (responsePlaylit.ok) {
    playlist.value = await responsePlaylit.json();
    console.log(playlist.value.items);
  }

  const artistIds = playlist.value.items.flatMap(item => item.track.artists.map(artist => artist.id));
  const uniqueArtistIds = [...new Set(artistIds)];
  console.log(`uniqueArtistIds: ${uniqueArtistIds}`);

  console.log(`/artists/${uniqueArtistIds.join(",")}`)
  const responseArtists = await fetch(`/artists?id=${uniqueArtistIds.join(",")}`);
  if (responseArtists.ok) {
    artists.value = await responseArtists.json();
    console.log(artists.value);
  }

  genres.value = [...new Set(artists.value.artists.flatMap(artist => artist.genres))];
  console.log(genres.value);
}

</script>

<template>
  <Playlists @update:selectedPlaylist="updateSelectedPlaylist" />
  <Genres :genres="genres" />
</template>

<style scoped>

</style>
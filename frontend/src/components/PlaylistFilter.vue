<script setup>
import { ref } from 'vue';
import Playlists from './Playlists.vue';
import Genres from './Genres.vue';
import CustomPlaylist from './CustomPlaylist.vue';

const selectedPlaylist = ref(null);
const genres = ref([]);
const selectedGenres = ref([]);
const usersPlaylists = ref([]);
const usersSelectedPlaylist = ref(null);
const UserSelectedArtistsFromPlaylist = ref(null);
const filteredTracks = ref([]);
const playlistName = ref('');

const props = defineProps({
   userId: {
      type: String,
   },
})

const emit = defineEmits(['reset-genres']);

async function updateSelectedPlaylist(playlistId) {
  selectedPlaylist.value = playlistId;
  await updateGenres(playlistId);
  resetGenres();
}

async function updateGenres(playlistId) {
  const responsePlaylit = await fetch(`/playlists/${playlistId}`);
  if (responsePlaylit.ok) {
    usersSelectedPlaylist.value = await responsePlaylit.json();
  }
  const artistIds = usersSelectedPlaylist.value.items.flatMap(item => item.track.artists.map(artist => artist.id));
  const uniqueArtistIds = [...new Set(artistIds)];
  const responseArtists = await fetch(`/artists?id=${uniqueArtistIds.join(",")}`);
  if (responseArtists.ok) {
    UserSelectedArtistsFromPlaylist.value = await responseArtists.json();
  }

  genres.value = [...new Set(UserSelectedArtistsFromPlaylist.value.artists.flatMap(artist => artist.genres))];
}

function updateUsersPlaylists(fetchedPlaylists) {
  usersPlaylists.value = fetchedPlaylists;
}

function updateSelectedGenres(fetchedGenres) {
  selectedGenres.value = fetchedGenres;
  updateCustomPlaylist();
}

function updateCustomPlaylist() {
  if (selectedPlaylist.value === null) {
    return;
  }

  const selectedGenresSet = new Set(selectedGenres.value);
  filteredTracks.value = usersSelectedPlaylist.value.items.filter(item => {
    const trackGenres = item.track.artists.flatMap(artist => {
      const artistData = UserSelectedArtistsFromPlaylist.value.artists.find(a => a.id === artist.id);
      return artistData ? artistData.genres : [];
    });
    return trackGenres.some(genre => selectedGenresSet.has(genre));
  });
}

function resetGenres() {
  emit('reset-genres');
}

async function createCustomPlaylist() {
  const response = await fetch('/playlists/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      name: playlistName.value,
      tracks: filteredTracks.value.map(track => track.track.id),
      userId: props.userId,
    }) 
  });

  if (response.ok) {
    console.log('Custom playlist created successfully');
  } else {
    console.error('Failed to create custom playlist');
  }
}
</script>

<template>
  <Playlists @update:selectedPlaylist="updateSelectedPlaylist" @playlistsFetched="updateUsersPlaylists"/>
  <Genres :genres="genres" @update:selectedGenres="updateSelectedGenres" @reset-genres="resetGenres"/>
  <CustomPlaylist :filteredTracks="filteredTracks"/>
  <input type="text" @input="(event) => playlistName = event.target.value" 
  class="text-[#1F1F1F] ml-3 mt-5 rounded-lg h-4 md:h-7 lg:h-10
   " placeholder="Nom de la playlist"></input><br/>
  <button class=" h-4 md:h-8 lg:h-12" @click="createCustomPlaylist">Create Custom Playlist</button>
</template>

<style scoped>
button {
  margin: 10px;
  padding: 10px;
  background-color: #1db954;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

</style>
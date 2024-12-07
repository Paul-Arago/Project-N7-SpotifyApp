<template>
<router-view></router-view>
</template>

<script setup>
import { ref } from "vue";
import Playlists from "./components/Playlists.vue";
import PlaylistFilter from "./components/PlaylistFilter.vue";
var userData = ref(null);
var playlists = ref(null);

async function login(){
  const response = await fetch("/login");
  const authUrl = await response.text();
  window.location = authUrl;
}

async function getUser(){
  const response = await fetch("/user");
  if (response.ok) {
    userData.value = await response.json();
    console.log(userData.value);
  } else {
    console.error("Failed to fetch user data");
  }
}

async function getAllPlaylists() {
  const response = await fetch("/playlists/all");
  if (response.ok) {
    playlists.value = await response.json();
    console.log(playlists.value.items);
  } else {
    console.error("Failed to fetch playlists");
  }
}

async function logout() {
  try {
    const response = await fetch("/logout");
    if (response.ok) {
      localStorage.clear();
      sessionStorage.clear();
      const url = await response.text();
      window.location = url;
    } else {
      const errorText = await response.text();
      console.error("Failed to logout:", errorText);
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
}
</script>

<style>
body{
  background-color: #1F1F1F;
  color: white;
}
</style>
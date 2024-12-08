<template>
<Header />
<div class="text-white text-base sm:text-lg lg:text-xl flex">
    <img :src="profilePicUrl" class="mt-1 ml-2" v-bind:src="profilePicUrl" />
    <div>
        <p class="mt-1 mb-1 ml-2">{{userName}}</p>
        <p class="mt-1 mb-2 ml-2">{{followersNumber}} followers</p>
    </div>
</div>

<button @click="logout()">Logout</button><br>

<PlaylistFilter :userId="userId" />

<router-view></router-view>
</template>

<script setup>
import Header from "/src/components/Header.vue";
import { ref, onMounted } from 'vue';
import defaultProfilePic from "../assets/default_profile_pic.jpg"
import Playlists from "./Playlists.vue";
import PlaylistFilter from "./PlaylistFilter.vue";

const userData = ref(null);
const playlists = ref(null);
const userName = ref(null);
const userId = ref(null);
const followersNumber = ref(null);
const profilePicUrl = ref(null);


onMounted(() => {
    displayUserInformations();
});

async function displayUserInformations() {
    fetch("/user")
    .then((response) => response.json())
    .then((data) => {
        userId.value = data.id;
        userName.value = data.display_name;
        followersNumber.value = data.followers.total;
        profilePicUrl.value = data.images.length > 0 ? data.images[0].url : defaultProfilePic;
    });
}

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
    if (response.status == 200) {
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
img {
    width: 64;
    height: 64px;
    object-fit: contain;
    border-radius: 50%;
    border: 3px solid grey;
}
</style>
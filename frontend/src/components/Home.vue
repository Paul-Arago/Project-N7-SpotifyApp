<template>
<Header />
<div class="text-white text-base sm:text-lg lg:text-xl flex">
    <img :src="profilePicUrl" class="mt-1 ml-2" v-bind:src="profilePicUrl" />
    <div>
        <p class="mt-1 mb-1 ml-2">{{userName}}</p>
        <p class="mt-1 mb-2 ml-2">{{followersNumber}} followers</p>
    </div>
    
</div>
<router-view></router-view>
</template>

<script setup>
import Header from "/src/components/Header.vue";
import { ref, onMounted } from 'vue';
import defaultProfilePic from "../assets/default_profile_pic.jpg"

const userName = ref();
const followersNumber = ref();
const profilePicUrl = ref();


onMounted(() => {
    displayUserInformations();
});

async function displayUserInformations() {
    fetch("/user")
    .then((response) => response.json())
    .then((data) => {
        userName.value = data.display_name;
        followersNumber.value = data.followers.total;
        profilePicUrl.value = data.images.length > 0 ? data.images[0].url : defaultProfilePic;
    });
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
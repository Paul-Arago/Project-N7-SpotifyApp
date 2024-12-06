<template>
<Header />
<div class="grid grid-cols-3">
    <div class="col-start-2 col-end-2">
        <p class="text-white text-xl sm:text-2xl lg:text-4xl mt-3 text-center">
            Connectez-vous pour commencer à créer vos playlists !
        </p>
        <button class="bg-white text-black rounded-3xl w-full text-base sm:text-lg lg:text-xl h-6 sm:h-9
         lg:h-12 mt-5 hover:font-bold bg-white hover:bg-[#C8C8C8]" 
         @click="login()">Connexion</button><br>
    </div>
</div>



<router-view></router-view>
</template>

<script setup>
import Header from "/src/components/Header.vue"

async function login(){
    const response = await fetch("/login"); 
    const authUrl = await response.text();
    window.location = authUrl;
}
</script>

<style>
</style>



<template>
<h1>Works</h1>
<button @click="login()">Connexion</button><br>
<button @click="getUser()">Get User</button>
</template>

<script setup>
import { ref } from "vue";
var data;
async function login(){
    const response = await fetch("/login"); 
    const authUrl = await response.text();
    window.location = authUrl;
}

async function getUser(){
    const response = await fetch("/user");
    console.log(await response);
}

</script>
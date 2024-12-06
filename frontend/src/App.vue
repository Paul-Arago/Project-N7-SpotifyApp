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
    console.log(response);
}

async function getUser(){
    const response = await fetch("/user", {
        headers: {"Content-Type": "application/json"}
    });
    console.log(await response.json());
}

</script>
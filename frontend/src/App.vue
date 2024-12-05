<template>
<h1>Works</h1>
<button @click="login()">Connexion</button>
</template>

<script setup>
async function login(){
    const response = await fetch("https://localhost:3000/login"); 
    this.data = await response.json();
}

</script>
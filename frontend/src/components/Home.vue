<template>
<Header />
<button @click="getUser()">TEST</button>

<router-view></router-view>
</template>

<script setup>
import Header from "/src/components/Header.vue"

async function getUser(){
    const response = await fetch("/user");
    console.log(await response);
}

</script>
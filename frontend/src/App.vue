<template>
<h1>Home</h1>
<button @click="redirectToSpotifyAuthorize()">CONNEXION</button><br/><br/>
<button @click="getName()">GETNAME</button>
<p>{{name}}</p>
</template>

<script setup>
import { ref } from 'vue';
const name = ref(null);
const clientId = '2c808afcd0df4f5cabf8ca9fd16dec0e';
const redirectUrl = 'http://localhost:5173/';

const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = 'user-read-private user-read-email';

async function getName(){
    console.log(localStorage.getItem('code_verifier'));
    await getToken(localStorage.getItem('code'));
    const response = await fetch("https://api.spotify.com/v1/me", {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
    });
    name.value = await response.json();
}

async function sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
}

function base64urlencode(a){
  return btoa(String.fromCharCode.apply(null, new Uint8Array(a))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''));
}

async function redirectToSpotifyAuthorize() {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");
  const code_verifier = randomString;
  const data = new TextEncoder().encode(code_verifier);
  //const hashed = await crypto.subtle.digest('SHA-256', data);
  /*const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');*/

  /////////
  const hashed = await sha256(code_verifier)
  const code_challenge_base64 = base64urlencode(hashed)
  /////////

  window.localStorage.setItem('code_verifier', code_verifier);

  const authUrl = new URL(authorizationEndpoint)
  const params = {
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    code_challenge_method: 'S256',
    code_challenge: code_challenge_base64,
    redirect_uri: redirectUrl,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  localStorage.setItem('code', code);
} 

async function getToken(code) {
  const code_verifier = localStorage.getItem('code_verifier');

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUrl,
      code_verifier: code_verifier,
    }),
  });
  const util = await response.json();
  window.localStorage.setItem('token', util.access_token);
  console.log(util.access_token);
}

</script>
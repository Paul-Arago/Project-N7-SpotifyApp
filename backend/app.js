import express from 'express';
import * as crypto from 'crypto';
import axios from 'axios';
import querystring from 'querystring';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors())
const client_id = '2c808afcd0df4f5cabf8ca9fd16dec0e';
const redirect_uri = 'http://localhost:3000/callback';
var token;

const generateRandomString = (length) => {
    return crypto.randomBytes(60).toString('hex').slice(0, length);
}

app.get('/', () => {
    console.log("root");
})

app.get('/login', function (req, res) {
    var state = generateRandomString(16);
    const scope = 'ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private';
    var queryParams = querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    });
    res.send('https://accounts.spotify.com/authorize?' + queryParams);
});

app.get('/logout', function (req, res) {
    token = null;
    res.send('http://localhost:5173');
}
);

app.get('/callback', async function (req, res   ) {
    var code = req.query.code || null;
    var state = req.query.state || null;
    if (state === null) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        const response = await axios({
            url: 'https://accounts.spotify.com/api/token',
            method: 'post',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + "357896baab46459f9929d1de938e3fca").toString('base64'))
            },
            params: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            }
        })

        if(response.status === 200){
            token = response.data.access_token;
        }

        res.redirect("http://localhost:5173");
    }
});

app.get('/user', async function(req,res) {
    const userResponse = await axios({
        url: 'https://api.spotify.com/v1/me',
        method: 'get',
        headers: { 'Authorization': 'Bearer ' + token }
    })
    
    if(userResponse.status === 200){
        res.send(userResponse.data)
    }
});

app.get('/playlists/all', async function(req,res) {
    const playlistResponse = await axios({
        url: 'https://api.spotify.com/v1/users/31n6hfj564vkf7acsirjusqd7qm4/playlists',
        method: 'get',
        headers: { 'Authorization': 'Bearer ' + token }
    })

    if(playlistResponse.status === 200){
        res.send(playlistResponse.data)
    }
});

app.get('/playlists/:id', async function(req, res) {
    const playlistId = req.params.id;
    try {
        const playlistResponse = await axios({
            url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            method: 'get',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (playlistResponse.status === 200) {
            res.json(playlistResponse.data); // Ensure JSON response
        } else {
            res.status(playlistResponse.status).json({ error: playlistResponse.statusText });
        }
    } catch (error) {
        console.error("Error fetching playlist:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/artists', async function(req, res) {
    const artistId = req.query.id;
    try {
        const artistResponse = await axios({
            url: `https://api.spotify.com/v1/artists/?ids=${artistId}`,
            method: 'get',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (artistResponse.status === 200) {
            res.json(artistResponse.data); // Ensure JSON response
        }
    } catch (error) {
        console.error("Error fetching artist:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => { });
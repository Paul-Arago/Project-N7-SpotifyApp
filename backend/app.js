import express from 'express';
import * as crypto from 'crypto';
import axios from 'axios';
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
    var scope = 'user-read-private user-read-email';
    res.status(200).send('https://accounts.spotify.com/authorize?' + 
    "response_type=code&" +
    "client_id="+client_id+"&" +
    "scope=user-read-private%20user-read-email&" +
    "redirect_uri="+ redirect_uri + "&" +
    "state=" + state);
});

app.get('/callback', async function (req, res) {
    var code = req.query.code || null;
    var state = req.query.state || null;
    if (state === null) {
        res.status(500).redirect('http://localhost:5173/');
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
        .then((tokenRes) => {
            token = tokenRes.data.access_token;
            res.status(200).redirect('http://localhost:5173/home');
        })
        .catch(() => res.status(500).redirect('http://localhost:5173/'));
    }
});

app.get('/user', async function(req,res) {
    const getUser = await axios({
        url: 'https://api.spotify.com/v1/me',
        method: 'get',
        headers: { 'Authorization': 'Bearer ' + token }
    }).catch(error => res.status(500).send())
    
    if(getUser.status == 200){
        res.status(200).json(getUser.data);
    }
});

app.listen(port, () => { });
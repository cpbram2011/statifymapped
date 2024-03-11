// const dotenv = require('dotenv')
// dotenv.config('../../.env')
var secret = require('../../config/keys')
var express = require('express'); // Express web server framework
var router = express.Router();
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = secret.client_id; // Your client id
var client_secret = secret.secretOrKey; // Your secret


var redirect_uri;
if (process.env.NODE_ENV === 'production') {
    // redirect_uri = 'https://statifymapped.com/callback';
    redirect_uri = 'https://statifymapped-b581e01ec5ad.herokuapp.com/callback';
} else {
    redirect_uri = 'http://localhost:8000/callback';
}



/**
 * Generates a random string containing numbers and letters
  * @param  {number} length The length of the string
  * @return {string} The generated string
  */
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = 'spotify_auth_state';



router.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());

router.get('/login', function (req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your routerlocation requests authorization

    var scope = 'user-library-read user-read-private user-read-email user-read-recently-played user-modify-playback-state user-top-read user-read-currently-playing playlist-read-collaborative playlist-read-private';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));

});

router.get('/callback', function (req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {

            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {

                });

                var res_uri;
                    if (process.env.NODE_ENV === 'production') {
                        res_uri = 'https://statifymapped.com/#/';
                        // res_uri = 'https://statifymapped-b581e01ec5ad.herokuapp.com/#/';
                    } else {
                        res_uri = 'http://localhost:3000/#/';
                    }
                // we can also pass the token to the browser to make requests from there
                res.redirect(res_uri +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});

router.get('/test', (req, res) => {
    res.send('test complete')
})

router.get('/refresh_token', function (req, res) {

    // requesting access token from refresh token
    
    var refresh_token = req.query.refresh_token;  
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token,
                'refresh_token': refresh_token
            });
        }
    });
});

module.exports = router;
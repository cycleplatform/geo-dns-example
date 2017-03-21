const express = require('express');
const path = require('path');
const spdy = require('spdy');
const fs = require('fs');

const app = express();

const location = process.env.CYCLE_LOCATION_CITY.toLowerCase();
const port = 443;

app.use('/css', express.static(path.join(__dirname, 'css')));

console.info("Location: ", location);

app.get('*', function (req, res) {
    switch (location) {
        case "amsterdam":
            res.sendFile(path.join(__dirname + '/templates/amsterdam.html'));
            break;
        case "phoenix":
            res.sendFile(path.join(__dirname + '/templates/phoenix.html'));
            break;
        case "chicago":
        default:
            res.sendFile(path.join(__dirname + '/templates/chicago.html'));
    }
});

const options = {
    spdy: {
        // plain: true,
        // ssl: false
    }
};

try {
    options.key = fs.readFileSync('/tls/current.key');
    options.cert = fs.readFileSync('/tls/current.cert');
    options.ca = fs.readFileSync('/tls/current.chain');
} catch (e) {
    console.error("No certs installed.")
}

spdy
    .createServer(options, app)
    .listen(port, (error) => {
        if (error) {
            console.error(error)
            return process.exit(1)
        } else {
            console.log('Listening on port: ' + port)
        }
    });

// Redirect to https
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);
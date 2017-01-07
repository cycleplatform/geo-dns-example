var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
    console.log(process.env.CYCLE_LOCATION_CITY.toLowerCase());
    switch (process.env.CYCLE_LOCATION_CITY.toLowerCase()) {
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

app.use('/css', express.static(path.join(__dirname, 'css')))

app.listen(80);

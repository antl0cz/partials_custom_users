// require dependencies
var express = require('express');
var path = require('path');
var root = __dirname;
var port = process.env.PORT || 8000;
var app = express();

// get files from client, Skeleton-2.0.4, and bower_components
app.use(express.static(path.join(root, './client')));
app.use(express.static(path.join(root, './client/Skeleton-2.0.4')));
app.use(express.static(path.join(root, './bower_components')));

app.listen(port, function () {
    console.log('running');
})
var express = require("express");
var path = require("path");
var fs = require("fs");
var morgan = require("morgan");

var port = 3000;

var app = express();

app.use(morgan("short"));

app.use(function (req, res, next) {
    console.log("Request IP: " + req.url);
    console.log("Request date: " + new Date());
    next();
});

/* 
    Uses path join to find the path where the file should be
*/
app.use(function (req, res, next) {
    var filePath = path.join(__dirname, "static", req.url);
    fs.stat(filePath, function (err, fileInfo) {
        if (err) {
            next();
            return;
        }

        if (fileInfo.isFile()) {
            res.sendFile(filePath);
        } else {
            next();
        }
    });
});

app.use(function (req, res) {
    res.status(404);
    res.send("File not Found!")
});

app.listen(port, function () {
    console.log("App started on port " + port);

})
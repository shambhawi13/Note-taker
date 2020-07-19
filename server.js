const express = require('express');
//const mysql = require('mysql');
const path = require('path');
const fs = require('fs');
let db = require('./db/db.json');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.json(db);
});

app.get("/api/notes/:id", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.post("/api/notes", function (req, res) {
  let data = req.body;
  if (!data.id) {
    console.log('New Save called');
    data.id = db.length;
    db.push(data);
    res.json(data);
  }
  else {
    console.log('Edit called');
    let id = data.id;
    db[id] = data;
    res.json(data);
  }

});

app.put("/api/notes", function (req, res) {
  // Empty out the arrays of data
  let data = req.body;
  let id = data.id;
  db[id] = data;
  res.json(data);
});

app.delete("/api/notes/:id", function (req, res) {
  let id = req.params.id;
  let filteredData = db.filter(function (elem) {
    return elem.id != id;
  });
  db = [];
  db = filteredData;
  res.json(filteredData);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
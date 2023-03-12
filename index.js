// index.js

const fs = require('fs');
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const activities = require("./activities.json");
const port = process.env.PORT || 5050;

app.get("/", function(req,res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/autumn", function(req,res) {
    //console.log("reqの中身",req.body);
    fs.writeFile(__dirname + "/data.txt",req.body.activity,function(){
        res.send("投稿完了");
    });
});

app.post("/update", function(req,res) {
    //console.log(activities[0].activity);
    activities[0].activity = req.body.updateActivity;
    res.send(activities);
});

app.post("/delete",function(req,res){
    //console.log(req.body);
    activities.splice(req.body.number, 1);
    res.send(activities);
});

app.listen(port, function() {
   console.log(`Listening on ${port}`); 
});
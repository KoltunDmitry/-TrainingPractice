const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const functional = require('./server/functionalServer.js');
const path = './server/data/posts.json';



app.use('/', express.static('public'));
app.use(bodyParser.json());



app.get('/getpost', (req, res) => {
    let post = functional.getPhotoPost(req.query.id.toString());
    if (post) {
        res.status(200).send(post).end();
    } else {
        res.send(404).end();
    }
});
app.get('/getallusers',(req,res)=>{
    let users = functional.getAllAuthor();
    if(users){
        res.status(200).send(users).end();
    }
    else{
        res.send(404).end();
    }
});
app.get('/getallposts',(req,res) => {
   let posts = functional.getAllPosts();
   if(posts){
       res.send(posts).end();
   }
   else{
       res.send(404).end();
   }
});
app.delete('/remove', (req, res) => {
    let post = functional.removePhotoPostLabeled(req.query.id.toString());
    console.log(post);
    if(post){
        fs.writeFileSync(path,JSON.stringify(functional.getAllPosts()));
        res.status(200).send().end(200);
    }
    else{
        res.send(404).end();
    }
});
app.post('/add', (req, res) => {
    let post = functional.addPhotoPost(req.body);
    if(post){
        fs.writeFileSync(path,JSON.stringify(functional.getAllPosts()));
        res.status(200).send(req.body).end();
    }
    else{
        res.sendStatus(404).end();
    }
});

app.put('/edit',(req,res)=>{
    let idPost = req.query.id;
    let newPost = req.body;
    let isEdit = functional.editPhotoPost(idPost, newPost);
    if(isEdit){
        fs.writeFileSync(path,JSON.stringify(functional.getAllPosts()));
        res.status(200).send().end();
    }
    else{
        res.send(404).end();
    }
});
app.post('/getposts', (req, res) => {
    let postFiltering = functional.getPhotoPosts(req.query.skip, req.query.top, req.body);
    if(postFiltering && postFiltering.length!==0){
        res.status(200).send(postFiltering).end();
    }
    else if(req.query.skip > req.query.top){
        res.send(404).end();
    }
});


app.listen(3000, function () {
    console.log('listen 3000 port');
});
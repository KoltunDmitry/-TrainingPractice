'use strict';
var MyModule =(function() {

    var user = "Иванов Иван";
    setNickname();
    setPhotoProfile();
    function showPhotoPost(photoPost) {
        var post = document.createElement("div");
        post.className = "post";
        var headPost = document.createElement("div");
        headPost.className = "headPost";
        if(user === photoPost.author) {
            var buttonHead = document.createElement("div");
            buttonHead.className = "buttonHead";
            var buttonDelete = document.createElement("button");
            var buttonEdit = document.createElement("button");
            buttonDelete.innerHTML = "<img src = \"image/waste.png\" alt = \"delete\" class=\"deletePost\">";
            buttonEdit.innerHTML = "<img src = \"image/edit.jpg\" alt = \"edit\" class=\"editPost\">";
            buttonHead.appendChild(buttonDelete);
            buttonHead.appendChild(buttonEdit);
            headPost.appendChild(buttonHead);
        }
        var imgAvatar = document.createElement("img");
        imgAvatar.setAttribute("src","image/profile.png");
        imgAvatar.className = "roundAvatar";
        headPost.appendChild(imgAvatar);
        var blockNameDate = document.createElement("div");
        blockNameDate.className = "blockNameDate";
        var nicknamePost = document.createElement("div");
        nicknamePost.className = "nicknamePost";
        nicknamePost.innerHTML = photoPost.author;
        blockNameDate.appendChild(nicknamePost);
        var datePhoto = document.createElement("div");
        datePhoto.className = "datePhoto";
        datePhoto.innerHTML = formatDate(photoPost.createdAt);
        blockNameDate.appendChild(datePhoto);
        headPost.appendChild(blockNameDate);

        //nice
        var text = document.createElement("div");
        text.className = "text";
        text.innerHTML = photoPost.description;
        var photoPlace = document.createElement("div");
        photoPlace.className = "photoPlace";
        var photo = document.createElement("img");
        photo.setAttribute("src",photoPost.photoLink);
        photo.className = "photo";
        photoPlace.appendChild(photo);
        //nice
        var likeAndHashtags = document.createElement("div");
        likeAndHashtags.className = "likeAndHashtags";

        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.innerHTML = "<img src = \"image/whiteheart.png\" alt = \"like\" class=\"like\">";
        likeAndHashtags.appendChild(a);
        var line = document.createElement("img");
        line.className = "lineLikeAndHashtags";
        line.src="image/line.png";
        likeAndHashtags.appendChild(line);
        var hashtagInPost = document.createElement("span");
        hashtagInPost.className = "hashtagInPost";
        var hashTags = "";
        photoPost.hashTag.forEach(function (item) {
            hashTags+= item + " ";
        });
        hashtagInPost.innerHTML = hashTags;
        likeAndHashtags.appendChild(hashtagInPost);
        post.appendChild(headPost);
        post.appendChild(text);
        post.appendChild(photoPlace);
        post.appendChild(likeAndHashtags);
        var posts = document.getElementById("posts");
        posts.appendChild(post);
        addFilterAuthor();
        addFilterHashtags();
    }
    function formatDate(date) {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }

    function addFilterAuthor(){
        var listAuthor = document.getElementById("listAuthor");
        var nameAuthors = functionPost.getAllAuthor();
        var formDatalist = "";
        nameAuthors.forEach(function (item) {
            formDatalist += "<option>" + item + "</option>";
        });
        listAuthor.innerHTML = formDatalist;
    }
    function addFilterHashtags(){
        var listHashtags = document.getElementById("suggestions");
        var nameHashtags = functionPost.getAllHashtags();
        var formDatalist = "";
        nameHashtags.forEach(function (item) {
            formDatalist += "<option>" + item + "</option>";
        });
        listHashtags.innerHTML = formDatalist;
    }
    function setNickname() {
        if (user) {
            var nickname = document.getElementById("nicknameHeader");
            nickname.innerHTML = "<h3>" + user + "</h3>";
        }
    }
    function setPhotoProfile(){
        if(user){
            var photoProfile = document.getElementById("containerProfile");
            var a = document.createElement("a");
            a.setAttribute("href", "#");
            a.innerHTML = "<img src=\"image/arrow.png\" alt=\"\" class=\"arrow-icon\">"
                +"<img src=\"image/profile.png\" alt=\"\" id=\"profile\">";
            photoProfile.appendChild(a);
        }
    }
    function showPosts(skip, top, filterConfig) {
        //document.getElementsByClassName("posts")[0].innerHTML = "";
        update();
        var photoPosts = functionPost.getPhotoPosts(skip, top, filterConfig);
        for (var i = 0; i < photoPosts.length; i++) {
            if(!photoPosts[i].isDelete)
            showPhotoPost(photoPosts[i]);
        }
    }
    function addPhotoPost(post) {
        functionPost.addPhotoPost(post);
        showPosts(0,10);
    }

    function removePhotoPostLabeled(id) {
        functionPost.removePhotoPostLabeled(id);
        showPosts(0,10);
    }

    function editPost(id,post) {
        functionPost.editPhotoPost(id, post);
        showPosts(0,10);
    }
    function update(){
        var posts = document.getElementById("posts");
        posts.innerHTML = "";
    }
       /* setNickname();
        setPhotoProfile();
        showPosts(0,10);
        removePhotoPostLabeled("1");
        editPost("3",{
            id: '3',
            description: 'China',
            createdAt: new Date('2018-04-23T15:00:00'),
            author: 'Дмитриев Дмитрий',
            photoLink: 'http://www.vladtime.ru/uploads/posts/2018-01/1515326200_navalnyi-o-alishere-usmanove-mitingah-i-kirille-serebrennikove.jpg',
            hashTag: ["#some"],
            like: ["Dima", "IVAN"],
            isDelete: false
        })*/
       showPosts(0,5);
       editPost("1", {description:"кого-то не допустили до выборов"});
       removePhotoPostLabeled("3");
       addPhotoPost({
           id: '10',
           description: 'Домрачева выиграла золото!!!',
           createdAt: new Date('2018-04-23T15:00:00'),
           author: 'Дмитриев Дмитрий',
           photoLink: 'http://www.vladtime.ru/uploads/posts/2018-01/1515326200_navalnyi-o-alishere-usmanove-mitingah-i-kirille-serebrennikove.jpg',
           hashTag: ["#Domracheva", "#Gold"],
           like: ["Dima", "IVAN"],
           isDelete: false
       });

    return {
        showPhotoPost,
        showPosts,
        editPost,
        removePhotoPostLabeled,
        addPhotoPost,
        update,
        addFilterHashtags,
        addFilterAuthor
    };
})();

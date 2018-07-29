"use strict";
var moduleWorkWithChangingPost = function () {

    const fs = require('fs');

    const jsonUsers = fs.readFileSync('/Users/DIMA/Desktop/EducationalPractice/Site/server/data/users.json')

    const jsonPosts = fs.readFileSync('/Users/DIMA/Desktop/EducationalPractice/Site/server/data/posts.json');

    var users = [];
    users = JSON.parse(jsonUsers);
    var photoPosts = [];
    photoPosts = JSON.parse(jsonPosts);

    function formatDate(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }
    function splitDate(strDate) {
        var date = strDate.split("/");
        date[0] = Number(date[0]);
        date[1] = Number(date[1]);
        date[2] = Number(date[2]);
        return date;
    }
    function compareDate(a, b) {
        if(!(a instanceof Date)){
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
        else{
            return b.createdAt - a.createdAt;
        }
    }

    function unique(arr) {
        var obj = {};
        for (let i = 0; i < arr.length; i++) {
            var str = arr[i];
            obj[str] = true;
        }
        return Object.keys(obj);
    }

    function getAllAuthor() {
        var name = [];
        users.forEach(function (item) {
            if (!item.isDelete) {
                name.push(item);
            }
        });
        return name;
    }

    function getAllHashtags() {
        var hashtags = [];
        photoPosts.forEach(function (itemPost) {
            if (!itemPost.isDelete) {
                itemPost.hashTag.forEach(function (itemHashtag) {
                        hashtags.push(itemHashtag)
                    }
                )
            }
        });
        return unique(hashtags);
    }

    function getPhotoPosts(skip, top, filterConfig) {
        skip = skip || 0;
        top = top || 0;
        if(!photoPosts){
            return null;
        }
        var min = top;
        if (min > photoPosts.length) {
            min = photoPosts.length;
        }
        var postsNotDeleted = photoPosts.filter(function (post) {
            if (!post.isDelete) {
                return true;
            }
        });
        if (!filterConfig) {
            return postsNotDeleted.sort(compareDate).slice(skip, min);
        }
       // if(filterConfig.author.length === 0 &&
         //   filterConfig.createdAt.toString().length === 0 && filterConfig.hashTag.length === 0){
           // return postsNotDeleted.sort(compareDate).slice(skip, min);
        //}
        else {
            var result = postsNotDeleted;
            if (filterConfig.author && filterConfig.author.length !== 0) {
                result = result.filter(function (post) {
                    return post.author === filterConfig.author;
                })
            }
            if (filterConfig.createdAt && filterConfig.createdAt.toString().length !== 0) {
                result = result.filter(function (post) {
                    return formatDate(post.createdAt) === formatDate(filterConfig.createdAt);
                })
            }
            if (filterConfig.hashTag && filterConfig.hashTag.length !== 0) {
                result = result.filter(function (post) {
                    for (let hashTag of post.hashTag) {
                        for (let hashTagSearch of [].concat(filterConfig.hashTag)) {
                            if (hashTag === hashTagSearch) {
                                return true;
                            }
                        }
                    }
                });
            }
            return result.sort(compareDate).slice(skip, min);
        }
    }

    function getPhotoPost(id) {
        var found = photoPosts.find(function (element) {
            return element.id === id;
        });
        return found;
    }

    function validatePhotoPost(post) {
        var isValidate = true;
        post.createdAt = new Date(post.createdAt);
        if (typeof post.id !== "string" || typeof post.description !== "string"
            || typeof post.author !== "string" || typeof post.photoLink !== "string"
            || !(post.createdAt instanceof Date)) {
            return false
        }
        if(photoPosts) {
            photoPosts.forEach(function (item) {
                if (item.id === post.id) {
                    return false;
                }
            });
        }
        if (post.description.length === 0 || post.description.length >= 200) {
            return false;
        }
        if (post.photoLink.length === 0) {
            return false;
        }
        if (!post.createdAt || post.createdAt.toString() === "Invalid Date") {
            return false;
        }
        if (post.author.length === 0 || !post.author) {
            return false;
        }
        return true;
    }

    function addPhotoPost(post) {
        if (validatePhotoPost(post)) {
            post.isDelete = false;
            photoPosts.push(post);
            return post;
        }
        return false;
    }


    function removePhotoPostLabeled(id) {
        let post = photoPosts.find(post => post.id === id);
        if (post) {
            post.isDelete = true;
            return true;
        }
        return false;
    }

    function editPhotoPost(id, postWhichWillChanged) {
        postWhichWillChanged.createdAt = new Date(postWhichWillChanged.createdAt);
        if(postWhichWillChanged.isDelete === 'true'){
            postWhichWillChanged.isDelete = true;
        }
        else if(postWhichWillChanged.isDelete === 'false'){
            postWhichWillChanged.isDelete = false;
        }
        let post = photoPosts.find(post => post.id === id);
        if (post && post.isDelete === false) {
            if (postWhichWillChanged.description) {
                post.description = postWhichWillChanged.description;
            }
            else {
                return false;
            }
            if (postWhichWillChanged.hashTag && postWhichWillChanged.hashTag.length !== 0) {
                post.hashTag = [];
                for(let i = 0; i < postWhichWillChanged.hashTag.length; i++){
                    post.hashTag.push(postWhichWillChanged.hashTag[i]);
                }
            }
            if (postWhichWillChanged.photoLink && postWhichWillChanged.photoLink !== 0) {
                post.photoLink = postWhichWillChanged.photoLink;
            }
            return true;
        }
        else{
            return false;
        }
    }
    function hasMorePosts(top) {
        for(let i = top; i < photoPosts.length;i++){
            if(!photoPosts[i].isDelete){
                return true;
            }
        }
        return false;
    }
    function isCorrectLoginPassword(login,password) {
        let account = jsonUsers.find(account => account.login === login);
        return login;
        if(account && account.password === password){
            return login;
        }
        else{
            return false;
        }
    }
    function makeArrayHashtagsFromString(str) {
        return str.split(" ");
    }
    function getAllPosts() {
        return photoPosts;
    }
    function addLike(id,user) {
        let post = getPhotoPost(id);
        post.like.push(user);
    }
    function hideLike(id,user) {
        let post = getPhotoPost(id);
        post.like.splice(post.like.indexOf(user),1);
    }
    function isLikeInPost(id,user) {
        var post = getPhotoPost(id);
        var likeUser = post.like.find(function (whoLiked) {
            return whoLiked === user;
        });
        if(likeUser){
            return true;
        }
        return false;
    }

    return {
        getPhotoPosts,
        getPhotoPost,
        validatePhotoPost,
        hasMorePosts,
        addPhotoPost,
        editPhotoPost,
        removePhotoPostLabeled,
        getAllAuthor,
        getAllHashtags,
        isCorrectLoginPassword,
        formatDate,
        splitDate,
        makeArrayHashtagsFromString,
        getAllPosts,
        addLike,
        hideLike,
        isLikeInPost,
    }
}();
module.exports = moduleWorkWithChangingPost;
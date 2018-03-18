"use strict";
 var moduleWorkWithChangingPost = function () {

    var photoPosts =  [
         {
             id: '1',
             description: 'Навальный 20!82',
             createdAt: new Date('2018-09-23T23:00:00'),
             author: 'Иванов Иван',
             photoLink: 'http://www.vladtime.ru/uploads/posts/2018-01/1515326200_navalnyi-o-alishere-usmanove-mitingah-i-kirille-serebrennikove.jpg',
             hashTag: ["#20!8"],
             like: ["Dima", "IVAN"],
             isDelete: false
         },
         {
             id: '2',
             description: 'I like to use instagram',
             createdAt: new Date('2018-10-23T17:00:00'),
             author: 'Васильев Василий',
             photoLink: 'https://9to5mac.files.wordpress.com/2017/08/instagram.jpg?quality=82&strip=all&w=1500',
             hashTag: ["#InstagramRulit", "#instagram"],
             like: ["Dima", "IVAN"],
             isDelete: false
         },
         {
             id: '3',
             description: 'Домрачева выиграла золото!!!',
             createdAt: new Date('2018-04-23T15:00:00'),
             author: 'Дмитриев Дмитрий',
             photoLink: 'http://www.vladtime.ru/uploads/posts/2018-01/1515326200_navalnyi-o-alishere-usmanove-mitingah-i-kirille-serebrennikove.jpg',
             hashTag: ["#Domracheva", "#Gold"],
             like: ["Dima", "IVAN"],
             isDelete: false
         },
         {
             id: '4',
             description: 'Алексеев попал на Евровидение',
             createdAt: new Date('2018-05-23T12:00:00'),
             author: 'Алексеев Алексей',
             photoLink: 'https://www.eurovoix.com/wp-content/uploads/2017/12/alekseev.jpg',
             hashTag: ["#Alekseev"],
             like: ["Dima", "IVAN"],
             isDelete: false
         },
         /*{
             id: '5',
             description: 'Yeaaahh',
             createdAt: new Date('2018-06-23T10:00:00'),
             author: 'Александров Александр',
             photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
             hashTag: ["#hashtag"],
             like: ["Dima", "IVAN"],
             isDelete: false
         },
         {
             id: '6',
             description: '++++!!!',
             createdAt: new Date('2018-06-23T12:00:00'),
             author: 'Иванов Иван',
             photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
             hashTag: ["#hashtag"],
             like: ["Dima", "IVAN"],
             isDelete: false
         },
         {
             id: '7',
             description: '+++++++++++++----------------------',
             createdAt: new Date('2018-06-23T17:00:00'),
             author: 'Васильев Василий',
             photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
             hashTag: ["#hashtag"],
             like: ["Dima", "IVAN"],
             isDelete: false
         },*/
         /*{
             id: '8',
             description: 'BelarusChina',
             createdAt: new Date('2018-12-23T15:00:00'),
             author: 'Дмитриев Дмитрий',
             photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
             hashTag: ["#hashtag"],
             like: ["Dima", "IVAN"],
             isDelete: false
         },
         {
             id: '10',
             description: 'Алексеев попал в колонию',
             createdAt: new Date('2018-08-01T12:00:00'),
             author: 'Алексеев Алексей',
             photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
             hashTag: ["#hashtag"],
             like: ["Dima", "IVAN"],
             isDelete: false
         },
         {
             id: '9',
             description: 'У меня ДР',
             createdAt: new Date('2018-08-12T10:00:00'),
             author: 'Колтун Дмитрий',
             photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
             hashTag: ["#hashtag"],
             like: ["Dima", "IVAN"],
             isDelete: false
         },
         {
             id: '11',
             description: 'Женская',
             createdAt: new Date('2018-09-02T23:00:00'),
             author: 'Иванов Иван',
             photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
             hashTag: ["#hashtag"],
             like: ["Dima", "IVAN"],
             isDelete: false
         }*/
     ];

     function compareDate(a, b) {
         return b.createdAt - a.createdAt;
     }

     function unique(arr) {
         var obj = {};
         for(let i = 0; i < arr.length;i++){
             var str = arr[i];
             obj[str] = true;
         }
         return Object.keys(obj);
     }
     function getAllAuthor(){
        var name = [];
        photoPosts.forEach(function(item) {

            if (!item.isDelete) {
                name.push(item.author);
            }
        });
        return unique(name);
 }
     function getAllHashtags() {
         var hashtags = [];
         photoPosts.forEach(function (itemPost) {
            if(!itemPost.isDelete) {
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
         var min = top;
         if(min > photoPosts.length){
             min = photoPosts.length;
         }
         var postsNotDeleted = photoPosts.filter(function (post) {
             if(!post.isDelete){
                 return true;
             }
         });
         if (!filterConfig) {
             return postsNotDeleted.sort(compareDate).slice(skip,min);
         }
         else {
             var result = postsNotDeleted;
             if (filterConfig.author) {
                 result = result.filter(function (post) {
                     return post.author === filterConfig.author;
                 })
             }
             if (filterConfig.createdAt) {
                 result = result.filter(function (post) {
                     return post.createdAt === filterConfig.createdAt;
                 })
             }
             if (filterConfig.hashTag) {
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

     function validatePhotoPost(post,isForAddPost) {
         var isValidate = true;
         if (typeof post.id !== "string" || typeof post.description !== "string"
             || typeof post.author !== "string" || typeof post.photoLink !== "string"
             || !(post.createdAt instanceof Date) || !(post.hashTag instanceof Array)) {
             return false
         }
         photoPosts.forEach(function (item) {
             if (item.id === post.id) {
                 return false;
             }
         });
         if (post.description.length === 0 || post.description.length >= 200) {
             return false;
         }
         if(post.photoLink.length === 0){
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
             return true;
         }
         return false;
     }


     function removePhotoPostLabeled(id) {
         let post = photoPosts.find(post => post.id === id);
         if(post){
             post.isDelete = true;
         }
     }

     function editPhotoPost(id, object) {
         let post = photoPosts.find(post => post.id === id);
         if(post && post.isDelete === false){
             if(object.description && object.description){
                 post.description = object.description;
             }
             if(object.hashTag && object.hashTag.length!==0){
                 post.hashTag = [];
                 post.hashTag.concat(object.hashTag);
             }
             if(object.photoLink && object.photoLink!==0) {
                 post.photoLink = object.photoLink;
             }
         }
     }
     removePhotoPostLabeled("3");
     console.log(getPhotoPosts(0,5));
     return {
         getPhotoPosts,
         getPhotoPost,
         validatePhotoPost,
         addPhotoPost,
         editPhotoPost,
         removePhotoPostLabeled,
         getAllAuthor,
         getAllHashtags
     }
 }();

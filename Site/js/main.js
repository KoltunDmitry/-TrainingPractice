"use strict";
(function () {

    var photoPosts = [
        {
            id: '1',
            description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
            createdAt: new Date('2018-02-23T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashTag: ["#hashtag1", "#hashtag2"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '2',
            description: '----------------------',
            createdAt: new Date('2018-03-23T17:00:00'),
            author: 'Васильев Василий',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashTag: ["#hashtag"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '3',
            description: 'China',
            createdAt: new Date('2018-04-23T15:00:00'),
            author: 'Дмитриев Дмитрий',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashTag: ["#hashtag"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '4',
            description: 'Алексеев попал на Евровидение',
            createdAt: new Date('2018-05-23T12:00:00'),
            author: 'Алексеев Алексей',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashTag: ["#hashtag"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
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
        },
        {
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
        }
    ];

    function compareDate(a, b) {
        return a.createdAt - b.createdAt;
    }

    function print(a, b) {
        for (var i = a; i < b; i++) {
            if (photoPosts[i]) {
                console.log(photoPosts[i].id + " " + photoPosts[i].description + " " + photoPosts[i].createdAt + " " +
                    photoPosts[i].author + " " + photoPosts[i].photoLink + " " + photoPosts[i].hashTag + " " + photoPosts[i].like + "\n")
            }
        }
    }

    function getPhotoPosts(skip, top, filterConfig) {
        skip = skip || 0;
        top = top || 0;
        var newArr = [];
        if (!filterConfig) {
            return photoPosts.slice(skip, skip + top).length
        }
        else {
            var result = photoPosts;
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
                        for (let jtem of [].concat(filterConfig.hashTag)) {
                            if (hashTag === jtem) {
                                return true;
                            }
                        }
                    }
                });
            }
            return result.sort(compareDate).slice(skip, top);
        }
    }

    function getPhotoPost(id) {
        var found = photoPosts.find(function (element) {
            return element.id === id;
        })
        return found;
    }

    function validatePhotoPost(post) {
        var isValidate = true;
        if (typeof post.id !== "string" || typeof post.description !== "string"
            || typeof post.author !== "string" || typeof post.photoLink !== "string"
            || !(post.createdAt instanceof Date) || !(post.hashTag instanceof Array)) {
            return false
        }
        for (var i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id === post.id) {
                return false;
            }
        }
        if (post.description.length === 0 || post.description.length >= 200) {
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
            console.log(post)
            if (!post.isDelete) {
                post.isDelete = false;
            }
            photoPosts[photoPosts.length] = post;
            return true
        }
        return false
    }

    function removePhotoPost(id) {
        var found = photoPosts.findIndex(i => i.id === id);
        photoPosts.splice(found, 1)
    }

    function removePhotoPostLabeled(id) {
        var found = photoPosts.findIndex(i => i.id === id);
        photoPosts[found].isDelete = true;
    }

    function editPhotoPost(id, object) {
        for (var i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id === id) {
                var temp = Object.assign({}, photoPosts[i]);
                if (object.photoLink) {
                    if (object.photoLink.length !== 0) {
                        temp.photoLink = object.photoLink
                    }
                    else {
                        return false;
                    }
                }
                if (object.description) {
                    if (object.description.length === 0 || object.description.length >= 200) {
                        return false;
                    }
                    else {
                        temp.description = object.description
                    }
                }
                if (object.hashTag) {
                    if (object.hashTag.length > 0 || object.hashTag instanceof Array) {
                        temp.hashTag = object.hashTag
                    }
                    else {
                        return false;
                    }
                }
                photoPosts[i] = temp
                return true;
            }
        }
    }
    /*var post =[{
        id : '15',
        description: 'Женская',
        createdAt: new Date("1/1/2018"),
        author: 'Dima',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        hashTag: ["#hashtag"]
    },{
        id : '16',
        description: 'asfasf',
        createdAt: new Date("1/1/2018"),
        author: 'Dima',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        hashTag: "#fdsf",
        isDelete:false
    }]*/
    return {
        getPhotoPost: getPhotoPost,
        getPhotoPosts:getPhotoPosts,
        validatePhotoPost:validatePhotoPost,
        addPhotoPost:addPhotoPost,
        editPhotoPost:editPhotoPost,
        removePhotoPostLabeled:removePhotoPostLabeled,
    }
})();

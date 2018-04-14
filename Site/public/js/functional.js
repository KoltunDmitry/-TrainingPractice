"use strict";
var moduleWorkWithChangingPost = function () {
    var accountBase = [
        {
            login: 'Иванов Иван',
            password: '12345',
        },
        {
            login: 'Васильев Василий',
            password : 'qwerty'
        }
        ];
    var photoPosts = JSON.parse(localStorage.getItem('Posts'));

        /*[{
            id: '1',
            description: '1',
            createdAt: new Date('2018-09-23T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'http://www.vladtime.ru/uploads/posts/2018-01/1515326200_navalnyi-o-alishere-usmanove-mitingah-i-kirille-serebrennikove.jpg',
            hashTag: ["#20!8"],
            like: ["Иванов Иван"],
            isDelete: false,
        }
        ];*/
        /*{
            id: '2',
            description: '2',
            createdAt: new Date('2018-10-23T17:00:00'),
            author: 'Васильев Василий',
            photoLink: 'https://9to5mac.files.wordpress.com/2017/08/instagram.jpg?quality=82&strip=all&w=1500',
            hashTag: ["#InstagramRulit", "#instagram"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '3',
            description: '3',
            createdAt: new Date('2018-04-23T15:00:00'),
            author: 'Дмитриев Дмитрий',
            photoLink: 'http://www.vladtime.ru/uploads/posts/2018-01/1515326200_navalnyi-o-alishere-usmanove-mitingah-i-kirille-serebrennikove.jpg',
            hashTag: ["#Domracheva", "#Gold"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '4',
            description: '4',
            createdAt: new Date('2018-05-23T12:00:00'),
            author: 'Алексеев Алексей',
            photoLink: 'https://www.eurovoix.com/wp-content/uploads/2017/12/alekseev.jpg',
            hashTag: ["#Alekseev"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '5',
            description: '5',
            createdAt: new Date('2018-06-23T10:00:00'),
            author: 'Александров Александр',
            photoLink: 'http://4.bp.blogspot.com/-MRSZXagH_74/U0MVAnBtyvI/AAAAAAAAC38/_LQhkKc0TD4/s1600/1.jpg',
            hashTag: ["#hashtag"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '6',
            description: '6',
            createdAt: new Date('2018-06-23T12:00:00'),
            author: 'Иванов Иван',
            photoLink: 'http://www.cas.fpmi.bsu.by/logoFPMI/BSU_85.jpg',
            hashTag: ["#hashtag"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '7',
            description: '7',
            createdAt: new Date('2018-06-23T17:00:00'),
            author: 'Васильев Василий',
            photoLink: 'https://avatars.mds.yandex.net/get-pdb/471286/60af1563-1023-4b24-a093-70b65eaf17ae/s1200',
            hashTag: ["#hashtag"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '8',
            description: '8',
            createdAt: new Date('2018-12-23T15:00:00'),
            author: 'Иванов Иван',
            photoLink: 'https://animalreader.ru/wp-content/uploads/2014/09/gandex.ru-19837_5933_732161030-e1410332996490.jpg',
            hashTag: ["#hashtag"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '9',
            description: '9',
            createdAt: new Date('2018-08-01T12:00:00'),
            author: 'Алексеев Алексей',
            photoLink: 'https://images.aif.ru/011/116/1ef9ab508247f9f72b9dd443653e5229.jpg',
            hashTag: ["#hashtag"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '10',
            description: '10',
            createdAt: new Date('2018-08-12T10:00:00'),
            author: 'Колтун Дмитрий',
            photoLink: 'http://www.tepid.ru/animals-2/images/masai-lion-2.jpg',
            hashTag: ["#hashtag"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '11',
            description: '11',
            createdAt: new Date('2018-09-02T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'https://cdn2.img.sputnik.by/images/102731/80/1027318023.jpg',
            hashTag: ["#hashtag"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '12',
            description: '12',
            createdAt: new Date('2018-09-02T23:00:00'),
            author: 'Васильев Василий',
            photoLink: 'https://cdn2.img.sputnik.by/images/102731/80/1027318023.jpg',
            hashTag: ["#hashtagsss"],
            like: [""],
            isDelete: false
        },
        {
            id: '24',
            description: '1',
            createdAt: new Date('2018-09-23T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'http://www.vladtime.ru/uploads/posts/2018-01/1515326200_navalnyi-o-alishere-usmanove-mitingah-i-kirille-serebrennikove.jpg',
            hashTag: ["#20!8"],
            like: ["Иванов Иван"],
            isDelete: false,
        },
        {
            id: '23',
            description: '2',
            createdAt: new Date('2018-10-23T17:00:00'),
            author: 'Васильев Василий',
            photoLink: 'https://9to5mac.files.wordpress.com/2017/08/instagram.jpg?quality=82&strip=all&w=1500',
            hashTag: ["#InstagramRulit", "#instagram"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '22',
            description: '3',
            createdAt: new Date('2018-04-23T15:00:00'),
            author: 'Дмитриев Дмитрий',
            photoLink: 'http://www.vladtime.ru/uploads/posts/2018-01/1515326200_navalnyi-o-alishere-usmanove-mitingah-i-kirille-serebrennikove.jpg',
            hashTag: ["#Domracheva", "#Gold"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '21',
            description: '4',
            createdAt: new Date('2018-05-23T12:00:00'),
            author: 'Алексеев Алексей',
            photoLink: 'https://www.eurovoix.com/wp-content/uploads/2017/12/alekseev.jpg',
            hashTag: ["#Alekseev"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '20',
            description: '5',
            createdAt: new Date('2018-06-23T10:00:00'),
            author: 'Александров Александр',
            photoLink: 'http://4.bp.blogspot.com/-MRSZXagH_74/U0MVAnBtyvI/AAAAAAAAC38/_LQhkKc0TD4/s1600/1.jpg',
            hashTag: ["#hashtag"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '19',
            description: '6',
            createdAt: new Date('2018-06-23T12:00:00'),
            author: 'Иванов Иван',
            photoLink: 'http://www.cas.fpmi.bsu.by/logoFPMI/BSU_85.jpg',
            hashTag: ["#hashtag"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '18',
            description: '7',
            createdAt: new Date('2018-06-23T17:00:00'),
            author: 'Васильев Василий',
            photoLink: 'https://avatars.mds.yandex.net/get-pdb/471286/60af1563-1023-4b24-a093-70b65eaf17ae/s1200',
            hashTag: ["#hashtag"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '17',
            description: '8',
            createdAt: new Date('2018-12-23T15:00:00'),
            author: 'Иванов Иван',
            photoLink: 'https://animalreader.ru/wp-content/uploads/2014/09/gandex.ru-19837_5933_732161030-e1410332996490.jpg',
            hashTag: ["#hashtag"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '16',
            description: '9',
            createdAt: new Date('2018-08-01T12:00:00'),
            author: 'Алексеев Алексей',
            photoLink: 'https://images.aif.ru/011/116/1ef9ab508247f9f72b9dd443653e5229.jpg',
            hashTag: ["#hashtag"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '15',
            description: '10',
            createdAt: new Date('2018-08-12T10:00:00'),
            author: 'Колтун Дмитрий',
            photoLink: 'http://www.tepid.ru/animals-2/images/masai-lion-2.jpg',
            hashTag: ["#hashtag"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '14',
            description: '11',
            createdAt: new Date('2018-09-02T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'https://cdn2.img.sputnik.by/images/102731/80/1027318023.jpg',
            hashTag: ["#hashtag"],
            like: ["Dima", "IVAN"],
            isDelete: false
        },
        {
            id: '13',
            description: '13',
            createdAt: new Date('2018-09-02T23:00:00'),
            author: 'Васильев Василий',
            photoLink: 'https://cdn2.img.sputnik.by/images/102731/80/1027318023.jpg',
            hashTag: ["#hashtagsss"],
            like: [""],
            isDelete: false
        }
    ];*/
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
        date[1] = Number(--date[1]);
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
        photoPosts.forEach(function (item) {

            if (!item.isDelete) {
                name.push(item.author);
            }
        });
        return unique(name);
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

    function getPhotoPosts(skip = 0, top, filterConfig) {
        skip = skip || 0;
        top = top || 0;
        var min = top;
        if (min > photoPosts.length) {
            min = photoPosts.length;
        }
        var postsNotDeleted = photoPosts.filter(function (post) {
            if (!post.isDelete) {
                return true;
            }
        });
        if (!filterConfig || (filterConfig.author.length === 0 &&
                filterConfig.createdAt.toString().length === 0 && filterConfig.hashTag.length === 0)) {
            return postsNotDeleted.sort(compareDate).slice(skip, min);
        }
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

    function validatePhotoPost(post, isForAddPost) {
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
            return true;
        }
        return false;
    }


    function removePhotoPostLabeled(id) {
        let post = photoPosts.find(post => post.id === id);
        if (post) {
            post.isDelete = true;
        }
    }

    function editPhotoPost(id, postWhichWillChanged) {
        let post = photoPosts.find(post => post.id === id);
        if (post && post.isDelete === false) {
            if (postWhichWillChanged.description && postWhichWillChanged.description) {
                post.description = postWhichWillChanged.description;
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
        }
    }
    function isMorePosts(top) {
        for(let i = top; i < photoPosts.length;i++){
            if(!photoPosts[i].isDelete){
                return true;
            }
        }
        return false;
    }
    function isCorrectLoginPassord(login,password) {
        let account = accountBase.find(account => account.login === login);
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

    /*var post = {
        description: "dsf",
        photoLink: "link",
        hashTag: ["#dima", "#more"],
    };
    editPhotoPost("8",post);*/
    console.log("Dima");
    return {
        getPhotoPosts,
        getPhotoPost,
        validatePhotoPost,
        isMorePosts,
        addPhotoPost,
        editPhotoPost,
        removePhotoPostLabeled,
        getAllAuthor,
        getAllHashtags,
        isCorrectLoginPassord,
        formatDate,
        splitDate,
        makeArrayHashtagsFromString,
        getAllPosts,
        addLike,
        hideLike,
        isLikeInPost,
    }
}();

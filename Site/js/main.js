(function () {

    var photoPosts = [
        {
            id: '1',
            description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
            createdAt: new Date('2018-02-23T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashTag: "#hashtag1",
            like: ["Dima","IVAN"]
        },
        {
            id: '2',
            description: '----------------------',
            createdAt: new Date('2018-03-23T17:00:00'),
            author: 'Васильев Василий',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashTag: "#hashtag",
            like: ["Dima","IVAN"]
        },
        {
            id: '3',
            description: 'China',
            createdAt: new Date('2018-04-23T15:00:00'),
            author: 'Дмитриев Дмитрий',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashTag: "#hashtag",
            like: ["Dima","IVAN"]
        },
        {
            id: '4',
            description: 'Алексеев попал на Евровидение',
            createdAt: new Date('2018-05-23T12:00:00'),
            author: 'Алексеев Алексей',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashTag: "#hashtag",
            like: ["Dima","IVAN"]
        },
        {
            id: '5',
            description: 'Yeaaahh',
            createdAt: new Date('2018-06-23T10:00:00'),
            author: 'Александров Александр',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashTag: "#hashtag",
            like: ["Dima","IVAN"]
        },
        {
            id: '6',
            description: '++++!!!',
            createdAt: new Date('2018-06-23T12:00:00'),
            author: 'Иванов Иван',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashTag: "#hashtag",
            like: ["Dima","IVAN"]
        },
        {
            id: '7',
            description: '+++++++++++++----------------------',
            createdAt: new Date('2018-06-23T17:00:00'),
            author: 'Васильев Василий',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashTag: "#hashtag",
            like: ["Dima","IVAN"]
        },
        {
            id: '8',
            description: 'BelarusChina',
            createdAt: new Date('2018-12-23T15:00:00'),
            author: 'Дмитриев Дмитрий',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashTag: "#hashtag",
            like: ["Dima","IVAN"]
        },
        {
            id: '10',
            description: 'Алексеев попал в колонию',
            createdAt: new Date('2018-08-01T12:00:00'),
            author: 'Алексеев Алексей',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashTag: "#hashtag",
            like: ["Dima","IVAN"]
        },
        {
            id: '9',
            description: 'У меня ДР',
            createdAt: new Date('2018-08-12T10:00:00'),
            author: 'Колтун Дмитрий',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashTag: "#hashtag",
            like: ["Dima","IVAN"]
        },
        {
            id: '11',
            description: 'Женская',
            createdAt: new Date('2018-09-02T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashTag: "#hashtag",
            like: ["Dima","IVAN"]
        }
    ];

    function compareDate(a,b) {
        return (a.createdAt) - (b.createdAt);
    }
    function print(a,b) {
        for (i = a; i < b; i++) {
            console.log(photoPosts[i].id + " " + photoPosts[i].description + " " + photoPosts[i].createdAt + " " +
                photoPosts[i].author + " " + photoPosts[i].photoLink + " " + photoPosts[i].hashTag + " " + photoPosts[i].like + "\n")
        }
    }
    function getPhotoPosts(skip,top,filterConfig) {
        var newArr = []
        if (filterConfig === undefined) {
            return photoPosts.sort(compareDate).slice(skip, skip + top)
        }
        else {
            j = 0
            for(i = 0; i < photoPosts.length;i++){
                console.log(i + " ")
                if(filterConfig.author !== undefined && filterConfig.createdAt !== undefined && filterConfig.hashTag !== undefined){
                    if(photoPosts[i].author === filterConfig.author && photoPosts[i].hashTag === filterConfig.hashTag
                        && photoPosts[i].createdAt >= filterConfig.createdAt){
                        newArr[j] = photoPosts[i];
                        j++;
                    }
                }
                else if(filterConfig.author !== undefined && filterConfig.createdAt !== undefined && filterConfig.hashTag === undefined){
                    if(photoPosts[i].author === filterConfig.author &&
                        photoPosts[i].createdAt >= filterConfig.createdAt ){
                        newArr[j] = photoPosts[i];
                        j++;
                    }
                }
                else if(filterConfig.author !== undefined && filterConfig.createdAt === undefined && filterConfig.hashTag !== undefined){
                    if(photoPosts[i].author === filterConfig.author && photoPosts[i].hashTag === filterConfig.hashTag){
                        newArr[j] = photoPosts[i];
                        j++;
                    }
                }
                else if(filterConfig.author === undefined && filterConfig.createdAt !== undefined && filterConfig.hashTag !== undefined){
                    if(photoPosts[i].hashTag === filterConfig.hashTag && photoPosts[i].createdAt >= filterConfig.createdAt){
                        newArr[j] = photoPosts[i];
                        j++;
                    }
                }
                else if(filterConfig.author !== undefined){
                    if(photoPosts[i].author === filterConfig.author){
                        newArr[j] = photoPosts[i];
                        j++;
                    }
                }
                else if(filterConfig.createdAt !== undefined){
                    if(photoPosts[i].createdAt >= filterConfig.createdAt){
                        newArr[j] = photoPosts[i];
                        j++;
                    }
                }
                else if(filterConfig.hashTag !== undefined){
                    if(photoPosts[i].hashTag === filterConfig.hashTag){
                        newArr[j] = photoPosts[i];
                        j++;
                    }
                }
            }
            return newArr.sort(compareDate).slice(skip, skip + top)
        }
    }
    function getPhotoPost(id) {
        for(i = 0; i < photoPosts.length; i++){
            if(photoPosts[i].id === id) {
                return photoPosts[i]
            }
        }

    }
    function validatePhotoPost(object)  {
        var isValidate = true;
        if(typeof object.id !== "string" || typeof object.description !== "string"
            || typeof object.author !== "string" || typeof object.photoLink !== "string" || !(object.createdAt instanceof Date)){
            return false
        }
        for(i = 0; i < photoPosts.length; i++){
            if(photoPosts[i].id === object.id){
                return false;
            }
        }
        if(object.description.length === 0 || object.description.length >= 200){
            return false;
        }
        if(object.createdAt === undefined || object.createdAt.toString() === "Invalid Date"){
            return false;
        }
        if(object.author === 0){
            return false;
        }
        return true;
    }
    function addPhotoPost(object){
        if(validatePhotoPost(object)){
            console.log(object)
            photoPosts[photoPosts.length] = object
            return true
        }
        return false
    }
    function removePhotoPost(id) {
        for(i = 0; i < photoPosts.length; i++){
            if(photoPosts[i].id === id){
                if(i === 0){
                    photoPosts.shift()
                }
                else if(i === photoPosts.length-1){
                    photoPosts.pop()
                }
                else{
                    photoPosts.splice(i,1)
                }
                return;
            }
        }
    }
    function editPhotoPost(id, object){
        for(i = 0; i < photoPosts.length; i++){
            if(photoPosts[i].id === id){
                var temp = photoPosts[i]
                if(object.photoLink !== undefined){
                    if(object.photoLink.length !== 0) {
                        temp.photoLink = object.photoLink
                    }
                    else{
                        return false;
                    }
                }
                if(object.description !== undefined) {
                    if (object.description.length === 0 || object.description.length >= 200) {
                        return false;
                    }
                    else {
                        temp.description = object.description
                    }
                }
                if(object.hashTag !== undefined){
                    if(object.hashTag.length > 0) {
                        temp.hashTag = object.hashTag
                    }
                    else{
                        return false;
                    }
                }
                photoPosts[i] = temp
                return true;
            }
        }

    }
    var post =[{
        id : '15',
        description: 'Женская',
        createdAt: new Date("1/1/2018"),
        author: 'Dima',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        hashTag: "#hashtag"
    },{
        id : '16',
        description: '',
        createdAt: new Date("1/1/2018"),
        author: 'Dima',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        hashTag: "#hashtag"

    }
    ]

    console.log(getPhotoPosts(2,5))
    console.log(getPhotoPosts("0","1", {author: "Иванов Иван"}))
    console.log(getPhotoPosts(1,5,{author:"Иванов Иван",hashTag:"#hashtag", createdAt: new Date("01-01-2018")}))
    console.log(getPhotoPost("24"))
    console.log(validatePhotoPost(post[0]))
    console.log(validatePhotoPost(post[1]))
    console.log(addPhotoPost(post[0]))
    console.log(addPhotoPost(post[1]))
    print(0,photoPosts.length)
    console.log(removePhotoPost("15"))
    print(0,photoPosts.length)
    console.log(removePhotoPost("17"))
    editPhotoPost('1', { photoLink: 'http://haradok.info/static/news/5/4565/preview.jpg'})
    editPhotoPost("2", {description: "idi domoi", photoLink: ""})
    print(0,photoPosts.length)
})();

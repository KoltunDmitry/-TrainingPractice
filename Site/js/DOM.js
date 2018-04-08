'use strict';
var user = "Иванов Иван";
var showedPosts = 0;
var DOM = function() {
    function setUser(name) {
        user = name;
        DOM.showPosts(0,10);
    }
    function getUser() {
        return user;
    }
    setNickname();
    function showPhotoPost(photoPost) {
        var post = document.createElement('div');
        post.className = 'post';
        var headPost = document.createElement('div');
        headPost.className = 'headPost';
        if(user && user === photoPost.author) {
            var buttonHead = document.createElement('div');
            buttonHead.className = 'buttonHead';
            var buttonDelete = document.createElement('button');
            buttonDelete.className = 'buttonDelete';
            buttonDelete.setAttribute("value",photoPost.id);
            var buttonEdit = document.createElement('button');
            buttonEdit.className = 'buttonEdit';
            buttonEdit.setAttribute("value",photoPost.id)
            buttonDelete.innerHTML = '<img src = "image/waste.png" alt = "delete" class="deletePost">';
            buttonEdit.innerHTML = '<img src = "image/edit.jpg" alt = "edit" class="editPost">';
            buttonHead.appendChild(buttonDelete);
            buttonHead.appendChild(buttonEdit);
            headPost.appendChild(buttonHead);
        }
        var imgAvatar = document.createElement('img');
        imgAvatar.setAttribute('src','image/profile.png');
        imgAvatar.className = 'roundAvatar';
        headPost.appendChild(imgAvatar);
        var blockNameDate = document.createElement('div');
        blockNameDate.className = 'blockNameDate';
        var nicknamePost = document.createElement('div');
        nicknamePost.className = 'nicknamePost';
        nicknamePost.textContent = photoPost.author;
        blockNameDate.appendChild(nicknamePost);
        var datePhoto = document.createElement('div');
        datePhoto.className = 'datePhoto';
        datePhoto.textContent = moduleWorkWithChangingPost.formatDate(photoPost.createdAt);
        blockNameDate.appendChild(datePhoto);
        headPost.appendChild(blockNameDate);

        //nice
        var text = document.createElement('div');
        text.className = 'text';
        text.textContent = photoPost.description;
        var photoPlace = document.createElement('div');
        photoPlace.className = 'photoPlace';
        var photo = document.createElement('img');
        photo.setAttribute('src',photoPost.photoLink);
        photo.className = 'photo';
        photoPlace.appendChild(photo);
        //nice
        var likeAndHashtags = document.createElement('div');
        likeAndHashtags.className = 'likeAndHashtags';

        var a = document.createElement('a');
        //a.setAttribute('href', '#');
        a.innerHTML = `<img src = "image/whiteheart.png" alt = "like" class= "like" value="${photoPost.id}">`;
        //var imgLike = document.getElementsByClassName("Like");
        //imgLike[0].setAttribute('value', photoPost.id);
        likeAndHashtags.appendChild(a);
        var line = document.createElement('img');
        line.className = 'lineLikeAndHashtags';
        line.src='image/line.png';
        likeAndHashtags.appendChild(line);
        var hashtagInPost = document.createElement('span');
        hashtagInPost.className = 'hashtagInPost';
        var hashTags = '';
        photoPost.hashTag.forEach(function (item) {
            hashTags+= item + ' ';
        });
        hashtagInPost.textContent = hashTags;
        likeAndHashtags.appendChild(hashtagInPost);
        post.appendChild(headPost);
        post.appendChild(text);
        post.appendChild(photoPlace);
        post.appendChild(likeAndHashtags);
        var posts = document.getElementById('posts');
        posts.appendChild(post);
    }


    function addFilterAuthor(){
        var listAuthor = document.getElementById('listAuthor');
        var nameAuthors = moduleWorkWithChangingPost.getAllAuthor();
        var formDatalist = '';
        nameAuthors.forEach(function (item) {
            formDatalist += `<option>${item}</option>`;
        });
        listAuthor.innerHTML = formDatalist;
    }
    function addFilterHashtags(){
        var listHashtags = document.getElementById('suggestions');
        var nameHashtags = moduleWorkWithChangingPost.getAllHashtags();
        var formDatalist = '';
        nameHashtags.forEach(function (item) {
            formDatalist += '<option>' + item + '</option>';
        });
        listHashtags.innerHTML = formDatalist;
    }
    function setNickname() {
            clearNickname();
            document.getElementById('signIn').style.display = 'none';
            document.getElementById('menu').style.display = 'none';
        if (user) {
            document.getElementById('signIn').style.display = 'inline';
            var a = document.createElement("a");
            a.setAttribute('href', '#');
            a.className = "nickname";
            a.textContent = user;
            var containerNickname = document.getElementById("containerNickname");
            containerNickname.appendChild(a);
        }
        else{
            document.getElementById('menu').style.display = 'inline';
        }
        localStorage.setItem("user",user);

    }
    function setFilter(){
        document.getElementById('filtering').style.display = 'block';
    }
    function setButtonDownload() {
        document.getElementById('buttonDownload').style.display = 'block';
    }
    function setErrorPage() {
        clear();
        document.getElementById('error').style.display = 'block';
    }
    function setEditPost(id) {
        clear();
        var post = moduleWorkWithChangingPost.getPhotoPost(id);
        var photoPlace = document.getElementById('placeAddPhoto');

        var imgPhoto = document.createElement('img');
        imgPhoto.className = 'photo';
        imgPhoto.setAttribute('src',post.photoLink);
        photoPlace.appendChild(imgPhoto);
        document.getElementById('addChangePhoto').style.display = 'block';
        var nameFieldsEditPost = document.getElementById('nameFieldsEditPost');
        nameFieldsEditPost.textContent = user;

        var date = document.getElementById('dateFieldsEditPost');
        date.textContent = moduleWorkWithChangingPost.formatDate(post.createdAt);
        var urlPhoto = document.getElementById('urlFieldsEditPost');
        urlPhoto.textContent = post.photoLink;
        var hashtags = document.getElementById('hashtagsFieldsEditPost');
        var hashtagsString = "";
        for(let i = 0; i < post.hashTag.length; i++){
            hashtagsString += post.hashTag[i] + " ";
        }
        hashtags.textContent = hashtagsString;
        var descriptionFieldsEditPost = document.getElementById('descriptionFieldsEditPost');
        descriptionFieldsEditPost.textContent = post.description;
    }
    function createPhotoPost() {
        clear();
        document.getElementById('addChangePhoto').style.display = 'block';
        document.getElementById('nameFieldsEditPost').textContent = DOM.getUser();
    }
    function setIsDelete() {
        var isDelete = document.getElementById("isDelete");
        isDelete.style.display = 'block';
    }
    function hideIsDelete() {
        var isDelete = document.getElementById("isDelete");
        isDelete.style.display = 'none';
    }
    btnDownloadMore();
    function showPosts(skip, top, filterConfig) {
        clear();

        if(skip !== top){
            setFilter();
        }
        var photoPosts = moduleWorkWithChangingPost.getPhotoPosts(skip, top, filterConfig);

        console.log("Begin:" + photoPosts.length);
        for (let i = 0; i < photoPosts.length; i++) {
            if(!photoPosts[i].isDelete) {
                showedPosts++;
                showPhotoPost(photoPosts[i]);
            }
        }
        if(showedPosts%10===0){
            setButtonDownload();
        }
        addEventLike();
        addEventEditPost();
        addEventDeletePost();
        addFilterAuthor();
        addFilterHashtags();
        console.log("End    :" + photoPosts.length);
        saveDataToLocalStorage();
    }

    function addPhotoPost(post) {
        moduleWorkWithChangingPost.addPhotoPost(post);
        showPosts(0,10);
    }

    function removePhotoPostLabeled(id) {
        moduleWorkWithChangingPost.removePhotoPostLabeled(id);
        showPosts(0,10);
    }

    function editPost(id,post) {
        moduleWorkWithChangingPost.editPhotoPost(id, post);
        showPosts(0,10);
    }
    function clear() {
        showedPosts = 0;
        var posts = document.getElementById('posts');
        posts.innerHTML = '';
        document.getElementById('filtering').style.display = 'none';
        document.getElementById('buttonDownload').style.display = 'none';
        document.getElementById('error').style.display = 'none';
        document.getElementById('addChangePhoto').style.display = 'none';
        document.getElementById('placeAddPhoto').innerHTML = '';
    }
    function clearNickname() {
        var containerNickname = document.getElementById('containerNickname');
        containerNickname.textContent = '';
    }
    function clearEditPost() {
        document.getElementById("urlFieldsEditPost").value = '';
        document.getElementById('hashtagsFieldsEditPost').value = '';
        document.getElementById('descriptionFieldsEditPost').value = '';
        document.getElementById("dateFieldsEditPost").value = 'Дата';
    }
       /* setNickname();

        showPosts(0,10);
        removePhotoPostLabeled('1');
        editPost('3',{
            id: '3',
            description: 'China',
            createdAt: new Date('2018-04-23T15:00:00'),
            author: 'Дмитриев Дмитрий',
            photoLink: 'http://www.vladtime.ru/uploads/posts/2018-01/1515326200_navalnyi-o-alishere-usmanove-mitingah-i-kirille-serebrennikove.jpg',
            hashTag: ['#some'],
            like: ['Dima', 'IVAN'],
            isDelete: false
        })*/
       // removePhotoPostLabeled('3');
       // addPhotoPost({
       //     id: '10',
       //     description: 'Домрачева выиграла золото!!!',
       //     createdAt: new Date('2018-04-23T15:00:00'),
       //     author: 'Дмитриев Дмитрий',
       //     photoLink: 'http://www.vladtime.ru/uploads/posts/2018-01/1515326200_navalnyi-o-alishere-usmanove-mitingah-i-kirille-serebrennikove.jpg',
       //     hashTag: ['#Domracheva', '#Gold'],
       //     like: ['Dima', 'IVAN'],
       //     isDelete: false
       // });
    //setErrorPage();
    //showPosts(0,5);
    //setErrorPage();
    //clear();
    if(showedPosts === 0){
        showPosts(0,10);
    }
    return {
        showPhotoPost,
        showPosts,
        editPost,
        removePhotoPostLabeled,
        addPhotoPost,
        clear,
        addFilterHashtags,
        addFilterAuthor,
        setErrorPage,
        setEditPost,
        getUser,
        setUser,
        setNickname,
        setIsDelete,
        hideIsDelete,
        createPhotoPost,
        clearEditPost,
    };
}();

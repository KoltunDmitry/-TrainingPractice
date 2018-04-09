'use strict';
var user = '';
if(localStorage.getItem('user') === 'null'){
    user = null;
}
else {
    user = localStorage.getItem('user');
}
var showedPosts = 0;
var lastFilterConfig;
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
        let post = document.createElement('div');
        post.className = 'post';
        let headPost = document.createElement('div');
        headPost.className = 'headPost';
        if(user && user === photoPost.author) {
            let buttonHead = document.createElement('div');
            buttonHead.className = 'buttonHead';
            let buttonDelete = document.createElement('button');
            buttonDelete.className = 'buttonDelete';
            buttonDelete.setAttribute('value',photoPost.id);
            let buttonEdit = document.createElement('button');
            buttonEdit.className = 'buttonEdit';
            buttonEdit.setAttribute('value',photoPost.id)
            buttonDelete.innerHTML = '<img src = "image/waste.png" alt = "delete" class="deletePost">';
            buttonEdit.innerHTML = '<img src = "image/edit.jpg" alt = "edit" class="editPost">';
            buttonHead.appendChild(buttonDelete);
            buttonHead.appendChild(buttonEdit);
            headPost.appendChild(buttonHead);
        }
        let imgAvatar = document.createElement('img');
        imgAvatar.setAttribute('src','image/profile.png');
        imgAvatar.className = 'roundAvatar';
        headPost.appendChild(imgAvatar);
        let blockNameDate = document.createElement('div');
        blockNameDate.className = 'blockNameDate';
        let nicknamePost = document.createElement('div');
        nicknamePost.className = 'nicknamePost';
        nicknamePost.textContent = photoPost.author;
        blockNameDate.appendChild(nicknamePost);
        let datePhoto = document.createElement('div');
        datePhoto.className = 'datePhoto';
        datePhoto.textContent = moduleWorkWithChangingPost.formatDate(photoPost.createdAt);
        blockNameDate.appendChild(datePhoto);
        headPost.appendChild(blockNameDate);

        //nice
        let text = document.createElement('div');
        text.className = 'text';
        text.textContent = photoPost.description;
        let photoPlace = document.createElement('div');
        photoPlace.className = 'photoPlace';
        let photo = document.createElement('img');
        photo.setAttribute('src',photoPost.photoLink);
        photo.className = 'photo';
        photoPlace.appendChild(photo);
        //nice
        let likeAndHashtags = document.createElement('div');
        likeAndHashtags.className = 'likeAndHashtags';

        let a = document.createElement('a');
        //a.setAttribute('href', '#');
        a.innerHTML = `<img src = 'image/whiteheart.png' alt = 'like' class= 'like' value='${photoPost.id}'>`;
        //var imgLike = document.getElementsByClassName('Like');
        //imgLike[0].setAttribute('value', photoPost.id);
        likeAndHashtags.appendChild(a);
        let line = document.createElement('img');
        line.className = 'lineLikeAndHashtags';
        line.src='image/line.png';
        likeAndHashtags.appendChild(line);
        let hashtagInPost = document.createElement('span');
        hashtagInPost.className = 'hashtagInPost';
        let hashTags = '';
        photoPost.hashTag.forEach(function (item) {
            hashTags+= item + ' ';
        });
        hashtagInPost.textContent = hashTags;
        likeAndHashtags.appendChild(hashtagInPost);
        post.appendChild(headPost);
        post.appendChild(text);
        post.appendChild(photoPlace);
        post.appendChild(likeAndHashtags);
        let posts = document.getElementById('posts');
        posts.appendChild(post);
    }


    function addFilterAuthor(){
        let listAuthor = document.getElementById('listAuthor');
        let nameAuthors = moduleWorkWithChangingPost.getAllAuthor();
        let formDatalist = '';
        nameAuthors.forEach(function (item) {
            formDatalist += `<option>${item}</option>`;
        });
        listAuthor.innerHTML = formDatalist;
    }
    function addFilterHashtags(){
        let listHashtags = document.getElementById('suggestions');
        let nameHashtags = moduleWorkWithChangingPost.getAllHashtags();
        let formDatalist = '';
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
            let a = document.createElement('a');
            a.setAttribute('href', '#');
            a.className = 'nickname';
            a.textContent = user;
            let containerNickname = document.getElementById('containerNickname');
            containerNickname.appendChild(a);
        }
        else{
            document.getElementById('menu').style.display = 'inline';
        }
        localStorage.setItem('user',user);

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
        let post = moduleWorkWithChangingPost.getPhotoPost(id);
        let photoPlace = document.getElementById('placeAddPhoto');

        let imgPhoto = document.createElement('img');
        imgPhoto.className = 'photo';
        imgPhoto.setAttribute('src',post.photoLink);
        photoPlace.appendChild(imgPhoto);
        document.getElementById('addChangePhoto').style.display = 'block';
        document.getElementById('btnEdit').style.display = 'block';
        document.getElementById('btnAdd').style.display = 'none';
        let nameFieldsEditPost = document.getElementById('nameFieldsEditPost');
        nameFieldsEditPost.value = user;

        let date = document.getElementById('dateFieldsEditPost');
        date.value = moduleWorkWithChangingPost.formatDate(post.createdAt);
        let urlPhoto = document.getElementById('urlFieldsEditPost');
        urlPhoto.value = post.photoLink;
        let hashtags = document.getElementById('hashtagsFieldsEditPost');
        let hashtagsString = '';
        for(let i = 0; i < post.hashTag.length; i++){
            hashtagsString += post.hashTag[i] + ' ';
        }
        hashtags.value = hashtagsString;
        let descriptionFieldsEditPost = document.getElementById('descriptionFieldsEditPost');
        descriptionFieldsEditPost.value = post.description;
    }
    function createPhotoPost() {
        clear();
        document.getElementById('btnEdit').style.display = 'none';
        document.getElementById('btnAdd').style.display = 'block';
        document.getElementById('addChangePhoto').style.display = 'block';
        document.getElementById('dateFieldsEditPost').value = 'Дата';
        document.getElementById('nameFieldsEditPost').value = DOM.getUser();
        document.getElementById('urlFieldsEditPost').value = '';
        document.getElementById('hashtagsFieldsEditPost').value = '';
        document.getElementById('descriptionFieldsEditPost').value = '';
    }
    function setIsDelete() {
        let isDelete = document.getElementById('isDelete');
        isDelete.style.display = 'block';
    }
    function hideIsDelete() {
        let isDelete = document.getElementById('isDelete');
        isDelete.style.display = 'none';
    }
    function showPosts(skip, top, filterConfig) {
        clear();
        if(filterConfig === 'lastConfig'){
            filterConfig = lastFilterConfig;
        }
        else if(!filterConfig){
            lastFilterConfig = undefined;
        }
        else if(filterConfig){
            lastFilterConfig = filterConfig;
        }
        if(skip !== top){
            setFilter();
        }
        let photoPosts = moduleWorkWithChangingPost.getPhotoPosts(skip, top, filterConfig);

        console.log('Begin:' + photoPosts.length);
        for (let i = 0; i < photoPosts.length; i++) {
            if(!photoPosts[i].isDelete) {
                showedPosts++;
                showPhotoPost(photoPosts[i]);
            }
        }
        if(showedPosts%10===0 && showedPosts!== 0){
            setButtonDownload();
        }
        addEventLike();
        addEventEditPost();
        addEventDeletePost();
        addFilterAuthor();
        addFilterHashtags();
        console.log('End    :' + photoPosts.length);
        saveDataToLocalStorage();
    }

    function addPhotoPost(post) {
        moduleWorkWithChangingPost.addPhotoPost(post);
        showPosts(0,10);
    }

    function removePhotoPostLabeled(id) {
        moduleWorkWithChangingPost.removePhotoPostLabeled(id);
        showPosts(0,showedPosts,'lastConfig');
    }

    function editPost(id,post) {
        moduleWorkWithChangingPost.editPhotoPost(id, post);
        showPosts(0,10);
    }
    function clear() {
        showedPosts = 0;
        let posts = document.getElementById('posts');
        posts.innerHTML = '';
        document.getElementById('filtering').style.display = 'none';
        document.getElementById('buttonDownload').style.display = 'none';
        document.getElementById('error').style.display = 'none';
        document.getElementById('addChangePhoto').style.display = 'none';
        document.getElementById('placeAddPhoto').innerHTML = '';
    }
    function clearNickname() {
        let containerNickname = document.getElementById('containerNickname');
        containerNickname.textContent = '';
    }
    function clearEditPost() {
        document.getElementById('urlFieldsEditPost').value = '';
        document.getElementById('hashtagsFieldsEditPost').value = '';
        document.getElementById('descriptionFieldsEditPost').value = '';
        document.getElementById('dateFieldsEditPost').value = 'Дата';
    }
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

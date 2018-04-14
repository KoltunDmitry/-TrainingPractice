'use strict';
var DOM = function() {
    var user = '';
    var showedPosts = 0;
    var lastFilterConfig;

    function setUser(name) {
        user = name;
        showPosts(0, 10);
    }

    function getUser() {
        return user;
    }

    function getShowedPosts() {
        return showedPosts;
    }

    function showPhotoPost(photoPost) {
        let post = document.createElement('div');
        post.className = 'post';
        let hashTags = '';
        photoPost.hashTag.forEach(function (item) {
            hashTags += item + ' ';
        });
        let buttons = `<button class="buttonDelete" value= "${photoPost.id}">
                     </button>
                    <button class="buttonEdit" value= "${photoPost.id}">
                    </button>`;
        if(user !== photoPost.author){
            buttons = ``;
        }
        let like = `<a><img src="image/whiteheart.png" alt="like" class="like" value= "${photoPost.id}" isLike = '0'></a>`;
        if(moduleWorkWithChangingPost.isLikeInPost(photoPost.id,user)){
            like = `<a><img src="image/redheart.png" alt="like" class="like" value= "${photoPost.id}" isLike = '1'></a>`;
        }

            post.innerHTML = `
            <div class="headPost">
                <div class="buttonHead">
                    ${buttons}
                </div>
                <img src="image/profile.png" class="roundAvatar">
                <div class="blockNameDate">
                    <div class="nicknamePost">${photoPost.author}</div>
                    <div class="datePhoto">${moduleWorkWithChangingPost.formatDate(photoPost.createdAt)}</div>
                </div>
            </div>
            <div class="text">${photoPost.description}</div>
            <div class="photoPlace">
                <img src="${photoPost.photoLink}" class="photo">
            </div>
            <div class="likeAndHashtags">
               ${like}
                <img class="lineLikeAndHashtags" src="image/line.png">
                <span class="hashtagInPost">${hashTags}</span>
            </div>
        </div>`;
        let posts = document.getElementById('posts');
        posts.appendChild(post);
    }


    function addFilterAuthor() {
        let listAuthor = document.getElementById('listAuthor');
        let nameAuthors = moduleWorkWithChangingPost.getAllAuthor();
        let formDatalist = '';
        nameAuthors.forEach(function (item) {
            formDatalist += `<option>${item}</option>`;
        });
        listAuthor.innerHTML = formDatalist;
    }

    function addFilterHashtags() {
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
        else {
            document.getElementById('menu').style.display = 'inline';
        }
        localStorage.setItem('user',user);
    }

    function setFilter() {
        document.getElementById('filtering').style.display = 'block';
    }

    function setButtonDownload() {
        document.getElementById('buttonDownload').style.display = 'block';
    }

    function setErrorPage() {
        clear();
        document.getElementById('error').style.display = 'block';
    }

    /*function example(auth) {
        //1
        var element = document.createElement('div')
        element.innerHTML = `
            <div class="header">${auth}</div>
            <button />
        `;
        //2

        var container = document.querySelector('.posts');
        var template = document.getElementById('tmp-post');
        var elementCopy = document.importNode(
            template.content,
            true // deep
        ); // we get copy of article that are ready but not in the dom
        elementCopy.querySelector('.author').textContent = auth;
        container.appendChild(elementCopy);
    }*/
    function setEditPost(id) {
        clear();
        let post = moduleWorkWithChangingPost.getPhotoPost(id);
        let photoPlace = document.getElementById('placeAddPhoto');

        let imgPhoto = document.createElement('img');
        imgPhoto.className = 'photo';
        imgPhoto.setAttribute('src', post.photoLink);
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
        for (let i = 0; i < post.hashTag.length; i++) {
            hashtagsString += post.hashTag[i] + ' ';
        }
        hashtags.value = hashtagsString;
        let descriptionFieldsEditPost = document.getElementById('descriptionFieldsEditPost');
        descriptionFieldsEditPost.value = post.description;
    }

    function createPhotoPost() {
        clear();
        document.getElementById('placeAddPhoto').innerHTML = `
            <input type="file" name="avatar" accept="image/*" id = "inputPhoto">  
        `;
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
        if (filterConfig === 'lastConfig') {
            filterConfig = lastFilterConfig;
        }
        else if (!filterConfig) {
            lastFilterConfig = undefined;
        }
        else if (filterConfig) {
            lastFilterConfig = filterConfig;
        }
        if (skip !== top) {
            setFilter();
        }
        let photoPosts = moduleWorkWithChangingPost.getPhotoPosts(skip, top, filterConfig);

        console.log('Begin:' + photoPosts.length);
        for (let i = 0; i < photoPosts.length; i++) {
            if (!photoPosts[i].isDelete) {
                showedPosts++;
                showPhotoPost(photoPosts[i]);
            }
        }
        if (showedPosts % 10 === 0 && showedPosts !== 0) {
            setButtonDownload();
        }
        //addEventLike();
        //addEventEditPost();
        //addEventDeletePost();
        addFilterAuthor();
        addFilterHashtags();
        saveDataToLocalStorage();
        console.log('End    :' + photoPosts.length);

    }

    function addPhotoPost(post) {
        moduleWorkWithChangingPost.addPhotoPost(post);
        showPosts(0, 10);
    }

    function removePhotoPostLabeled(id) {
        moduleWorkWithChangingPost.removePhotoPostLabeled(id);
        showPosts(0, showedPosts, 'lastConfig');
    }

    function editPost(id, post) {
        moduleWorkWithChangingPost.editPhotoPost(id, post);
        showPosts(0, 10);
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
        getShowedPosts
    };
}();

var currentID = localStorage.getItem('currentID');
if(localStorage.getItem('user') === 'null'){
    DOM.setUser(null);
    console.log(localStorage.getItem('user'))
}
else {
    DOM.setUser(localStorage.getItem('user'));
    console.log(localStorage.getItem('user'))
}
DOM.setNickname();
if(DOM.getShowedPosts()===0) {
    DOM.showPosts(0, 10);
}
var user = DOM.getUser();
function setLikeOnPost(id) {
    let post = moduleWorkWithChangingPost.getPhotoPost(id);
    post.like.push(user);
    console.log(post.like);
    saveDataToLocalStorage();
}
function removeLike(id) {
    let post = moduleWorkWithChangingPost.getPhotoPost(id);
    let pos = post.like.indexOf(user);
    post.like.splice(pos, 1);
    console.log(post.like);
    saveDataToLocalStorage();
}
document.body.addEventListener("click", function(event
) {
    console.log(event.target.className);
    let id = event.target.getAttribute('value');
    if (event.target.className === 'buttonEdit') {
        DOM.setEditPost(id);
        btnEditPost(id);
    }
    else if (event.target.className === 'buttonDelete') {
        DOM.setIsDelete();
        let btnYes = document.getElementById('yesDelete');
        btnYes.setAttribute('value', id);
        let btnNo = document.getElementById('noDelete');
        btnNo.addEventListener("click", function () {
            DOM.hideIsDelete();
        });
        btnYes.addEventListener("click", function () {
            DOM.removePhotoPostLabeled(btnYes.getAttribute('value'));
            DOM.hideIsDelete();
        })
    }
    else if(event.target.className === 'like') {
        like(event);
        saveDataToLocalStorage();
    }
});

function like(e) {
    if (e.target.getAttribute("isLike") === '0') {
        e.target.setAttribute("isLike", "1");
        e.target.src = "image/redheart.png";
        setLikeOnPost(e.target.getAttribute('value'));
    }
    else {
        e.target.setAttribute("isLike", "0");
        e.target.src = "image/whiteheart.png";
        removeLike(e.target.getAttribute('value'));
    }
}

var addPhoto = document.getElementById("addPhoto");
addPhoto.addEventListener("click", function () {
    DOM.createPhotoPost();
    document.getElementById('urlFieldsEditPost').value = '';
    btnAddPost();
});
function btnAddPost() {
    let btnAddPost = document.getElementById('btnAdd');
    btnAddPost.addEventListener("click", function () {
        let url = document.getElementById('urlFieldsEditPost').value;
        //let url = document.getElementById("urlFieldsEditPost").value;
        let hashtags = document.getElementById('hashtagsFieldsEditPost').value;
        let description = document.getElementById('descriptionFieldsEditPost').value;
        let post = {
            id: Number(++currentID).toString(),
            description: description,
            createdAt: new Date(),
            author: DOM.getUser(),
            photoLink: url,
            hashTag: moduleWorkWithChangingPost.makeArrayHashtagsFromString(hashtags),
            like: [],
            isDelete: false
        };
        localStorage.setItem('currentID', currentID);
        moduleWorkWithChangingPost.addPhotoPost(post);
        DOM.showPosts(0, 10);
    });
}

var logOut = document.getElementById("logOut");
logOut.addEventListener("click", function () {
    DOM.setUser(null);
    DOM.setNickname();
    DOM.showPosts(0, 10);
});
var sign = document.getElementById("sign");
sign.addEventListener("click",function () {
    var result = moduleWorkWithChangingPost.isCorrectLoginPassord(
        document.getElementById('login').value.toString(),document.getElementById('password').value.toString()
    );
     if(result!== false){
        DOM.setUser(result);
        DOM.setNickname();
    }
});
var filtering = document.getElementById("buttonSearch");
filtering.addEventListener('click',function () {
   var author = document.getElementById('nameInput').value;
   var date = document.getElementById("dateInput").value;
   var hashtag = document.getElementById("hashtagInput").value;
   if(date.length !== 0) {
       var dateArray = moduleWorkWithChangingPost.splitDate(date);
       DOM.showPosts(0, 10, {
           author: author,
           createdAt: new Date(dateArray[2], dateArray[1], dateArray[0]),
           hashTag: hashtag
       });
   }
   else {
       DOM.showPosts(0, 10, {author: author, createdAt: "", hashTag: hashtag});
   }
});
var mainPage = document.getElementById("logo");
mainPage.addEventListener("click", function () {
    DOM.showPosts(0, 10);
});

function btnEditPost(id) {
    let btnEditPost = document.getElementById('btnEdit');
    btnEditPost.addEventListener('click', function () {
        var hashtagsStr = document.getElementById('hashtagsFieldsEditPost').value;
        var post = {
            description: document.getElementById('descriptionFieldsEditPost').value,
            photoLink: document.getElementById('urlFieldsEditPost').value,
            hashTag: moduleWorkWithChangingPost.makeArrayHashtagsFromString(hashtagsStr),
        };
        moduleWorkWithChangingPost.editPhotoPost(id, post);
        DOM.showPosts(0, 10);
    });
}

//TODO: event dispatchering
function btnDownloadMore() {
    let downloadMore = document.getElementById('buttonDownload');
    downloadMore.addEventListener('click',function (e) {
        e.preventDefault();
        DOM.showPosts(0,showedPosts+10,'lastConfig');
    });
}
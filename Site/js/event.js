var currentID = 100;
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
function isLikeInPost(id) {
    var post = moduleWorkWithChangingPost.getPhotoPost(id);
    var likeUser = post.like.find(function (whoLiked) {
        return whoLiked === user;
    });
    if(likeUser){
        return true;
    }
    return false;
}

function addEventLike() {
    let likes = document.getElementsByClassName("like");
    for (let i = 0; i < likes.length; i++) {
        if(user) {
            likes[i].addEventListener("click", like);
            if (isLikeInPost(likes[i].getAttribute('value'))) {
                likes[i].setAttribute('isLike', '1');
                likes[i].src = "image/redheart.png";

            }
            else {
                likes[i].setAttribute('isLike', '0');
                likes[i].src = "image/whiteheart.png";
            }
        }
        else{
            likes[i].setAttribute('isLike', '0');
            likes[i].src = "image/whiteheart.png"
        }
    }
}

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
function addEventEditPost() {
    var edit = document.getElementsByClassName('buttonEdit');
    for (let i = 0; i < edit.length; i++) {
        edit[i].addEventListener("click", function () {
            let id = edit[i].getAttribute('value');
            DOM.setEditPost(id);
            btnEditPost(id);

        })
    }
}
var addPhoto = document.getElementById("addPhoto");
addPhoto.addEventListener("click", function () {
    DOM.createPhotoPost();
    btnAddPost();
});
function addEventDeletePost() {
    let deletePost = document.getElementsByClassName("buttonDelete");
    for (let i = 0; i < deletePost.length; i++) {
        deletePost[i].addEventListener('click', function () {
            DOM.setIsDelete();
            let btnYes = document.getElementById('yesDelete');
            btnYes.setAttribute('value', deletePost[i].getAttribute('value'));
            let btnNo = document.getElementById('noDelete');
            btnNo.addEventListener("click", function () {
                DOM.hideIsDelete();
            });
            btnYes.addEventListener("click", function () {
                DOM.removePhotoPostLabeled(btnYes.getAttribute('value'));
                DOM.hideIsDelete();
            })
        });
    }
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
function btnAddPost() {
    let btnAddPost = document.getElementById('btnEdit');
    btnAddPost.addEventListener("click", function () {
        var date = document.getElementById("dateFieldsEditPost").value;
        var url = document.getElementById("urlFieldsEditPost").value;
        var hashtags = document.getElementById('hashtagsFieldsEditPost').value;
        var description = document.getElementById('descriptionFieldsEditPost').value;
        var post = {
            id: Number(currentID++).toString(),
            description: description,
            createdAt: new Date(),
            author: DOM.getUser(),
            photoLink: url,
            hashTag: moduleWorkWithChangingPost.makeArrayHashtagsFromString(hashtags),
            like: [],
            isDelete: false
        };
        moduleWorkWithChangingPost.addPhotoPost(post);
        DOM.showPosts(0, 10);
        DOM.clearEditPost();
    });
}
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
        DOM.clearEditPost();

    });
}
function btnDownloadMore() {
    let downloadMore = document.getElementById('buttonDownload');
    downloadMore.addEventListener('click',function (e) {
        e.preventDefault();
        DOM.showPosts(0,showedPosts+10);
    });
}
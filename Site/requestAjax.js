var xhr = new XMLHttpRequest();

xhr.open('GET', '../server/data/posts.json',true);
xhr.setRequestHeader('Content-type', 'application/json');
xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) {
        return;
    }
    if (xhr.status !== 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
        return;
    }
    var posts = (JSON.parse(xhr.responseText)).slice();
};


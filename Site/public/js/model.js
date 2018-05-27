(function () {
    class PhotoPostsCollection {
        constructor() {
            this.list = [];
        }

        getPhotoPosts(skip, top, filterConfig) {
            skip = skip || 0;
            top = top || 0;
            if (!this.list) {
                return null;
            }
            let min = top;
            if (min > this.list.length) {
                min = this.list.length;
            }
            var postsNotDeleted = this.list.filter(function (post) {
                if (!post.isDelete) {
                    return true;
                }
            });
            if (!filterConfig || (filterConfig.author.length === 0 &&
                    filterConfig.createdAt.toString().length === 0 && filterConfig.hashTag.length === 0)) {
                return postsNotDeleted.sort(compareDate).slice(skip, min);
            }
            else {
                let result = postsNotDeleted;
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

        getPhotoPost(id) {
            let found = list.find(function (element) {
                return element.id === id;
            });
            return found;
        }

        addPhotoPost(post) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/add');
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    } else {
                        reject(new Error(xhr.statusText));
                    }

                };
                xhr.send(JSON.stringify(post));
            }).then(data => JSON.parse(data))
                .catch((error) => {
                    throw error;
                });
        }


        removePhotoPostLabeled(id) {
            return new Promise((resolve,reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('DELETE', `/remove?id=${id}`);
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    }
                    else{
                        reject(new Error(xhr.statusText));
                    }
                };
                xhr.send();
            }).then(data => JSON.parse(data))
                .catch((error) => {
                    throw error;
                });
        }

        editPhotoPost(id, postWhichWillChanged) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('PUT', `/edit?id=${id}`);
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    } else {
                        reject(new Error(xhr.statusText));
                    }
                };
                xhr.send(JSON.stringify(postWhichWillChanged));
            }).then(data => JSON.parse(data))
                .catch((error) => {
                    throw error;
                });
        }
        loadPhotoPosts() {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', '/getallposts');
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        this.list = JSON.parse(xhr.responseText);
                        resolve(xhr.responseText);
                    } else {
                        reject(new Error(xhr.statusText));
                    }
                };
                xhr.send();
            }).then(data => JSON.parse(data))
                .catch((error) => {
                    throw error;
                });
        }

    }
    class Users{
        constructor(){
            this.list = [];
        }
        findUsers(login){
            let found = list.find(function (element) {
                return element.login === login;
            });
            return found;
        }
        loadUsers() {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'allUsers');
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        this.users = JSON.parse(xhr.responseText);
                        resolve(xhr.responseText);
                    } else {
                        reject(new Error(xhr.statusText));
                    }
                };
                xhr.send();
            }).then(data => JSON.parse(data))
                .catch((error) => {
                    throw error;
                });
        }
    }
    function compareDate(a, b) {
        if (!(a instanceof Date)) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
        else {
            return b.createdAt - a.createdAt;
        }
    }
    window.Users = Users;
    window.PhotoPostsCollection = PhotoPostsCollection;

});

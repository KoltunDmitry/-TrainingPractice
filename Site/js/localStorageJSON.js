function saveDataToLocalStorage() {
    localStorage.setItem("Posts", JSON.stringify(moduleWorkWithChangingPost.getAllPosts()));
}
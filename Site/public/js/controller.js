(function () {

    const model = new PhotoPostsCollection();

    const users = new Users();
    
    function bindEvents() {
        load();

    }
    async function load() {
        await users.loadUsers();
        await model.loadPhotoPosts();
    }
});
var pageCounter = 1;
var animalContainer = document.getElementById('animal-info');

var btn = document.getElementById('btn');

btn.addEventListener('click', function () {
    var request = new XMLHttpRequest();
    request.open('GET','https://learnwebcode.github.io/json-example/animals-'+ pageCounter + '.json');
    request.onload = function () {
        var data = JSON.parse(request.responseText);
        renderHTML(data);
    };
    request.send();
    pageCounter++;
    if(pageCounter > 3)
    {
        btn.classList.add("hide-me");
    }
});

function renderHTML(data) {
    var htmlString = '';

    for (i = 0; i < data.length; i++)
    {
        htmlString += "<p>" +data[i].name + ' is a ' + data[i].species + "<p>";
    }


    animalContainer.insertAdjacentHTML('beforeend', htmlString);
}
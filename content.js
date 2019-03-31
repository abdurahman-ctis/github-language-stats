async function getLanguages() {
    username = window.location.pathname;
    username = username.slice(1, username.length - 1);
    var sum = 0;
    var languages = {};

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await response.json();
        for (i in data) {
            obj = data[i]
            let lang = fetch(obj['languages_url']).then(response => response.json())
                .then(data => {
                    for (i in data) {
                        languages[i] = (languages[i] || 0) + data[i];
                        console.log(i + " : " + data[i]);
                        sum += data[i];
                    }
                })
        }
    }
    catch {error => console.error(error)}

}

var newNode = document.createElement('div');
newNode.innerText = "HIIIII";
var header = document.getElementsByClassName("UnderlineNav user-profile-nav js-sticky top-0")[0];
header.parentNode.insertBefore(newNode, header);
getLanguages();
console.log("finishoo")
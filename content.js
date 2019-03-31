async function parse(data) {
    var sum = 0;
    var languages = {};

    const promises = data.map(async (project) => {
        const res = await fetch(project['languages_url']);
        const another = await res.json();
        for (j in another) {
            languages[j] = (languages[j] || 0) + another[j];
            sum += another[j];
        }
    })

    await Promise.all(promises);
    return {sum, languages};
}

async function getLanguages() {
    username = window.location.pathname;
    username = username.slice(1, username.length - 1);
    var languages = {};
    var sum = 0;
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await response.json();

        res = await parse(data);
        console.log(res)
        for(i in res.languages) {
            languages[i] = 100*res.languages[i]/res.sum;
        }
        
    }
    catch { error => console.error(error) }
    return languages
}

lng = getLanguages().then(res => console.log(res));
var newNode = document.createElement('div');
newNode.innerText = "HIIIII";
var header = document.getElementsByClassName("UnderlineNav user-profile-nav js-sticky top-0")[0];
header.parentNode.insertBefore(newNode, header);
import COLORS from "./colors"
import TOKEN from "./token"

username = window.location.pathname;
if (username[username.length - 1] === '/') {
    username = username.slice(1, username.length - 1);
} else {
    username = username.slice(1, username.length);
}
async function parse(data) {
    var sum = 0;
    var languages = {};

    const promises = data.map(async (project) => {
        const res = await fetch(project['languages_url']+TOKEN);
        const another = await res.json();
        for (j in another) {
            languages[j] = (languages[j] || 0) + another[j];
            sum += another[j];
        }
    })

    await Promise.all(promises);
    return { sum, languages };
}
async function getLanguages() {
    var languages = {};
    var sum = 0;
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos${TOKEN}`);
        const data = await response.json();

        res = await parse(data);
        for (i in res.languages) {
            languages[i] = 100 * res.languages[i] / res.sum;
        }

    }
    catch { error => console.error(error) }
    return languages
}

lng = getLanguages().then(res => {
    var newNode = document.createElement('canvas');
    newNode.id = "chart"
    $(function () {
        var languages = Object.keys(res);
        console.log(languages)
        var colors = [];
        for (i in languages) {
            colors.push(COLORS[languages[i]]);
        }
        //get the doughnut chart canvas
        var ctx = $("#chart");
        //doughnut chart data
        var data = {
            labels: languages,
            datasets: [
                {
                    label: "TeamA Score",
                    data: Object.values(res),
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: Array.apply(null, Array(languages.length)).map(function (x, i) { return 1; })
                }
            ]
        };


        //options
        var options = {
            responsive: true,
            title: {
                display: true,
                position: "top",
                text: "Language stats of " + username,
                fontSize: 18,
                fontColor: "#666"
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#666",
                    fontSize: 12
                }
            }
        };

        //create Chart class object
        var chart = new Chart(ctx, {
            type: "doughnut",
            data: data,
            options: options
        });

    });
    var header = document.getElementsByClassName("UnderlineNav user-profile-nav js-sticky top-0")[0];
    header.parentNode.insertBefore(newNode, header);
});

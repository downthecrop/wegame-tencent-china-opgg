const _champ = "../res/champions/"
const _rank = "../res/division/"

function timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

function secondsToDhms(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);

    const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + " ago"
}

function loading(bool) {
    if (bool) {
        document.getElementById("loader").style.display = "inline-block"
    }
    else {
        document.getElementById("loader").style.display = "none"
    }
}

function create_multi_profile(jdata) {
    loading(false)
    //begin create users
    const temp = document.getElementsByTagName("template")[0];
    const view = document.getElementsByClassName("multi2__list")[0];
    const startElement = temp.content.querySelector("li");

    var posArray = [0, 0, 0, 0, 0]
    const a = document.importNode(startElement, true);

    //shorthand
    const player = jdata
    const battle_list = jdata.player_battle_brief_list
    f = function (arguments) { return a.getElementsByClassName(arguments)[0]; }

    //populate user data from JSON
    f("summoner-name").getElementsByTagName("a")[0].innerText = player.role_name
    f("name").setAttribute("slol_id", player.slol_id)
    f("tier__icon").src = _rank + player.tier + "_" + player.rank + ".png"
    f("lp").innerText = player.league_point + "LP"
    f("winratio").innerText = player.win_rate + "%"

    if (player.continue_lose > 0) {
        f("win-streak").innerText = player.continue_lose + " game lose streak"
        f("win-streak").style.backgroundColor = "red";
    } else if (player.continue_win > 0) {
        f("win-streak").innerText = player.continue_win + " game win streak"
    } else {
        f("win-streak").innerText = ""
    }

    //battle_list[0] for most recent game.
    if ("player_battle_brief_list" in player) {
        if (battle_list[0].battle_time) {
            const deltaT = Date.now() / 1000 - battle_list[0].battle_time
            const lastPlayed = (secondsToDhms(deltaT))
            f("_timeago").innerText = lastPlayed
        } else {
            f("_timeago").innerText = "No recent games on record"
        }
        //begin create user match history
        for (z = 0; z < Object.keys(battle_list).length; z++) {
            const recentview = a.getElementsByClassName("recent-games")[0]
            const recentList = document.getElementsByTagName("template")[1].content.querySelector("li");
            const b = document.importNode(recentList, true);
            const b_list = battle_list[z]

            posArray[battle_list[z].position] += 1

            f = function (arguments) { return b.getElementsByClassName(arguments)[0]; }

            f("champion __sprite __spc20 __spc20-123 tip tpd-delegation-uid-1").src = _champ + b_list.champion_id + ".png"
            if (b_list.game_result === 2) {
                f("is-win is-win--true").setAttribute("class", "is-win is-win--false")
            }
            f("kill").innerText = b_list.kill_num
            f("death").innerText = b_list.death_num
            f("assist").innerText = b_list.assist_num
            f("_timeago").setAttribute("data-datetime", b_list.battle_time);
            f("_timeago").innerText = timeConverter(b_list.battle_time);
            f("_timeago").title = timeConverter(b_list.battle_time);
            $('[data-toggle="tooltip"]').tooltip();
            recentview.appendChild(b);
        }
    }
    view.appendChild(a)
    document.querySelectorAll('.name').forEach(item => {
        item.addEventListener('click', event => {
            let slol_id = event.path[0].getAttribute("slol_id")
            console.log(event)
            requestMatchHistory_slol(slol_id);
        })
    })
}

function requestMatchHistory_slol(slol_id) {
    let request = {
        "type": "profile-basic-slol-id",
        "slol_id": slol_id,
        "area_id": area_id
    }
    sendMessage(JSON.stringify(request))
}

document.getElementById("submit-name").addEventListener('click', function () {
    let names = document.getElementById("name-input").value
    let usernames = names.replaceAll("加入了队伍聊天", "").split(/\r?\n/)
    console.log(usernames)
    for (k in usernames) {
        if (usernames[k] != "") {
            let request = {
                "type": "profile-multi",
                "name": usernames[k],
                "area_id": area_id
            }
            sendMessage(JSON.stringify(request))
        }
    }
})

if (localStorage.getItem("area_id")) {
    area_id = parseInt(localStorage.getItem("area_id"))
    for (let i = 0; i < document.getElementById("areas").getElementsByTagName("option").length; i += 1) {
        if (parseInt(document.getElementById("areas").getElementsByTagName("option")[i].value.split(" ")[0]) === area_id) {
            document.getElementById("areas").getElementsByTagName("option")[i].setAttribute("selected", "selected")
        }
    }
}

document.getElementById("areas").addEventListener("change", function () {
    area_id = parseInt(document.getElementById("areas").value.split(" ")[0])
    localStorage.setItem("area_id", area_id)
})

function receiveMessage(message) {
    console.log(message.data)
    if (message.origin != "//downthecrop.github.io") {
        try {
            JSON.parse(message.data)
        } catch (e) {
            console.log("Message isn't jData")
            console.log(message.data)
            if (message.data === "loading") {
                loading(true)
                document.getElementsByClassName("multi2__list")[0].innerHTML = ""
            }
            if (message.data === "ticket-error") {
                loading(false)
                document.getElementsByClassName("multi2__list")[0].innerHTML = "<h1>Ticket Error</h1>"
            }
            if (message.data === "error-slol-id-not-found") {
                loading(false)
                console.log("Player not found: " + message.data.role_name)
            }
        }
        let jMessage = JSON.parse(message.data)
        if (jMessage.type === "profile-multi-reply") {
            loading(false)
            create_multi_profile(jMessage)
        }
    }
}

function sendMessage(message) {
    parent.postMessage(message, '*');
}
window.addEventListener('message', receiveMessage);
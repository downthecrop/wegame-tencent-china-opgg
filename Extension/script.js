const battle_list = 'https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/get_battle_list'
const battle_details = 'https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/get_battle_detail'
const query_by_nick = 'https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/query_by_nick'
const get_battle_topbar_info = 'https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/get_battle_topbar_info'
const get_often_used = 'https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/get_often_used_champion'

var loginStatus = false
var ticket_flag = false
var jResultArray = []
var usernames = []

const htmlEmbed = '\
<div id="myModal" class="modal-crop">\
    <div class="modal-content-crop">\
        <span class="close-crop">&times;</span>\
        <button id="multi-page">Mutlisearch</button>\
        <button id="profile-page">Profile</button>\
        <iframe id="myiFrame" src="https://downthecrop.github.io/opgg-clone/Multi/"></iframe>\
    </div>\
</div>'

async function getUserData(uname, area_id) {
    const nickJSON = {
        "search_nick": uname,
    }
    const battleJSON = {
        "area_id": area_id,
        "area_name": "",
        "filter_type": 0,
        "game_id": 26,
        "limit": 10,
        "offset": 0,
        "slol_id": "",
        "totalNum": 0
    }
    apiRequest(query_by_nick, nickJSON).then((data) => {
        console.log(data);
        if (data.code === 402) {
            console.log("ticket error")
            ticket_flag = true;
            sendMessage("ticket-error")
        }
        else {
            for (var i = 0; i < Object.keys(data.data.player_list).length; i += 1) {
                if (data.data.player_list[i].area_id === area_id) {
                    var player_data = data.data.player_list[i]
                    battleJSON.slol_id = data.data.player_list[i].slol_id
                    console.log("User " + nickJSON.search_nick + " Found on Ionia with slol_id=" + battleJSON.slol_id)
                    console.log(battleJSON)
                    apiRequest(battle_list, battleJSON).then((battle_data) => {
                        apiRequest(get_battle_topbar_info, battleJSON).then((topbar_data) => {
                            var jVal = buildJSON(player_data, battle_data, topbar_data)
                            console.log(JSON.stringify(jVal))
                            jResultArray.push(JSON.stringify(jVal))
                        })
                    })
                    i = Infinity;
                }
            }
        }
    })
}

async function get_profile(uname, area_id) {
    const nickJSON = {
        "search_nick": uname,
    }
    const battleJSON = {
        "area_id": area_id,
        "area_name": "",
        "filter_type": 0,
        "game_id": 26,
        "limit": 10,
        "offset": 0,
        "slol_id": "",
        "totalNum": 0
    }
    apiRequest(query_by_nick, nickJSON).then((data) => {
        console.log(data);
        if (data.code === 402) {
            console.log("ticket error")
            ticket_flag = true;
            sendMessage("ticket-error")
        }
        else {
            for (let i = 0; i < Object.keys(data.data.player_list).length; i += 1) {
                if (data.data.player_list[i].area_id === area_id) {
                    let player_data = data.data.player_list[i]
                    battleJSON.slol_id = data.data.player_list[i].slol_id
                    console.log("User " + nickJSON.search_nick + " Found on Ionia with slol_id=" + battleJSON.slol_id)
                    apiRequest(battle_list, battleJSON).then((battle_data) => {
                        apiRequest(get_battle_topbar_info, battleJSON).then((topbar_data) => {
                            apiRequest(get_often_used, battleJSON).then((often_used_data) => {
                                let jRepsonse = profile_basic_builderJSON(battle_data, topbar_data, often_used_data)
                                sendMessage(jRepsonse)
                            })
                        })
                    })
                    i = Infinity;
                }
            }
        }
    })
}

async function get_game_details(slol_id, battle_id, area_id) {

    let requestBody = {
        "area_id": parseInt(area_id),
        "battle_id": parseInt(battle_id),
        "dst_slol_id": slol_id,
        "game_id": 26,
        "req_slol_id": slol_id
    }
    apiRequest(battle_details, requestBody).then((data) => {
        console.log(data);
        if (data.code === 402) {
            console.log("ticket error")
            ticket_flag = true;
            sendMessage("ticket-error")
        }
        else {
            let jRepsonse = game_details_builderJSON(data)
            sendMessage(jRepsonse)
        }
    })
}

async function apiRequest(myurl, body) {
    return fetch(myurl, {
        method: 'post',
        credentials: 'include',
        headers: {
            'User-Agent': 'WeGame/1778 CFNetwork/1121.2.2 Darwin/19.3.0',
            'Host': 'm.wegame.com.cn',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}

function buildJSON(user, games, topbar) {
    user = Object.assign(games.data, user)
    user = Object.assign(topbar.data, user)
    console.log(user)
    return user;
}

function profile_basic_builderJSON(battle_data, topbar_data, often_used_data) {
    let player = { "type": "profile-basic-reply" }
    player = Object.assign(topbar_data, player)
    player = Object.assign(often_used_data.data, player)
    player = Object.assign(battle_data.data, player)
    return JSON.stringify(player);
}

function game_details_builderJSON(jdata) {
    let data = { "type": "profile-detailedmatch-reply" }
    data = Object.assign(jdata, data)
    return JSON.stringify(data);
}

function buildMultiMessage(r_data) {
    let m = "";
    for (i in r_data) {
        if (i === 0) {
            m += i + "=" + r_data[i]
        }
        else {
            m += "&" + i + "=" + r_data[i]
        }
    }
    return m;
}

function sendMessage(message) {
    const receiver = document.getElementById('myiFrame').contentWindow;
    receiver.postMessage(message, 'https://downthecrop.github.io/opgg-clone/');
}

function main() {
    if (window.location.href.includes("https://www.wegame.com.cn/")) {
        function listCookies() {
            const theCookies = document.cookie.split(';');
            let aString = '';
            for (let i = 1; i <= theCookies.length; i++) {
                aString += i + ' ' + theCookies[i - 1] + "\n";
                if (theCookies[i - 1].includes("tgp_id")) {
                    loginStatus = true;
                }
            }
            return aString;
        }
        console.log(listCookies())
    }

    if (loginStatus) {

        document.body.innerHTML = htmlEmbed + document.body.innerHTML;

        //begin GUI injection
        let topbar = document.getElementsByClassName("widget-header-nav")[0];
        topbar.getElementsByClassName("cur")[0].innerHTML = "<a id='myBtn' href='#'>Cropsearch</a>";

        const btn = document.getElementById("myBtn");
        const modal = document.getElementById("myModal");
        const span = document.getElementsByClassName("close-crop")[0];

        btn.onclick = function () {
            modal.style.display = "block";
        }
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }

        document.getElementById("multi-page").addEventListener('click', function () {
            document.getElementById("myiFrame").src = "https://downthecrop.github.io/opgg-clone/Multi/";
        })
        document.getElementById("profile-page").addEventListener('click', function () {
            document.getElementById("myiFrame").src = "https://downthecrop.github.io/opgg-clone/Profile/";
        })
    }
}

(function () {
    var _push = Array.prototype.push;
    Array.prototype.push = function () {
        ///this is probably a really bad way to handle async but I don't care for now.
        _push.apply(this, arguments);
        if (jResultArray.length != 0 && usernames.length === jResultArray.length) {
            if (ticket_flag === false) {
                message = buildMultiMessage(jResultArray)
                console.log(message)
                sendMessage(message)

                //reset
                usernames = []
                jResultArray = []
            }
            else {
                console.log("Message wasn't send due to ticket error")
            }
        }
        return;
    }
})();

window.addEventListener('message', function (message) {
    if (message.origin === "https://downthecrop.github.io") {
        try {
            JSON.parse(message.data)
        } catch (e) {
            console.log("Message isn't json")
            console.log(message.data)
        }
        let jMessage = JSON.parse(message.data)
        console.log(jMessage)
        if (jMessage.type === "name_mutli_search") {
            sendMessage("loading")
            let area_id = 31;
            getUserData(jMessage.user, area_id)
            usernames.push(jMessage.user)
        }
        if (jMessage.type === "profile-basic") {
            //sendMessage("loading")
            let area_id = parseInt(jMessage.area_id)
            get_profile(jMessage.name, area_id)
        }
        if (jMessage.type === "profile-detailedmatch") {
            let area_id = parseInt(jMessage.area_id)
            get_game_details(jMessage.slol_id, jMessage.battle_id, area_id)
        }
    }
});

let checkExist = setInterval(function () {
    if ($('.widget-header-nav').length) {
        main()
        clearInterval(checkExist);
    }
}, 1000); // check every 1sec
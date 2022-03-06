const battle_list = 'https://m.wegame.com.cn/api/trpc/Proxy/Forward/trpc.wegameapp.lol_common_service.DataLogic/GetBattleList'
const battle_details = 'https://m.wegame.com.cn/api/trpc/Proxy/Forward/trpc.wegameapp.lol_common_service.DataLogic/GetBattleDetail'
const query_by_nick = 'https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/query_by_nick'
const get_battle_topbar_info = 'https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/get_battle_topbar_info'
const get_often_used = 'https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/get_often_used_champion'
const web_url = "https://downthecrop.github.io/wegame-tencent-china-opgg/"
const multi_url = web_url + "Multi/"
const profile_url = web_url + "Profile/"
const color_active = "hsla(0,0%,100%,.12)"
const color_inactive = "#3c3c3c"

let loginStatus = false
let activeFrame = ""

async function get_user_from_name(name, area_id) {
    const nickJSON = {
        "search_nick": name,
    }
    return apiRequest(query_by_nick, nickJSON).then((data) => {
        console.log(data)
        if (data.code === 402) {
            console.log("ticket-error")
            sendMessage("ticket-error")
            return
        }
        if (!("player_list" in data.data)) {
            console.log("No player list")
            sendMessage("error-slol-id-not-found")
            return
        }
        for (player of data.data.player_list) {
            if (player.area_id === area_id)
                return player
        }
    })
}

async function get_profile_multi(name, area_id) {
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
    get_user_from_name(name, area_id).then((player) => {
        battleJSON.slol_id = player.slol_id
    }).then(() => {
        console.log("User " + name + " Found on " + area_id + " with slol_id=" + battleJSON.slol_id)
        console.log(battleJSON)
        apiRequest(battle_list, battleJSON).then((battle_data) => {
            apiRequest(get_battle_topbar_info, battleJSON).then((topbar_data) => {
                sendMessage(profile_multi_buildJSON(player, battle_data, topbar_data))
            })
        })
    })
}

async function get_profile_by_name(name, area_id) {
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
    get_user_from_name(name, area_id).then((player) => {
        battleJSON.slol_id = player.slol_id
    }).then(() => {
        console.log("User " + name + " Found on " + area_id + " with slol_id=" + battleJSON.slol_id)
        apiRequest(battle_list, battleJSON).then((battle_data) => {
            apiRequest(get_battle_topbar_info, battleJSON).then((topbar_data) => {
                apiRequest(get_often_used, battleJSON).then((often_used_data) => {
                    sendMessage(profile_basic_builderJSON(battle_data, topbar_data, often_used_data))
                })
            })
        })
    })
}

async function get_profile_by_slol_id(slol_id, area_id) {
    const battleJSON = {
        "area_id": area_id,
        "area_name": "",
        "filter_type": 0,
        "game_id": 26,
        "limit": 10,
        "offset": 0,
        "slol_id": slol_id,
        "totalNum": 0
    }
    apiRequest(battle_list, battleJSON).then((battle_data) => {
        console.log(battle_data)
        if (battle_data.code === 402) {
            console.log("ticket-error")
            sendMessage("ticket-error")
            return
        }
        apiRequest(get_battle_topbar_info, battleJSON).then((topbar_data) => {
            apiRequest(get_often_used, battleJSON).then((often_used_data) => {
                sendMessage(profile_basic_builderJSON(battle_data, topbar_data, often_used_data))
            })
        })
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
        console.log(data)
        if (data.code === 402) {
            console.log("ticket-error")
            sendMessage("ticket-error")
            return
        }
        sendMessage(game_details_builderJSON(data))
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
            console.log('Request failed', error)
        })
}

function profile_multi_buildJSON(user, games, topbar) {
    let player = { "type": "profile-multi-reply" }
    user = Object.assign(user, player)
    user = Object.assign(games.data, user)
    user = Object.assign(topbar.data, user)
    console.log(user)
    return JSON.stringify(user)
}

function profile_basic_builderJSON(battle_data, topbar_data, often_used_data) {
    let player = { "type": "profile-basic-reply" }
    player = Object.assign(topbar_data, player)
    player = Object.assign(often_used_data.data, player)
    player = Object.assign(battle_data.data, player)
    return JSON.stringify(player)
}

function game_details_builderJSON(jdata) {
    let data = { "type": "profile-detailedmatch-reply" }
    data = Object.assign(jdata, data)
    return JSON.stringify(data)
}

function sendMessage(message) {
    let receiver = document.getElementById(activeFrame).contentWindow;
    receiver.postMessage(message, web_url);
}

window.addEventListener('message', function (messageEvent) {
    let message
    if (message.origin === "https://downthecrop.github.io") {
        try {
            message = JSON.parse(messageEvent.data)
        } catch (e) {
            console.log("Message isn't json")
            console.log(message.data)
        }
        console.log(message)
        sendMessage("loading")
        switch (message.type) {
            case "profile-multi":
                get_profile_multi(message.name, parseInt(message.area_id))
                break;
            case "profile-basic":
                get_profile_by_name(message.name, parseInt(message.area_id))
                break;
            case "profile-basic-slol-id":
                profile_active()
                get_profile_by_slol_id(message.slol_id, parseInt(message.area_id))
                break;
            case "profile-detailedmatch":
                get_game_details(message.slol_id, message.battle_id, parseInt(message.area_id))
                break;
        }
    }
});

function multi_active() {
    let d_multi = document.getElementById("multi-button")
    let d_profile = document.getElementById("profile-button")
    let d_iframe_multi = document.getElementById("multi-iframe")
    let d_iframe_profile = document.getElementById("profile-iframe")
    d_multi.style.backgroundColor = color_active
    d_profile.style.backgroundColor = color_inactive
    d_iframe_multi.style.display = "block"
    d_iframe_profile.style.display = "none"
    activeFrame = "multi-iframe"
}

function profile_active() {
    let d_multi = document.getElementById("multi-button")
    let d_profile = document.getElementById("profile-button")
    let d_iframe_multi = document.getElementById("multi-iframe")
    let d_iframe_profile = document.getElementById("profile-iframe")
    d_profile.style.backgroundColor = color_active
    d_multi.style.backgroundColor = color_inactive
    d_iframe_multi.style.display = "none"
    d_iframe_profile.style.display = "block"
    activeFrame = "profile-iframe"
}

let checkExist = setInterval(function () {
    if (document.getElementsByClassName("widget-header-nav")) {
        init_gui()
        clearInterval(checkExist);
    }
}, 1000);

function init_gui() {
    if (window.location.href.includes("https://www.wegame.com.cn/")) {
        const cookies = document.cookie.split(';');
        for (cookie of cookies) {
            if (cookie.includes("tgp_id"))
                loginStatus = true;
        }
    }
    
    if (loginStatus) {

        //begin GUI injection
        let topbar = document.getElementsByClassName("wgnav")[0];
        let cropsearch_li = document.createElement("li")
        let cropsearch_a = document.createElement("a")
        let cropsearch_t = document.createTextNode("Cropsearch")
        cropsearch_a.appendChild(cropsearch_t)
        cropsearch_li.appendChild(cropsearch_a)
        cropsearch_li.className = "wgnav-item"
        cropsearch_a.href = "#"
        cropsearch_a.id = "myBtn"
        cropsearch_a.className = "wgnav-link"

        cropsearch_li.onclick = function () {
            document.getElementById("myModal").style.display = "block"
        }

        topbar.appendChild(cropsearch_li)

        let myModal = document.createElement("div")
        myModal.id = "myModal"
        myModal.setAttribute("class", "modal-crop")

        let modalContent = document.createElement("div")
        modalContent.className = "modal-content-crop"

        let close_button = document.createElement("span")
        close_button.className = "close-crop"

        close_button.onclick = function () {
            document.getElementById("myModal").style.display = "none"
        }

        let close_text = document.createTextNode("x")
        close_button.appendChild(close_text)

        let multi_button = document.createElement("button")
        let multi_text = document.createTextNode("Multisearch")
        multi_button.id = "multi-button"
        multi_button.appendChild(multi_text)

        let profile_button = document.createElement("button")
        let profile_text = document.createTextNode("Profile")
        profile_button.id = "profile-button"
        profile_button.appendChild(profile_text)

        let embed_multi = document.createElement("iframe")
        embed_multi.id = "multi-iframe"
        embed_multi.src = multi_url
        embed_multi.style.display = "none"

        let embed_profile = document.createElement("iframe")
        embed_profile.id = "profile-iframe"
        embed_profile.src = profile_url

        modalContent.appendChild(close_button)
        modalContent.appendChild(profile_button)
        modalContent.appendChild(multi_button)
        modalContent.appendChild(embed_multi)
        modalContent.appendChild(embed_profile)
        myModal.appendChild(modalContent)
        document.body.prepend(myModal)

        window.onclick = function (event) {
            if (event.target === document.getElementById("myModal")) {
                document.getElementById("myModal").style.display = "none"
            }
        }

        let d_multi = document.getElementById("multi-button")
        let d_profile = document.getElementById("profile-button")

        d_profile.style.backgroundColor = color_active
        activeFrame = "profile-iframe"

        d_multi.onclick = function () {
            multi_active()
        }

        d_profile.onclick = function () {
            profile_active()
        }
    }
}
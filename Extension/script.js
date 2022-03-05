const battle_list = 'https://m.wegame.com.cn/api/trpc/Proxy/Forward/trpc.wegameapp.lol_common_service.DataLogic/GetBattleList'
const battle_details = 'https://m.wegame.com.cn/api/trpc/Proxy/Forward/trpc.wegameapp.lol_common_service.DataLogic/GetBattleDetail'
const query_by_nick = 'https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/query_by_nick'
const get_battle_topbar_info = 'https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/get_battle_topbar_info'
const get_often_used = 'https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/get_often_used_champion'
const multi_url = "https://downthecrop.github.io/wegame-tencent-china-opgg/Multi/"
const profile_url = "https://downthecrop.github.io/wegame-tencent-china-opgg/Profile/"
const color_active = "hsla(0,0%,100%,.12)"
const color_inactive = "#3c3c3c"

let loginStatus = false
let activeFrame = ""

async function get_profile_multi(uname, area_id) {
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
        console.log(data)
        if (data.code === 402) {
            console.log("ticket error")
            ticket_flag = true;
            sendMessage("ticket-error")
        }
        else if(!("player_list" in data.data)){
            console.log("No player list")
            sendMessage("error-slol-id-not-found")
        }
        else {
            for (var i = 0; i < Object.keys(data.data.player_list).length; i += 1) {
                if (data.data.player_list[i].area_id === area_id) {
                    var player_data = data.data.player_list[i]
                    battleJSON.slol_id = data.data.player_list[i].slol_id
                    console.log("User " + nickJSON.search_nick + " Found on " + area_id + " with slol_id=" + battleJSON.slol_id)
                    console.log(battleJSON)
                    apiRequest(battle_list, battleJSON).then((battle_data) => {
                        apiRequest(get_battle_topbar_info, battleJSON).then((topbar_data) => {
                            var jVal = profile_multi_buildJSON(player_data, battle_data, topbar_data)
                            sendMessage(jVal)
                        })
                    })
                    break
                }
            }
            if (battleJSON.slol_id === ""){
                sendMessage("error-slol-id-not-found")
            }
        }
    })
}

async function get_profile_by_name(uname, area_id) {
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
        console.log(data)
        if (data.code === 402) {
            console.log("ticket error")
            ticket_flag = true
            sendMessage("ticket-error")
        }
        else if(!("player_list" in data.data)){
            console.log("No player list")
            sendMessage("error-slol-id-not-found")
        }
        else {
            for (let i = 0; i < Object.keys(data.data.player_list).length; i += 1) {
                if (data.data.player_list[i].area_id === area_id) {
                    let player_data = data.data.player_list[i]
                    battleJSON.slol_id = data.data.player_list[i].slol_id
                    console.log("User " + nickJSON.search_nick + " Found on " + area_id + " with slol_id=" + battleJSON.slol_id)
                    apiRequest(battle_list, battleJSON).then((battle_data) => {
                        apiRequest(get_battle_topbar_info, battleJSON).then((topbar_data) => {
                            apiRequest(get_often_used, battleJSON).then((often_used_data) => {
                                let jRepsonse = profile_basic_builderJSON(battle_data, topbar_data, often_used_data)
                                sendMessage(jRepsonse)
                            })
                        })
                    })
                    break
                }
            }
            if (battleJSON.slol_id === ""){
                sendMessage("error-slol-id-not-found")
            }
        }
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
            console.log("ticket error")
            ticket_flag = true
            sendMessage("ticket-error")
        }
        else {
            apiRequest(get_battle_topbar_info, battleJSON).then((topbar_data) => {
                apiRequest(get_often_used, battleJSON).then((often_used_data) => {
                    let jRepsonse = profile_basic_builderJSON(battle_data, topbar_data, often_used_data)
                    sendMessage(jRepsonse)
                })
            })
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
        console.log(data)
        if (data.code === 402) {
            console.log("ticket error")
            ticket_flag = true
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
    receiver.postMessage(message, 'https://downthecrop.github.io/wegame-tencent-china-opgg/');
}

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
        if (jMessage.type === "profile-multi") {
            sendMessage("loading")
            get_profile_multi(jMessage.name, parseInt(jMessage.area_id))
        }
        if (jMessage.type === "profile-basic") {
            sendMessage("loading")
            get_profile_by_name(jMessage.name, parseInt(jMessage.area_id))
        }
        if (jMessage.type === "profile-basic-slol-id") {
            profile_active()
            sendMessage("loading")
            get_profile_by_slol_id(jMessage.slol_id, parseInt(jMessage.area_id))
        }
        if (jMessage.type === "profile-detailedmatch") {
            sendMessage("loading")
            get_game_details(jMessage.slol_id, jMessage.battle_id, parseInt(jMessage.area_id))
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
        main()
        clearInterval(checkExist);
    }
}, 1000);

function main() {
    if (window.location.href.includes("https://www.wegame.com.cn/")) {
        function listCookies() {
            const theCookies = document.cookie.split(';');
            let aString = ''
            for (let i = 1; i <= theCookies.length; i++) {
                aString += i + ' ' + theCookies[i - 1] + "\n"
                if (theCookies[i - 1].includes("tgp_id")) {
                    loginStatus = true
                }
            }
            return aString
        }
        console.log(listCookies())
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
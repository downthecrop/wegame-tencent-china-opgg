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

async function get_player_from_name(name, area_id) {
    const nickJSON = {
        "search_nick": name,
    }
    return apiRequest(query_by_nick, nickJSON).then((data) => {
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
    let player = await get_player_from_name(name, area_id)
    battleJSON.slol_id = player.slol_id
    sendMessage(
        profile_multi_buildJSON(
            player,
            await apiRequest(battle_list, battleJSON),
            await apiRequest(get_battle_topbar_info, battleJSON)
        )
    )
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
    let player = await get_player_from_name(name, area_id)
    battleJSON.slol_id = player.slol_id
    sendMessage(
        profile_basic_builderJSON(
            await apiRequest(battle_list, battleJSON),
            await apiRequest(get_battle_topbar_info, battleJSON),
            await apiRequest(get_often_used, battleJSON)
        )
    )
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
    sendMessage(
        profile_basic_builderJSON(
            await apiRequest(battle_list, battleJSON),
            await apiRequest(get_battle_topbar_info, battleJSON),
            await apiRequest(get_often_used, battleJSON)
        )
    )
}

async function get_game_details(slol_id, battle_id, area_id) {
    let requestBody = {
        "area_id": parseInt(area_id),
        "battle_id": parseInt(battle_id),
        "dst_slol_id": slol_id,
        "game_id": 26,
        "req_slol_id": slol_id
    }
    sendMessage(
        game_details_builderJSON(
            await apiRequest(battle_details, requestBody)
        )
    )
}

async function apiRequest(myurl, body) {
    return await fetch(myurl, {
        method: 'post',
        credentials: 'include',
        headers: {
            'User-Agent': 'WeGame/1778 CFNetwork/1121.2.2 Darwin/19.3.0',
            'Host': 'm.wegame.com.cn',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(data => {
        data = data.json()
        if (data.code === 402) {
            sendMessage("ticket-error")
            throw "ticket-error"
        }
        return data;
    }).catch(function (error) {
        console.log('Request failed', error)
    })
}

function profile_multi_buildJSON(user, games, topbar) {
    let reply = { "type": "profile-multi-reply" }
    Object.assign(reply, user, games.data, topbar.data)
    return JSON.stringify(reply)
}

function profile_basic_builderJSON(battle_data, topbar_data, often_used_data) {
    let reply = { "type": "profile-basic-reply" }
    Object.assign(reply, topbar_data, often_used_data.data, battle_data.data)
    return JSON.stringify(reply)
}

function game_details_builderJSON(game_details) {
    let reply = { "type": "profile-detailedmatch-reply" }
    Object.assign(reply, game_details)
    return JSON.stringify(reply)
}

function sendMessage(message) {
    let receiver = document.getElementById(activeFrame).contentWindow;
    receiver.postMessage(message, web_url);
}

window.addEventListener('message', function (messageEvent) {
    if (messageEvent.origin === "https://downthecrop.github.io") {
        try {
            let message = JSON.parse(messageEvent.data)
            sendMessage("loading")
            switch (message.type) {
                case "profile-multi":
                    get_profile_multi(message.name, message.area_id)
                    break;
                case "profile-basic":
                    get_profile_by_name(message.name, message.area_id)
                    break;
                case "profile-basic-slol-id":
                    profile_active()
                    get_profile_by_slol_id(message.slol_id, message.area_id)
                    break;
                case "profile-detailedmatch":
                    get_game_details(message.slol_id, message.battle_id, message.area_id)
                    break;
            }
        } catch (e) {
            console.log("unhandled event: ", messageEvent)
            console.log("error message: ", e)
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
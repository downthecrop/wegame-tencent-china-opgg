/* eslint-disable max-len */
/* eslint-disable no-console */
const battle_list = "https://m.wegame.com.cn/api/trpc/Proxy/Forward/trpc.wegameapp.lol_common_service.DataLogic/GetBattleList";
const battle_details = "https://m.wegame.com.cn/api/trpc/Proxy/Forward/trpc.wegameapp.lol_common_service.DataLogic/GetBattleDetail";
const query_by_nick = "https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/query_by_nick";
const get_battle_topbar_info = "https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/get_battle_topbar_info";
const get_often_used = "https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/get_often_used_champion";
const web_url = "https://downthecrop.github.io/wegame-tencent-china-opgg/";
const multi_url = web_url + "Multi/";
const profile_url = web_url + "Profile/";
const color_active = "#4c4c4c";
const color_inactive = "#3c3c3c";

const headers = {
    "User-Agent": "WeGame/1778 CFNetwork/1121.2.2 Darwin/19.3.0",
    "Host": "m.wegame.com.cn",
    "Content-Type": "application/json",
};

const request_body = {
    "area_id": 0,
    "area_name": "",
    "filter_type": 0,
    "game_id": 26,
    "limit": 10,
    "offset": 0,
    "slol_id": "",
    "totalNum": 0
};

let activeFrame = "";

async function get_player_from_name(name, area_id) {
    const body = {
        "search_nick": name
    };
    const data = await request(query_by_nick, body);
    try {
        for (const player of data.data.player_list) {
            if (player.area_id === area_id)
                return player;
        }
    } catch (e) {
        console.log("No player list");
        sendMessage("error-slol-id-not-found");
        return;
    }
}

async function get_profile_multi(name, area_id) {
    const body = request_body;
    body.area_id = area_id;
    body.slol_id = Object(await get_player_from_name(name, area_id)).slol_id;
    sendMessage(
        generic_builder(
            { "type": "profile-multi-reply" },
            Object(await request(battle_list, body)).data,
            Object(await request(get_battle_topbar_info, body)).data
        )
    );
}

async function get_profile_by_name(name, area_id) {
    const body = request_body;
    body.area_id = area_id;
    body.slol_id = Object(await get_player_from_name(name, area_id)).slol_id;
    sendMessage(
        generic_builder(
            { "type": "profile-basic-reply" },
            Object(await request(battle_list, body)).data,
            Object(await request(get_often_used, body)).data,
            await request(get_battle_topbar_info, body)
        )
    );
}

async function get_profile_by_slol_id(slol_id, area_id) {
    const body = request_body;
    body.area_id = area_id;
    body.slol_id = slol_id;
    sendMessage(
        generic_builder(
            { "type": "profile-basic-reply" },
            Object(await request(battle_list, body)).data,
            Object(await request(get_often_used, body)).data,
            await request(get_battle_topbar_info, body)
        )
    );
}

async function get_game_details(slol_id, battle_id, area_id) {
    const body = {
        "area_id": area_id,
        "battle_id": battle_id,
        "dst_slol_id": slol_id,
        "game_id": 26,
        "req_slol_id": slol_id
    };
    sendMessage(
        generic_builder(
            { "type": "profile-detailedmatch-reply" },
            await request(battle_details, body)
        )
    );
}

async function request(url, body) {
    try {
        const response = await fetch(url, {
            method: "post",
            credentials: "include",
            headers: headers,
            body: JSON.stringify(body)
        });
        const data = response.json();
        if (data.code === 402) {
            sendMessage("ticket-error");
            throw "ticket-error";
        }
        return data;
    } catch (e) {
        console.log("Request failed", e);
    }
}

function generic_builder() {
    const reply = {}
    for (argument of arguments) {
        Object.assign(reply, argument);
    }
    return JSON.stringify(reply);
}

function sendMessage(message) {
    const receiver = document.getElementById(activeFrame).contentWindow;
    receiver.postMessage(message, web_url);
}

function multi_active() {
    const d_multi = document.getElementById("multi-button");
    const d_profile = document.getElementById("profile-button");
    const d_iframe_multi = document.getElementById("multi-iframe");
    const d_iframe_profile = document.getElementById("profile-iframe");
    d_multi.style.backgroundColor = color_active;
    d_profile.style.backgroundColor = color_inactive;
    d_iframe_multi.style.display = "block";
    d_iframe_profile.style.display = "none";
    activeFrame = "multi-iframe";
}

function profile_active() {
    const d_multi = document.getElementById("multi-button");
    const d_profile = document.getElementById("profile-button");
    const d_iframe_multi = document.getElementById("multi-iframe");
    const d_iframe_profile = document.getElementById("profile-iframe");
    d_profile.style.backgroundColor = color_active;
    d_multi.style.backgroundColor = color_inactive;
    d_iframe_multi.style.display = "none";
    d_iframe_profile.style.display = "block";
    activeFrame = "profile-iframe";
}

const checkExist = setInterval(function () {
    if (document.getElementsByClassName("widget-header-nav")) {
        init_gui();
        clearInterval(checkExist);
    }
}, 1000);

function init_gui() {
    let loggedIn = false;
    if (window.location.href.includes("https://www.wegame.com.cn/")) {
        const cookies = document.cookie.split(";");
        for (const cookie of cookies) {
            if (cookie.includes("tgp_id"))
                loggedIn = true;
        }
    }

    if (!loggedIn)
        return;

    //begin GUI injection
    const topbar = document.getElementsByClassName("wgnav")[0];
    const cropsearch_li = document.createElement("li");
    const cropsearch_a = document.createElement("a");
    const cropsearch_t = document.createTextNode("Cropsearch");
    cropsearch_a.appendChild(cropsearch_t);
    cropsearch_li.appendChild(cropsearch_a);
    cropsearch_li.className = "wgnav-item";
    cropsearch_a.href = "#";
    cropsearch_a.id = "myBtn";
    cropsearch_a.className = "wgnav-link";

    cropsearch_li.onclick = function () {
        document.getElementById("myModal").style.display = "block";
    };

    topbar.appendChild(cropsearch_li);

    const myModal = document.createElement("div");
    myModal.id = "myModal";
    myModal.setAttribute("class", "modal-crop");

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content-crop";

    const close_button = document.createElement("span");
    close_button.className = "close-crop";

    close_button.onclick = function () {
        document.getElementById("myModal").style.display = "none";
    };

    const close_text = document.createTextNode("x");
    close_button.appendChild(close_text);

    const multi_button = document.createElement("button");
    const multi_text = document.createTextNode("Multisearch");
    multi_button.id = "multi-button";
    multi_button.appendChild(multi_text);

    const profile_button = document.createElement("button");
    const profile_text = document.createTextNode("Profile");
    profile_button.id = "profile-button";
    profile_button.appendChild(profile_text);

    const embed_multi = document.createElement("iframe");
    embed_multi.id = "multi-iframe";
    embed_multi.src = multi_url;

    const embed_profile = document.createElement("iframe");
    embed_profile.id = "profile-iframe";
    embed_profile.src = profile_url;

    modalContent.appendChild(close_button);
    modalContent.appendChild(profile_button);
    modalContent.appendChild(multi_button);
    modalContent.appendChild(embed_multi);
    modalContent.appendChild(embed_profile);
    myModal.appendChild(modalContent);
    document.body.prepend(myModal);

    const d_multi = document.getElementById("multi-button");
    const d_profile = document.getElementById("profile-button");

    d_multi.onclick = function () {
        multi_active();
    };

    d_profile.onclick = function () {
        profile_active();
    };

    profile_active();

    window.onclick = function (event) {
        if (event.target === document.getElementById("myModal")) {
            document.getElementById("myModal").style.display = "none";
        }
    };

    window.addEventListener("message", function (messageEvent) {
        if (messageEvent.origin === "https://downthecrop.github.io") {
            try {
                const message = JSON.parse(messageEvent.data);
                sendMessage("loading");
                switch (message.type) {
                    case "profile-multi":
                        get_profile_multi(message.name, message.area_id);
                        break;
                    case "profile-basic":
                        get_profile_by_name(message.name, message.area_id);
                        break;
                    case "profile-basic-slol-id":
                        profile_active();
                        get_profile_by_slol_id(message.slol_id, message.area_id);
                        break;
                    case "profile-detailedmatch":
                        get_game_details(message.slol_id, message.battle_id, message.area_id);
                        break;
                }
            } catch (e) {
                console.log("unhandled event: ", messageEvent);
                console.log("error message: ", e);
            }
        }
    });
}
var htmlEmbed =  '\
<div id="myModal" class="modal-crop">\
    <div class="modal-content-crop">\
        <span class="close-crop">&times;</span>\
        <button id="multi-page">Mutlisearch</button>\
        <button id="profile-page">Profile</button>\
        <iframe id="myiFrame" src="https://downthecrop.github.io/opgg-clone/Multi/"></iframe>\
    </div>\
</div>'


const battle_list = 'https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/get_battle_list'
const battle_details = 'https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/get_battle_detail'
const query_by_nick = 'https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/query_by_nick'
const get_battle_topbar_info = 'https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/get_battle_topbar_info'
var ticket_flag = false

var jResultArray = []

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        console.log("deleting cookie"+cookie)
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

async function getUserData(uname,area_id){
    var nickJSON = {
            "search_nick": uname,
    }
    var battleJSON = {
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
        if (data.code === 402){
            console.log("ticket error")
            ticket_flag = true;
            sendToFrame("ticket-error")
        }
        else{
            for (var i = 0; i < Object.keys(data.data.player_list).length; i += 1) {
                if (data.data.player_list[i]["area_id"] == area_id) {
                    var player_data = data.data.player_list[i]
                    battleJSON.slol_id = data.data.player_list[i].slol_id
                    console.log("User " + nickJSON["search_nick"] + " Found on Ionia with slol_id=" + battleJSON.slol_id)
                    console.log(battleJSON)
                    apiRequest(battle_list, battleJSON).then((battle_data) => {
                        apiRequest(get_battle_topbar_info, battleJSON).then((topbar_data) => {
                            var jVal = buildJSON(player_data,battle_data,topbar_data)
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

var usernames = []

function apiRequest(myurl, body) {
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

function buildJSON(user,games,topbar){
    user = Object.assign(games.data, user)
    user = Object.assign(topbar.data, user)
    console.log(user)
    return user;
}

function buildMessage(){
    var mString = "";
    for (i in jResultArray){
        if (i == 0){
            mString += i+"="+jResultArray[i]
        }
        else{
            mString += "&"+i+"="+jResultArray[i]
        }
    }
    return mString;
}

function sendToFrame(message) {
    var receiver = document.getElementById('myiFrame').contentWindow;
    receiver.postMessage(message, 'https://downthecrop.github.io/opgg-clone/');
}

function main() {
    var loginStatus = false;

    if (window.location.href.includes("https://www.wegame.com.cn/")) {
        function listCookies() {
            var theCookies = document.cookie.split(';');
            var aString = '';
            for (var i = 1; i <= theCookies.length; i++) {
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
        topbar = document.getElementsByClassName("widget-header-nav")[0];
        topbar.getElementsByClassName("cur")[0].innerHTML = "<a id='myBtn' href='#'>Cropsearch</a>";
        var btn = document.getElementById("myBtn");
        var modal = document.getElementById("myModal");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close-crop")[0];
        btn.onclick = function () {
            modal.style.display = "block";
        }
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        
        document.getElementById("multi-page").addEventListener('click',function(){
            document.getElementById("myiFrame").src = "https://downthecrop.github.io/opgg-clone/Multi/";
        })
        document.getElementById("profile-page").addEventListener('click',function(){
            document.getElementById("myiFrame").src = "https://downthecrop.github.io/opgg-clone/Profile/";
        })
    }
}

(function() {
    var _push = Array.prototype.push;
    Array.prototype.push = function() {
      ///this is probably a really bad way to handle async but I don't care for now.
      _push.apply(this, arguments);
      if (jResultArray.length != 0 && usernames.length === jResultArray.length){
        console.log("SYNCED")
        if (ticket_flag === false){
            message = buildMessage()
            console.log(message)
            sendToFrame(message)
            
            //reset
            usernames = []
            jResultArray = []
        }
        else{
            console.log("Message wasn't send due to ticket error")
        }
      }
      return;
    }
  })();

  window.addEventListener('message', function(message){
    console.log(message)
    console.log(message.origin)
    if (message.origin === "https://downthecrop.github.io"){
        try {
            var jMessage = JSON.parse(message.data)
            sendToFrame("loading")
            for (key in jMessage){
                var area_id = 31;
                console.log(jMessage[key])
                getUserData(jMessage[key],area_id)
                usernames.push(jMessage[key])
            }
        } catch (e) {
            console.log("Message isn't json")
            return
        }
    }
  });



var checkExist = setInterval(function () {
    if ($('.widget-header-nav').length) {
        main()
        clearInterval(checkExist);
    }
}, 1000); // check every 1sec
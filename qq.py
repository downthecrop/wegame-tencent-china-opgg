'''
About this file:

this is used for testing request to API endpoints.

Just a debug script I used a little but so I thought
I should include it in the repo. It's not very useful
and doesn't even work anymore but it COULD maybe possibly
be useful in the future.


Learn more from my YouTube video here:

https://www.youtube.com/watch?v=RchCi6E2hVs


'''


import requests
import json

rp = requests.post

# URL Constants
get_battle_topbar_info = 'https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/get_battle_topbar_info'
query_by_nick = 'https://m.wegame.com.cn/api/mobile/lua/proxy/index/mwg_lol_proxy/query_by_nick'

c = {
    'tgp_id': 'xxx',
    'app_version': '50811',
    'mac': 'MAC',
    'app_id': '10001',
    'account': 'xxx',
    'platform': 'qq',
    'client_type': '602',
    'machine_type': 'iPhone',
    'skey': '@xxx',
    'channel_number': 'ios',
    'tgp_ticket': 'xxx',
}

h = {
    'User-Agent': 'WeGame/1778 CFNetwork/1121.2.2 Darwin/19.3.0',
    'Host': 'm.wegame.com.cn',
    'Content-Type': 'application/json',
}

'''

query_by_nick response

{
   "msg":"succ",
   "code":0,
   "data":{
      "result":0,
      "player_list":[
         {
            "tgp_id":"xxxxxxxxxxxxxx",
            "gender":0,
            "game_nick":"xxxxxxxxxxxxxxxxxxx",
            "area_id":1,
            "slol_id":"xxxxxxxxxxxxxxx",
            "icon_url":"http://down.qq.com/qqtalk/lolApp/images/profileIcons/profileicon20.jpg",
            "rank_title":""
         },
         {
            "tgp_id":"xxxxxxxxxxxx",
            "gender":0,
            "game_nick":"xxxxxxxxxxxxxxx",
            "area_id":30,
            "slol_id":"xxxxxxxxxxxxxxxxx",
            "icon_url":"http://down.qq.com/qqtalk/lolApp/images/profileIcons/profileicon29.jpg",
            "rank_title":""
         }
      ]
   }
}

Note: Still working Dec4 1:11PM with the same key
Note: Still working Dec4 6:17PM with the same key

Note: Web cookies TGP Keys work for authentication
topbar request is what we want for basic info use these params

{
    "area_id": 1,
    "area_name": "",
    "game_id": 26,
    "slol_id": "xxxxxxxxxxxxxx"
}

'''

d = '{"search_nick":"downthecrop"}'
response = rp(query_by_nick, headers=h, cookies=c, data=d)
jdata = json.loads(response.text)

print("###########")
print(json.dumps(jdata, indent=4, sort_keys=True))
print("###########")

print(json.dumps(jdata["data"], indent=4, sort_keys=True))

slol_id = jdata["data"]["player_list"][0]["slol_id"]
print("using "+slol_id)

d = '{"area_id": 1, "area_name": "", "game_id": 26, "slol_id": "'+slol_id+'"}'
response = rp(get_battle_topbar_info, headers=h, cookies=c, data=d)

jdata = json.loads(response.text)
print("###########")
print(json.dumps(jdata, indent=4, sort_keys=True))
print("###########")
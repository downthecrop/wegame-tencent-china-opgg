var devMode = false
let p_slol_id = ""
let player_name = ""
let area_id = 1

if (localStorage.getItem("area_id")) {
    area_id = parseInt(localStorage.getItem("area_id"))
    for (let i = 0; i < document.getElementById("areas").getElementsByTagName("option").length; i += 1) {
        if (parseInt(document.getElementById("areas").getElementsByTagName("option")[i].value.split(" ")[0]) === area_id) {
            document.getElementById("areas").getElementsByTagName("option")[i].setAttribute("selected", "selected")
        }
    }
}

if (localStorage.getItem("searched_user")) {
    document.getElementById("user-input").value = localStorage.getItem("searched_user")
}

const game_details = {
    "code": 0,
    "data": {
        "area_id": 31,
        "battle_info": {
            "battle_id": 91552135,
            "duration": 1602,
            "game_mode_id": 4,
            "game_mode_name": "\u5355\u53cc\u6392\u4f4d",
            "start_time_stamp": 1607957015,
            "stop_time_stamp": 1607958617,
            "team_data_opp": {
                "assist_num": 29,
                "battle_player_record": [
                    {
                        "assists_num": 2,
                        "barracks_killed": 0,
                        "battle_group_percent": 11,
                        "battle_tag_list": [
                            {
                                "name": "",
                                "tag_id": 9
                            }
                        ],
                        "champion_en_name": "",
                        "champion_id": 164,
                        "choose_position": 0,
                        "death_num": 5,
                        "game_score": 660,
                        "gold_num": 9468,
                        "gold_num_percent": 18,
                        "is_win": 2,
                        "item_ids": [
                            3074,
                            2031,
                            3078,
                            1055,
                            1037,
                            3047,
                            3340
                        ],
                        "kill_champion_num": 1,
                        "kill_minion_num": 210,
                        "kill_turret_num": 1,
                        "largest_killing_spree": 0,
                        "largest_multi_kill": 1,
                        "level": 14,
                        "magic_damage_2_champion": 82,
                        "physical_damage_2_champion": 7732,
                        "pv_delta": 0,
                        "role_name": "\u53ea\u53ea\u89c9\u5f97\u4e0d\u59a5",
                        "slol_id": "N3p2ZYV",
                        "summon_spell_id": [
                            12,
                            4
                        ],
                        "team_id": 100,
                        "tier_name": "\u5b97\u5e08",
                        "total_damage_2_champion": 8033,
                        "total_damage_2_champion_percent": 10,
                        "total_damage_dealt": 109545,
                        "total_damage_percent": 20,
                        "total_damage_taken": 18461,
                        "total_health": 3733,
                        "ward_killed_num": 3,
                        "ward_killed_pecent": 12,
                        "ward_placed_num": 8,
                        "ward_placed_pecent": 12
                    },
                    {
                        "assists_num": 9,
                        "barracks_killed": 0,
                        "battle_group_percent": 56,
                        "champion_en_name": "",
                        "champion_id": 163,
                        "choose_position": 0,
                        "death_num": 7,
                        "game_score": 940,
                        "gold_num": 11046,
                        "gold_num_percent": 21,
                        "is_win": 2,
                        "item_ids": [
                            0,
                            1052,
                            3041,
                            3020,
                            3165,
                            6655,
                            3364
                        ],
                        "kill_champion_num": 6,
                        "kill_minion_num": 196,
                        "kill_turret_num": 0,
                        "largest_killing_spree": 3,
                        "largest_multi_kill": 2,
                        "level": 15,
                        "magic_damage_2_champion": 21223,
                        "physical_damage_2_champion": 486,
                        "pv_delta": 0,
                        "role_name": "JUG242SH",
                        "slol_id": "j9mga5l",
                        "summon_spell_id": [
                            4,
                            11
                        ],
                        "team_id": 100,
                        "tier_name": "\u5b97\u5e08",
                        "total_damage_2_champion": 23014,
                        "total_damage_2_champion_percent": 28,
                        "total_damage_dealt": 168092,
                        "total_damage_percent": 31,
                        "total_damage_taken": 23832,
                        "total_health": 8354,
                        "ward_killed_num": 4,
                        "ward_killed_pecent": 16,
                        "ward_placed_num": 4,
                        "ward_placed_pecent": 6
                    },
                    {
                        "assists_num": 3,
                        "barracks_killed": 0,
                        "battle_group_percent": 26,
                        "champion_en_name": "Leblanc",
                        "champion_id": 7,
                        "choose_position": 0,
                        "death_num": 5,
                        "game_score": 750,
                        "gold_num": 9952,
                        "gold_num_percent": 19,
                        "is_win": 2,
                        "item_ids": [
                            2033,
                            1082,
                            4630,
                            6655,
                            3020,
                            3165,
                            3364
                        ],
                        "kill_champion_num": 4,
                        "kill_minion_num": 152,
                        "kill_turret_num": 1,
                        "largest_killing_spree": 2,
                        "largest_multi_kill": 1,
                        "level": 13,
                        "magic_damage_2_champion": 14299,
                        "physical_damage_2_champion": 1653,
                        "pv_delta": 0,
                        "role_name": "\u5927\u5361\u6bd4",
                        "slol_id": "7MqYNd1",
                        "summon_spell_id": [
                            12,
                            4
                        ],
                        "team_id": 100,
                        "tier_name": "\u5b97\u5e08",
                        "total_damage_2_champion": 16078,
                        "total_damage_2_champion_percent": 19,
                        "total_damage_dealt": 87498,
                        "total_damage_percent": 16,
                        "total_damage_taken": 20853,
                        "total_health": 6059,
                        "ward_killed_num": 3,
                        "ward_killed_pecent": 12,
                        "ward_placed_num": 7,
                        "ward_placed_pecent": 11
                    },
                    {
                        "assists_num": 2,
                        "barracks_killed": 0,
                        "battle_flag": [
                            3
                        ],
                        "battle_group_percent": 67,
                        "battle_tag_list": [
                            {
                                "name": "",
                                "tag_id": 8
                            },
                            {
                                "name": "",
                                "tag_id": 1
                            },
                            {
                                "name": "",
                                "tag_id": 3
                            },
                            {
                                "name": "",
                                "tag_id": 12
                            }
                        ],
                        "champion_en_name": "",
                        "champion_id": 145,
                        "choose_position": 0,
                        "death_num": 9,
                        "game_score": 1110,
                        "gold_num": 14332,
                        "gold_num_percent": 27,
                        "is_win": 2,
                        "item_ids": [
                            2420,
                            6671,
                            3094,
                            6676,
                            3071,
                            3006,
                            3363
                        ],
                        "kill_champion_num": 16,
                        "kill_minion_num": 179,
                        "kill_turret_num": 1,
                        "largest_killing_spree": 8,
                        "largest_multi_kill": 2,
                        "level": 14,
                        "magic_damage_2_champion": 6976,
                        "physical_damage_2_champion": 21288,
                        "pv_delta": 0,
                        "role_name": "9\u70b9\u5fc5\u8d77",
                        "slol_id": "MvovXzX",
                        "summon_spell_id": [
                            7,
                            4
                        ],
                        "team_id": 100,
                        "tier_name": "\u738b\u8005",
                        "total_damage_2_champion": 28742,
                        "total_damage_2_champion_percent": 34,
                        "total_damage_dealt": 132834,
                        "total_damage_percent": 25,
                        "total_damage_taken": 22336,
                        "total_health": 6928,
                        "ward_killed_num": 5,
                        "ward_killed_pecent": 20,
                        "ward_placed_num": 7,
                        "ward_placed_pecent": 11
                    },
                    {
                        "assists_num": 13,
                        "barracks_killed": 0,
                        "battle_group_percent": 48,
                        "champion_en_name": "",
                        "champion_id": 875,
                        "choose_position": 0,
                        "death_num": 8,
                        "game_score": 490,
                        "gold_num": 7569,
                        "gold_num_percent": 14,
                        "is_win": 2,
                        "item_ids": [
                            6664,
                            3857,
                            1031,
                            2055,
                            3066,
                            3009,
                            3364
                        ],
                        "kill_champion_num": 0,
                        "kill_minion_num": 51,
                        "kill_turret_num": 0,
                        "largest_killing_spree": 0,
                        "largest_multi_kill": 0,
                        "level": 11,
                        "magic_damage_2_champion": 447,
                        "physical_damage_2_champion": 4757,
                        "pv_delta": 0,
                        "role_name": "Sora1",
                        "slol_id": "qXyX9ag",
                        "summon_spell_id": [
                            14,
                            4
                        ],
                        "team_id": 100,
                        "tier_name": "\u5b97\u5e08",
                        "total_damage_2_champion": 7495,
                        "total_damage_2_champion_percent": 9,
                        "total_damage_dealt": 36615,
                        "total_damage_percent": 7,
                        "total_damage_taken": 20226,
                        "total_health": 1301,
                        "ward_killed_num": 10,
                        "ward_killed_pecent": 40,
                        "ward_placed_num": 39,
                        "ward_placed_pecent": 60
                    }
                ],
                "death_num": 34,
                "gold_num": 52367,
                "is_win": 2,
                "kill_baron_num": 0,
                "kill_dragon_num": 0,
                "kill_num": 27,
                "kill_turret_num": 3,
                "team_id": 100,
                "ward_percent": 51
            },
            "team_data_own": {
                "assist_num": 60,
                "battle_player_record": [
                    {
                        "assists_num": 6,
                        "barracks_killed": 0,
                        "battle_flag": [
                            1
                        ],
                        "battle_group_percent": 53,
                        "battle_tag_list": [
                            {
                                "name": "",
                                "tag_id": 11
                            }
                        ],
                        "champion_en_name": "MonkeyKing",
                        "champion_id": 62,
                        "choose_position": 0,
                        "death_num": 1,
                        "game_score": 1470,
                        "gold_num": 13753,
                        "gold_num_percent": 24,
                        "is_win": 1,
                        "item_ids": [
                            3047,
                            6630,
                            1037,
                            3071,
                            3053,
                            3133,
                            3364
                        ],
                        "kill_champion_num": 12,
                        "kill_minion_num": 203,
                        "kill_turret_num": 2,
                        "largest_killing_spree": 7,
                        "largest_multi_kill": 2,
                        "level": 15,
                        "magic_damage_2_champion": 3346,
                        "physical_damage_2_champion": 14012,
                        "pv_delta": 0,
                        "role_name": "\u8881\u6210\u4f1f\u7684\u7206\u70b8\u679c\u5b9e",
                        "slol_id": "mj7r007",
                        "summon_spell_id": [
                            4,
                            12
                        ],
                        "team_id": 200,
                        "tier_name": "\u5b97\u5e08",
                        "total_damage_2_champion": 17447,
                        "total_damage_2_champion_percent": 22,
                        "total_damage_dealt": 116662,
                        "total_damage_percent": 22,
                        "total_damage_taken": 26477,
                        "total_health": 10132,
                        "ward_killed_num": 5,
                        "ward_killed_pecent": 20,
                        "ward_placed_num": 5,
                        "ward_placed_pecent": 8
                    },
                    {
                        "assists_num": 10,
                        "barracks_killed": 0,
                        "battle_group_percent": 62,
                        "battle_tag_list": [
                            {
                                "name": "",
                                "tag_id": 10
                            }
                        ],
                        "champion_en_name": "Kindred",
                        "champion_id": 203,
                        "choose_position": 0,
                        "death_num": 4,
                        "game_score": 1180,
                        "gold_num": 13636,
                        "gold_num_percent": 24,
                        "is_win": 1,
                        "item_ids": [
                            0,
                            3046,
                            6672,
                            3155,
                            3026,
                            3006,
                            3364
                        ],
                        "kill_champion_num": 11,
                        "kill_minion_num": 180,
                        "kill_turret_num": 3,
                        "largest_killing_spree": 5,
                        "largest_multi_kill": 2,
                        "level": 14,
                        "magic_damage_2_champion": 2502,
                        "physical_damage_2_champion": 12018,
                        "pv_delta": 0,
                        "role_name": "yuyuKing",
                        "slol_id": "rwxy7VeZpKW",
                        "summon_spell_id": [
                            11,
                            4
                        ],
                        "team_id": 200,
                        "tier_name": "\u5927\u5e08",
                        "total_damage_2_champion": 16758,
                        "total_damage_2_champion_percent": 21,
                        "total_damage_dealt": 175283,
                        "total_damage_percent": 32,
                        "total_damage_taken": 25104,
                        "total_health": 14325,
                        "ward_killed_num": 4,
                        "ward_killed_pecent": 16,
                        "ward_placed_num": 6,
                        "ward_placed_pecent": 10
                    },
                    {
                        "assists_num": 16,
                        "barracks_killed": 0,
                        "battle_group_percent": 56,
                        "battle_tag_list": [
                            {
                                "name": "",
                                "tag_id": 2
                            }
                        ],
                        "champion_en_name": "Viktor",
                        "champion_id": 112,
                        "choose_position": 0,
                        "death_num": 4,
                        "game_score": 970,
                        "gold_num": 10086,
                        "gold_num_percent": 18,
                        "is_win": 1,
                        "item_ids": [
                            3067,
                            1082,
                            3108,
                            3113,
                            6653,
                            3111,
                            3340
                        ],
                        "kill_champion_num": 3,
                        "kill_minion_num": 169,
                        "kill_turret_num": 1,
                        "largest_killing_spree": 2,
                        "largest_multi_kill": 1,
                        "level": 15,
                        "magic_damage_2_champion": 18904,
                        "physical_damage_2_champion": 1389,
                        "pv_delta": 0,
                        "role_name": "1993y",
                        "slol_id": "zp0eea3d20V",
                        "summon_spell_id": [
                            21,
                            4
                        ],
                        "team_id": 200,
                        "tier_name": "\u738b\u8005",
                        "total_damage_2_champion": 20600,
                        "total_damage_2_champion_percent": 26,
                        "total_damage_dealt": 127517,
                        "total_damage_percent": 24,
                        "total_damage_taken": 14673,
                        "total_health": 4231,
                        "ward_killed_num": 4,
                        "ward_killed_pecent": 16,
                        "ward_placed_num": 8,
                        "ward_placed_pecent": 13
                    },
                    {
                        "assists_num": 14,
                        "barracks_killed": 1,
                        "battle_group_percent": 59,
                        "champion_en_name": "",
                        "champion_id": 523,
                        "choose_position": 0,
                        "death_num": 10,
                        "game_score": 870,
                        "gold_num": 12109,
                        "gold_num_percent": 21,
                        "is_win": 1,
                        "item_ids": [
                            3046,
                            6672,
                            1038,
                            3006,
                            1037,
                            1055,
                            3363
                        ],
                        "kill_champion_num": 6,
                        "kill_minion_num": 135,
                        "kill_turret_num": 1,
                        "largest_killing_spree": 2,
                        "largest_multi_kill": 2,
                        "level": 14,
                        "magic_damage_2_champion": 863,
                        "physical_damage_2_champion": 12376,
                        "pv_delta": 0,
                        "role_name": "b\u7ad9\u9648\u76f4\u76f4",
                        "slol_id": "Eg3VaoY",
                        "summon_spell_id": [
                            7,
                            4
                        ],
                        "team_id": 200,
                        "tier_name": "\u5b97\u5e08",
                        "total_damage_2_champion": 15059,
                        "total_damage_2_champion_percent": 19,
                        "total_damage_dealt": 91310,
                        "total_damage_percent": 17,
                        "total_damage_taken": 19928,
                        "total_health": 4016,
                        "ward_killed_num": 2,
                        "ward_killed_pecent": 8,
                        "ward_placed_num": 8,
                        "ward_placed_pecent": 13
                    },
                    {
                        "assists_num": 14,
                        "barracks_killed": 0,
                        "battle_group_percent": 47,
                        "champion_en_name": "Zilean",
                        "champion_id": 26,
                        "choose_position": 0,
                        "death_num": 8,
                        "game_score": 510,
                        "gold_num": 7609,
                        "gold_num_percent": 13,
                        "is_win": 1,
                        "item_ids": [
                            3853,
                            3108,
                            2420,
                            3158,
                            3067,
                            4005,
                            3364
                        ],
                        "kill_champion_num": 2,
                        "kill_minion_num": 24,
                        "kill_turret_num": 0,
                        "largest_killing_spree": 0,
                        "largest_multi_kill": 1,
                        "level": 13,
                        "magic_damage_2_champion": 7051,
                        "physical_damage_2_champion": 934,
                        "pv_delta": 0,
                        "role_name": "T5\u6253\u91ce\u7f62\u4e86",
                        "slol_id": "1OEYE2l",
                        "summon_spell_id": [
                            14,
                            4
                        ],
                        "team_id": 200,
                        "tier_name": "\u738b\u8005",
                        "total_damage_2_champion": 8581,
                        "total_damage_2_champion_percent": 11,
                        "total_damage_dealt": 30405,
                        "total_damage_percent": 6,
                        "total_damage_taken": 16034,
                        "total_health": 4376,
                        "ward_killed_num": 10,
                        "ward_killed_pecent": 40,
                        "ward_placed_num": 36,
                        "ward_placed_pecent": 57
                    }
                ],
                "death_num": 27,
                "gold_num": 57193,
                "is_win": 1,
                "kill_baron_num": 0,
                "kill_dragon_num": 0,
                "kill_num": 34,
                "kill_turret_num": 7,
                "team_id": 200,
                "ward_percent": 49
            }
        },
        "dst_slol_id": "zp0eea3d20V",
        "game_id": 26,
        "req_slol_id": "zp0eea3d20V",
        "result": 0
    },
    "msg": "succ"
}

const champs_JSON = {
    "1": "Annie",
    "2": "Olaf",
    "3": "Galio",
    "4": "TwistedFate",
    "5": "XinZhao",
    "6": "Urgot",
    "7": "Leblanc",
    "8": "Vladimir",
    "9": "Fiddlesticks",
    "10": "Kayle",
    "11": "MasterYi",
    "12": "Alistar",
    "13": "Ryze",
    "14": "Sion",
    "15": "Sivir",
    "16": "Soraka",
    "17": "Teemo",
    "18": "Tristana",
    "19": "Warwick",
    "20": "Nunu",
    "21": "MissFortune",
    "22": "Ashe",
    "23": "Tryndamere",
    "24": "Jax",
    "25": "Morgana",
    "26": "Zilean",
    "27": "Singed",
    "28": "Evelynn",
    "29": "Twitch",
    "30": "Karthus",
    "31": "Chogath",
    "32": "Amumu",
    "33": "Rammus",
    "34": "Anivia",
    "35": "Shaco",
    "36": "DrMundo",
    "37": "Sona",
    "38": "Kassadin",
    "39": "Irelia",
    "40": "Janna",
    "41": "Gangplank",
    "42": "Corki",
    "43": "Karma",
    "44": "Taric",
    "45": "Veigar",
    "48": "Trundle",
    "50": "Swain",
    "51": "Caitlyn",
    "53": "Blitzcrank",
    "54": "Malphite",
    "55": "Katarina",
    "56": "Nocturne",
    "57": "Maokai",
    "58": "Renekton",
    "59": "JarvanIV",
    "60": "Elise",
    "61": "Orianna",
    "62": "MonkeyKing",
    "63": "Brand",
    "64": "LeeSin",
    "67": "Vayne",
    "68": "Rumble",
    "69": "Cassiopeia",
    "72": "Skarner",
    "74": "Heimerdinger",
    "75": "Nasus",
    "76": "Nidalee",
    "77": "Udyr",
    "78": "Poppy",
    "79": "Gragas",
    "80": "Pantheon",
    "81": "Ezreal",
    "82": "Mordekaiser",
    "83": "Yorick",
    "84": "Akali",
    "85": "Kennen",
    "86": "Garen",
    "89": "Leona",
    "90": "Malzahar",
    "91": "Talon",
    "92": "Riven",
    "96": "KogMaw",
    "98": "Shen",
    "99": "Lux",
    "101": "Xerath",
    "102": "Shyvana",
    "103": "Ahri",
    "104": "Graves",
    "105": "Fizz",
    "106": "Volibear",
    "107": "Rengar",
    "110": "Varus",
    "111": "Nautilus",
    "112": "Viktor",
    "113": "Sejuani",
    "114": "Fiora",
    "115": "Ziggs",
    "117": "Lulu",
    "119": "Draven",
    "120": "Hecarim",
    "121": "Khazix",
    "122": "Darius",
    "126": "Jayce",
    "127": "Lissandra",
    "131": "Diana",
    "133": "Quinn",
    "134": "Syndra",
    "136": "AurelionSol",
    "141": "Kayn",
    "142": "Zoe",
    "143": "Zyra",
    "145": "Kaisa",
    "147": "Seraphine",
    "150": "Gnar",
    "154": "Zac",
    "157": "Yasuo",
    "161": "Velkoz",
    "163": "Taliyah",
    "164": "Camille",
    "201": "Braum",
    "202": "Jhin",
    "203": "Kindred",
    "222": "Jinx",
    "223": "TahmKench",
    "235": "Senna",
    "236": "Lucian",
    "238": "Zed",
    "240": "Kled",
    "245": "Ekko",
    "246": "Qiyana",
    "254": "Vi",
    "266": "Aatrox",
    "267": "Nami",
    "268": "Azir",
    "350": "Yuumi",
    "360": "Samira",
    "412": "Thresh",
    "420": "Illaoi",
    "421": "RekSai",
    "427": "Ivern",
    "429": "Kalista",
    "432": "Bard",
    "497": "Rakan",
    "498": "Xayah",
    "516": "Ornn",
    "517": "Sylas",
    "518": "Neeko",
    "523": "Aphelios",
    "526": "Rell",
    "555": "Pyke",
    "777": "Yone",
    "875": "Sett",
    "876": "Lillia",
    "234": "Viego",
    "887": "Gwen",
    "166": "Akshan",
    "711": "Vex",
    "221": "Zeri",
    "888": "Renata Glasc"
}

const we_data2 = {
    "continue_lose": 1,
    "total_num": 364,
    "player_battle_brief_list": [
        {
            "game_mode_id": 4,
            "pv_delta": -175,
            "position": 0,
            "assist_num": 8,
            "battle_flags": [
                3
            ],
            "game_result": 2,
            "champion_id": 245,
            "game_score": 1220,
            "battle_time": 1608058808,
            "ext_tag_id": 7,
            "champion_en_name": "Ekko",
            "death_num": 3,
            "ext_tag_desc": "尽力局",
            "kill_num": 7,
            "game_mode_name": "单双排位",
            "battle_id": 91578380
        },
        {
            "game_mode_id": 4,
            "position": 0,
            "pv_delta": 287,
            "assist_num": 3,
            "game_result": 1,
            "champion_id": 245,
            "game_score": 1030,
            "battle_time": 1608026362,
            "ext_tag_id": 9,
            "champion_en_name": "Ekko",
            "death_num": 1,
            "ext_tag_desc": "碾压局",
            "kill_num": 6,
            "game_mode_name": "单双排位",
            "battle_id": 91565390
        },
        {
            "game_mode_id": 4,
            "position": 0,
            "pv_delta": -203,
            "assist_num": 8,
            "game_result": 2,
            "champion_id": 84,
            "game_score": 950,
            "battle_time": 1606638699,
            "ext_tag_id": 10,
            "champion_en_name": "Akali",
            "death_num": 3,
            "ext_tag_desc": "甩锅局",
            "kill_num": 3,
            "game_mode_name": "单双排位",
            "battle_id": 91193936
        },
        {
            "game_mode_id": 4,
            "pv_delta": -177,
            "position": 0,
            "assist_num": 1,
            "battle_flags": [
                3
            ],
            "game_result": 2,
            "champion_id": 517,
            "game_score": 880,
            "battle_time": 1606587622,
            "ext_tag_id": 10,
            "champion_en_name": "",
            "death_num": 3,
            "ext_tag_desc": "甩锅局",
            "kill_num": 3,
            "game_mode_name": "单双排位",
            "battle_id": 91201414
        },
        {
            "game_mode_id": 4,
            "position": 0,
            "pv_delta": -275,
            "assist_num": 0,
            "game_result": 2,
            "champion_id": 84,
            "game_score": 400,
            "battle_time": 1606569239,
            "ext_tag_id": 2,
            "champion_en_name": "Akali",
            "death_num": 6,
            "ext_tag_desc": "背锅局",
            "kill_num": 1,
            "game_mode_name": "单双排位",
            "battle_id": 91180250
        },
        {
            "game_mode_id": 4,
            "position": 0,
            "pv_delta": -261,
            "assist_num": 1,
            "game_result": 2,
            "champion_id": 126,
            "game_score": 460,
            "battle_time": 1606566739,
            "ext_tag_id": 2,
            "champion_en_name": "Jayce",
            "death_num": 7,
            "ext_tag_desc": "背锅局",
            "kill_num": 3,
            "game_mode_name": "单双排位",
            "battle_id": 91199717
        },
        {
            "game_result": 1,
            "pv_delta": 317,
            "battle_time": 1606564470,
            "kill_num": 10,
            "game_mode_name": "单双排位",
            "battle_id": 91169679,
            "game_mode_id": 4,
            "position": 0,
            "battle_flags": [
                1
            ],
            "champion_id": 246,
            "game_score": 1140,
            "champion_en_name": "",
            "assist_num": 4,
            "ext_tag_desc": "碾压局",
            "ext_tag_id": 9,
            "ext_tag_ids": [
                19
            ],
            "death_num": 1
        },
        {
            "game_mode_id": 4,
            "position": 0,
            "pv_delta": -282,
            "assist_num": 12,
            "game_result": 2,
            "champion_id": 44,
            "game_score": 380,
            "battle_time": 1606562111,
            "ext_tag_id": 2,
            "champion_en_name": "Taric",
            "death_num": 9,
            "ext_tag_desc": "背锅局",
            "kill_num": 2,
            "game_mode_name": "单双排位",
            "battle_id": 91179530
        },
        {
            "game_mode_id": 4,
            "position": 0,
            "pv_delta": -239,
            "assist_num": 4,
            "game_result": 2,
            "champion_id": 84,
            "game_score": 760,
            "battle_time": 1606559341,
            "ext_tag_id": 10,
            "champion_en_name": "Akali",
            "death_num": 6,
            "ext_tag_desc": "甩锅局",
            "kill_num": 5,
            "game_mode_name": "单双排位",
            "battle_id": 91169102
        },
        {
            "game_mode_id": 4,
            "position": 0,
            "battle_flags": [
                1
            ],
            "game_result": 1,
            "assist_num": 11,
            "game_score": 1250,
            "pv_delta": 311,
            "champion_id": 58,
            "battle_time": 1606556426,
            "death_num": 5,
            "champion_en_name": "Renekton",
            "kill_num": 8,
            "game_mode_name": "单双排位",
            "battle_id": 91178901
        }
    ],
    "result": 0,
    "next_index": 10,
    "continue_win": 0,
    "is_finish": 0,
    "game_id": 26,
    "area_id": 31,
    "weekly_report_status": {
        "report_new_flag": 0,
        "has_weekly_report": 0,
        "report_jump_url": "//act.tgp.qq.com/wegame/newlolweekly/index.html"
    },
    "info_list": [
        {
            "logo_url": "",
            "use_num": 191,
            "win_rate": 63,
            "champion_id": 246,
            "used_exp": 56633
        },
        {
            "logo_url": "//down.qq.com/wegame_app/lolApp/img/champion/Talon.png",
            "use_num": 92,
            "win_rate": 60,
            "champion_id": 91,
            "used_exp": 44125
        },
        {
            "logo_url": "",
            "use_num": 47,
            "win_rate": 69,
            "champion_id": 164,
            "used_exp": 26904
        },
        {
            "logo_url": "",
            "use_num": 24,
            "win_rate": 34,
            "champion_id": 517,
            "used_exp": 21892
        },
        {
            "logo_url": "//down.qq.com/wegame_app/lolApp/img/champion/Akali.png",
            "use_num": 23,
            "win_rate": 48,
            "champion_id": 84,
            "used_exp": 24592
        }
    ],
    "slol_id": "5m3EjQ4odvB",
    "msg": "succ",
    "code": 0,
    "data": {
        "total_time": 7703923,
        "recent_kda": 905,
        "tier": 0,
        "area_name": "峡谷之巅",
        "measure_unit": 0,
        "rank": 0,
        "skin_num": 61,
        "slol_id": "5m3EjQ4odvB",
        "champion_num": 114,
        "total_games": 1561,
        "game_logo_url": "//wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/usericon/3861.png",
        "game_level": 182,
        "area_id": 31,
        "gender": 0,
        "recent_win_rate": 44,
        "power_value": 91873,
        "recent_total_games": 71,
        "league_point": 1102,
        "total_kill": 16636,
        "game_id": 26,
        "result": 0,
        "total_assist": 12503,
        "role_name": "2020LYAMO1",
        "win_rate": 53,
        "online_zone_id": 0,
        "praise_time": 0,
        "total_placed": 16165,
        "recent_total_kill": 532,
        "game_age": 0,
        "online_status": 0,
        "all_champion_num": 153,
        "all_skin_num": 1155
    },
    "type": "profile-basic-reply"
}

const d = function (arguments) { return document.getElementsByClassName(arguments)[0]; }

const _rank = "../res/division/"
const _champ = "../res/champions/"
const _spell = "../res/summonability/"
const _item = "../res/items/"
const _opgg = "//na.op.gg/champion/"

const rankJSON = {
    "0": "Challenger",
    "1": "Diamond",
    "2": "Platinum",
    "3": "Gold",
    "4": "Silver",
    "5": "Bronze",
    "6": "Master",
    "7": "Grandmaster",
    "8": "Iron"
}

const singleDivision = [0, 6, 7]

function getAsset(url, id) {
    return (url + id + ".png")
}

function formatGold(gold){
    return (gold/1000).toFixed(1) + "K"
}

function gameLengthHR(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? "m" : "m ") : "";
    const sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay
}

function sinceGame(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    //sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + " ago"
}

function populatePlayerCard(jdata) {
    //Profile Top Left Picture and Win Rate
    document.getElementsByClassName("MostChampionContent tabItem overview-stats--all")[0].innerHTML = ""
    p_slol_id = jdata.slol_id
    player_name = jdata.data.role_name
	if(!rankJSON[jdata.data.tier]){
		d("TierRank").innerText = "Unranked"
	} else {
		d("TierRank").innerText = rankJSON[jdata.data.tier] + ` ${parseInt(jdata.data.rank + 1)}`
	}
    
    d("LeaguePoints").innerText = `${jdata.data.league_point} LP`
    d("winratio").innerText = "Win Ratio " + jdata.data.win_rate + "%"
    d("Username").innerText = jdata.data.role_name
    document.getElementById("rank-metal").src = getAsset(_rank, jdata.data.tier + "_" + jdata.data.rank)
}

function populateMostPlayed(jdata) {
    //Most Played
    for (let z = 0; z < Object.keys(jdata.info_list).length; z++) {

        let en_name = champs_JSON[jdata.info_list[z].champion_id]
        let temp = document.querySelector("#most_played_template")
        let view = d("MostChampionContent");
        let startElement = temp.content.querySelector("div");

        let a = document.importNode(startElement, true);
        let f = function (arguments) { return a.getElementsByClassName(arguments)[0]; }

        let wr_played_box = f("Played")
        let container = f("ChampionBox Ranked")

        wr_played_box.getElementsByClassName("WinRatio normal tip")[0].innerText = jdata.info_list[z].win_rate + "%"
        wr_played_box.getElementsByClassName("Title")[0].innerText = jdata.info_list[z].use_num + " Played"

        container.getElementsByClassName("ChampionImage")[0].src = getAsset(_champ, jdata.info_list[z].champion_id)
        container.getElementsByClassName("Face")[0].getElementsByTagName("a")[0].href = _opgg + en_name + "/statistics"
        container.getElementsByClassName("Face")[0].title = en_name
        container.getElementsByClassName("ChampionName")[0].innerText = en_name
        container.getElementsByClassName("ChampionName")[0].title = en_name

        view.appendChild(a)
    }
}

function populateExpandedDetails(div, jdata) {

    let team_total_own = jdata.data.battle_info.team_data_own
    let team_total_opp = jdata.data.battle_info.team_data_opp

    //Match data to win or loss
    if (jdata.data.battle_info.team_data_own.is_win === 2) {
        team_total_own = jdata.data.battle_info.team_data_opp
        team_total_opp = jdata.data.battle_info.team_data_own
    }

    const team_data_own = team_total_own.battle_player_record
    const team_data_opp = team_total_opp.battle_player_record

    const summary_own = div.getElementsByClassName("kills victory-text1")[0].getElementsByTagName("span")
    const summary_opp = div.getElementsByClassName("kills defeat-text1")[0].getElementsByTagName("span")

    div.getElementsByClassName("victory-text4 cf bot")[0]
        .getElementsByTagName("span")[0].innerText = `${team_total_own.kill_num} / ${team_total_own.death_num} / ${team_total_own.assist_num}`

    div.getElementsByClassName("defeat-text4 cf bot")[0]
        .getElementsByTagName("span")[0].innerText = `${team_total_opp.kill_num} / ${team_total_opp.death_num} / ${team_total_opp.assist_num}`

    summary_own[0].innerText = team_total_own.kill_turret_num
    summary_own[1].innerText = team_total_own.kill_baron_num
    summary_own[2].innerText = team_total_own.kill_dragon_num

    summary_opp[0].innerText = team_total_opp.kill_turret_num
    summary_opp[1].innerText = team_total_opp.kill_baron_num
    summary_opp[2].innerText = team_total_opp.kill_dragon_num

    for (let i = 0; i < 5; i += 1) {

        let own_damage = team_data_own[i].total_damage_2_champion_percent
        let opp_damage = team_data_opp[i].total_damage_2_champion_percent

        let own_home = div.getElementsByClassName("victory-text1 cf")[i]
        let opp_home = div.getElementsByClassName("defeat-text1 cf")[i]

        let own_item_display = own_home.getElementsByClassName("c13")[0]
        let opp_item_display = opp_home.getElementsByClassName("c13")[0]

        let own_damage_bar = own_home.getElementsByClassName("bar")[0].getElementsByTagName("span")[0]
        let opp_damage_bar = opp_home.getElementsByClassName("bar")[0].getElementsByTagName("span")[0]

        let own_champ_icons = own_home.getElementsByClassName("c11")[0].getElementsByTagName("img")
        let opp_champ_icons = opp_home.getElementsByClassName("c11")[0].getElementsByTagName("img")

        let own_gold = own_home.getElementsByClassName("c18")[0].getElementsByTagName("span")[0]
        let opp_gold = opp_home.getElementsByClassName("c18")[0].getElementsByTagName("span")[0]

        let own_champ_lvl = own_home.getElementsByClassName("c11")[0].getElementsByTagName("span")[1]
        let opp_champ_lvl = opp_home.getElementsByClassName("c11")[0].getElementsByTagName("span")[1]

        let kill_percent_own = (((team_data_own[i].kill_champion_num + team_data_own[i].assists_num) / team_total_own.kill_num) * 100).toFixed(0)
        let kill_percent_opp = (((team_data_opp[i].kill_champion_num + team_data_opp[i].assists_num) / team_total_opp.kill_num) * 100).toFixed(0)

        own_home.getElementsByClassName("c12")[0].innerText = team_data_own[i].role_name
        opp_home.getElementsByClassName("c12")[0].innerText = team_data_opp[i].role_name

        own_home.getElementsByClassName("c12")[0].setAttribute("slol_id", team_data_own[i].slol_id)
        opp_home.getElementsByClassName("c12")[0].setAttribute("slol_id", team_data_opp[i].slol_id)

        own_damage_bar.setAttribute("style", `width:${team_data_own[i].total_damage_2_champion_percent * 2}%;`)
        opp_damage_bar.setAttribute("style", `width:${team_data_opp[i].total_damage_2_champion_percent * 2}%;`)

        own_damage_bar.innerText = team_data_own[i].total_damage_2_champion
        opp_damage_bar.innerText = team_data_opp[i].total_damage_2_champion

        div.getElementsByClassName("victory-text2 tooltip tooltipstered")[i].innerText = ` (${kill_percent_own}%)`
        div.getElementsByClassName("defeat-text2 tooltip tooltipstered")[i].innerText = ` (${kill_percent_opp}%)`

        own_home.getElementsByClassName("kill_d")[0].innerText = team_data_own[i].kill_champion_num
        own_home.getElementsByClassName("death_d")[0].innerText = team_data_own[i].death_num
        own_home.getElementsByClassName("assist_d")[0].innerText = team_data_own[i].assists_num

        opp_home.getElementsByClassName("kill_d")[0].innerText = team_data_opp[i].kill_champion_num
        opp_home.getElementsByClassName("death_d")[0].innerText = team_data_opp[i].death_num
        opp_home.getElementsByClassName("assist_d")[0].innerText = team_data_opp[i].assists_num

        //CS and Wards
        own_home.getElementsByClassName("c17")[0].getElementsByClassName("cs_num")[0].innerText = team_data_own[i].kill_minion_num + " CS"
        opp_home.getElementsByClassName("c17")[0].getElementsByClassName("cs_num")[0].innerText = team_data_opp[i].kill_minion_num + " CS"

        //Wards Placed | Wards Killed
        own_home.getElementsByClassName("c17")[0].getElementsByTagName("span")[0].innerText = team_data_own[i].ward_placed_num
        own_home.getElementsByClassName("c17")[0].getElementsByTagName("span")[1].innerText = team_data_own[i].ward_killed_num
        opp_home.getElementsByClassName("c17")[0].getElementsByTagName("span")[0].innerText = team_data_opp[i].ward_placed_num
        opp_home.getElementsByClassName("c17")[0].getElementsByTagName("span")[1].innerText = team_data_opp[i].ward_killed_num

        //Player Champ Icons
        own_champ_icons[0].src = getAsset(_champ, team_data_own[i].champion_id)
        opp_champ_icons[0].src = getAsset(_champ, team_data_opp[i].champion_id)

        //Player Sum Spells
        own_champ_icons[1].src = getAsset(_spell, team_data_own[i].summon_spell_id[0])
        own_champ_icons[2].src = getAsset(_spell, team_data_own[i].summon_spell_id[1])
        opp_champ_icons[1].src = getAsset(_spell, team_data_opp[i].summon_spell_id[0])
        opp_champ_icons[2].src = getAsset(_spell, team_data_opp[i].summon_spell_id[1])

        //Level
        own_champ_lvl.innerText = team_data_own[i].level
        opp_champ_lvl.innerText = team_data_opp[i].level

        //Gold
        own_gold.innerText = formatGold(team_data_own[i].gold_num)
        opp_gold.innerText = formatGold(team_data_opp[i].gold_num)

        //Items
        for (let z = 0; z <= 6; z += 1) {
            own_item_display.getElementsByTagName("img")[z].src = getAsset(_item, team_data_own[i].item_ids[z])
            opp_item_display.getElementsByTagName("img")[z].src = getAsset(_item, team_data_opp[i].item_ids[z])
        }
    }
    document.querySelectorAll('.c12').forEach(item => {
        item.addEventListener('click', event => {
            let username = event.path[0].innerText
            let slol_id = event.path[0].getAttribute("slol_id")
            console.log(username)
            requestMatchHistory_slol(slol_id, username);
        })
    })

}

function populateMatchHistory(jdata) {
    document.getElementsByClassName("GameItemWrap")[0].innerHTML = ""
    for (let z = 0; z < Object.keys(jdata.player_battle_brief_list).length; z++) {

        let match = jdata.player_battle_brief_list[z]
        let temp = document.querySelector("#match_history_item_template");
        let view = d("GameItemWrap");
        let startElement = temp.content.querySelector("div");
        let a = document.importNode(startElement, true);

        let f = function (arguments) { return a.getElementsByClassName(arguments)[0]; }

        //Main card data
        f("GameItem Win").setAttribute("id", match.battle_id)
        f("Kill").innerText = match.kill_num
        f("Death").innerText = match.death_num
        f("Assist").innerText = match.assist_num
        f("KDARatio").innerText = (((match.kill_num) + (match.assist_num)) / (match.death_num)).toFixed(2) + ":1 KDA"

        //MVP or ACE badge
        if (match.ext_tag_desc) {
            f("Badge").style.display = "block";
            f("Text MVP").innerText = match.ext_tag_desc
            if (match.game_result === 2) {
                f("Text MVP").style.backgroundColor = "#8c51c5";
                f("Text MVP").style.border = "#7f3590";
            }
        }

        //is loss
        if (match.game_result === 2) {
            f("GameItem Win").setAttribute("class", "GameItem Lose")
            f("GameResult").innerText = "Defeat"
        }

        let champ_id = match.champion_id
        let en_name = champs_JSON[champ_id]

        f("ChampionImage").getElementsByClassName("Image")[0].src = getAsset(_champ, champ_id)
        f("ChampionImage").getElementsByClassName("Image")[0].title = en_name
        f("ChampionImage").getElementsByTagName("a")[0].title = en_name
        f("ChampionImage").getElementsByTagName("a")[0].href = _opgg + en_name + "/statistics"
        f("ChampionName").getElementsByTagName("a")[0].innerText = champs_JSON[champ_id]
        f("Button MatchDetail").setAttribute("match_id", match.battle_id)

        //Request match details
        f("refresh_button_parent").addEventListener("click", function (caller) {
            let id = caller.path[1].getAttribute('match_id')
            if (caller.path[0].nodeName === "IMG") {
                id = caller.path[2].getAttribute('match_id')
            }
            console.log(id)
            requestMatchDetails(id)
        })

        //Detailed Popup/Expanded Details
        f("expand_button_parent").addEventListener("click", function (caller) {
            let icon = caller.path[0]
            let path = caller.path[7]

            if (caller.path[0].nodeName === "DIV") {
                icon = caller.path[0].getElementsByTagName("img")[0]
                path = caller.path[6]
            }

            //Collapse if the child elements already exist
            if (path.getElementsByClassName("s-m-b victory-bg2")[0]) {
                icon.style.transform = ""
                icon.style.paddingTop = "100%"
                icon.style.paddingBottom = ""
                let details_own = path.getElementsByClassName("s-m-b victory-bg2")[0]
                let details_opp = path.getElementsByClassName("s-m-b victory-bg2")[1]
                path.removeChild(details_own)
                path.removeChild(details_opp)
            }

            //Flip icon and create child element
            else {
                icon.style.transform = "rotate(180deg)"
                icon.style.paddingTop = ""
                icon.style.paddingBottom = "100%"

                let jDetailed = JSON.parse(localStorage.getItem(path.id))

                if (devMode)
                    jDetailed = game_details

                if (jDetailed.data.battle_info.team_data_own.is_win === 1) {
                    //Winner
                    let tempExt = document.querySelector("#detailed_match_win_template");
                    let expandedDetails = tempExt.content.cloneNode(true);
                    path.appendChild(expandedDetails)
                    //Loser
                    tempExt = document.querySelector("#detailed_match_lose_template");
                    expandedDetails = tempExt.content.cloneNode(true);
                    path.appendChild(expandedDetails)
                }
                else {
                    //Loser
                    let tempExt = document.querySelector("#detailed_match_lose_template");
                    let expandedDetails = tempExt.content.cloneNode(true);
                    path.appendChild(expandedDetails)
                    //Winner
                    tempExt = document.querySelector("#detailed_match_win_template");
                    expandedDetails = tempExt.content.cloneNode(true);
                    path.appendChild(expandedDetails)
                }
                populateExpandedDetails(path, jDetailed);
            }
        })
        view.appendChild(a)
    }
    document.querySelectorAll('.Link').forEach(item => {
        item.addEventListener('click', event => {
            let username = event.path[0].innerText
            let slol_id = event.path[0].getAttribute("slol_id")
            console.log(username)
            if (username != "...") {
                requestMatchHistory_slol(slol_id, username);
            }
        })
    })
}

function populateMatchDetails(div, jdata) {
    const team_data_opp = jdata.data.battle_info.team_data_opp.battle_player_record
    const team_data_own = jdata.data.battle_info.team_data_own.battle_player_record
    const team_div = div.getElementsByClassName("Team")[0]
    const opp_div = div.getElementsByClassName("Team")[1]

    for (let z = 0; z < Object.keys(team_data_own).length; z++) {

        team_div.getElementsByClassName("SummonerName")[z].getElementsByTagName("a")[0].innerText = team_data_own[z].role_name
        team_div.getElementsByClassName("SummonerName")[z].getElementsByTagName("a")[0].setAttribute("slol_id", team_data_own[z].slol_id)
        team_div.getElementsByClassName("ChampionImage")[z].getElementsByClassName("Image16")[0]
            .setAttribute("style", "content:url(" + getAsset(_champ, team_data_own[z].champion_id) + ")")

        opp_div.getElementsByClassName("SummonerName")[z].getElementsByTagName("a")[0].innerText = team_data_opp[z].role_name
        opp_div.getElementsByClassName("SummonerName")[z].getElementsByTagName("a")[0].setAttribute("slol_id", team_data_opp[z].slol_id)
        opp_div.getElementsByClassName("ChampionImage")[z].getElementsByClassName("Image16")[0]
            .setAttribute("style", "content:url(" + getAsset(_champ, team_data_opp[z].champion_id) + ")")

        if (team_data_own[z].role_name === player_name) {
            const our_player = team_data_own[z]
            const kp = ((our_player.kill_champion_num + our_player.assists_num) / (jdata.data.battle_info.team_data_own.kill_num) * 100)
            const csm = ((our_player.kill_minion_num) / (jdata.data.battle_info.duration / 60)).toFixed(1)
            const deltaT = Date.now() / 1000 - jdata.data.battle_info.stop_time_stamp

            team_div.getElementsByClassName("Summoner")[z].setAttribute("class", "Summoner Requester")

            div.getElementsByClassName("Image tip tpd-delegation-uid-1")[0].src = getAsset(_spell, our_player.summon_spell_id[0])
            div.getElementsByClassName("Image tip tpd-delegation-uid-1")[1].src = getAsset(_spell, our_player.summon_spell_id[1])
            div.getElementsByClassName("Level")[0].innerText = "Level " + our_player.level
            div.getElementsByClassName("CS tip tpd-delegation-uid-1")[0].innerText = (our_player.kill_minion_num) + ` (${csm}) CS`
            div.getElementsByClassName("CKRate tip")[0].innerText = parseInt(kp) + "%"
            div.getElementsByClassName("GameLength")[0].innerText = gameLengthHR(jdata.data.battle_info.duration)
            div.getElementsByClassName("_timeago")[0].innerText = sinceGame(deltaT)

            for (let i = 0; i <= 6; i++) {
                div.getElementsByClassName("ItemList")[0].getElementsByTagName("img")[i].src = getAsset(_item, our_player.item_ids[i])
            }
        }
    }
}

function loadLocalStoarge() {
    //Begin populate saved games from localstorage
    for (let i = 0; i < localStorage.length; i++) {
        if (!isNaN(localStorage.key(i))) {
            if (document.getElementById(localStorage.key(i))) {
                let div = document.getElementById(localStorage.key(i))
                let jdata = JSON.parse(localStorage.getItem(localStorage.key(i)))
                populateMatchDetails(div, jdata)
            }
        }
    }
}

function sendMessage(message) {
    parent.postMessage(message, '*');
    console.log("Send message: " + message)
}

function requestMatchDetails(matchid) {
    let request = {
        "type": "profile-detailedmatch",
        "slol_id": p_slol_id,
        "battle_id": matchid,
        "area_id": area_id
    }
    sendMessage(JSON.stringify(request))
}

function requestMatchHistory(user) {
    let request = {
        "type": "profile-basic",
        "name": user,
        "area_id": area_id
    }
    document.getElementById("user-input").value = user
    localStorage.setItem("searched_user", user)
    sendMessage(JSON.stringify(request))
}

function requestMatchHistory_slol(slol_id, uname) {
    let request = {
        "type": "profile-basic-slol-id",
        "slol_id": slol_id,
        "area_id": area_id
    }
    document.getElementById("user-input").value = uname
    localStorage.setItem("searched_user", uname)
    sendMessage(JSON.stringify(request))
}

function setRecent(jdata) {
    document.getElementById("recent_searches").innerHTML = ""
    if (localStorage.getItem("recent_users")) {
        let recent_users = localStorage.getItem("recent_users").split(",")
        for (i in recent_users) {
            console.log(recent_users[i])
            //Recent Searches
            let recent_item = document.createElement("li")
            recent_item.innerText = recent_users[i]
            let recent_item_a = document.createElement("a")
            recent_item_a.href = "#"
            recent_item.class = "recent_link"
            recent_item_a.appendChild(recent_item)
            recent_item_a.id = "recent_link"
            document.getElementById("recent_searches").appendChild(recent_item_a)
        }
        recent_users.push(jdata.role_name)
        let unique = [...new Set(recent_users)];
        if (unique.length > 3)
            unique = unique.slice(unique.length - 3, unique.length);
        localStorage.setItem("recent_users", unique.toString())
    }
    else {
        localStorage.setItem("recent_users", jdata.role_name);
    }
    document.querySelectorAll('#recent_link').forEach(item => {
        item.addEventListener('click', event => {
            let username = event.path[0].innerText
            console.log(username)
            requestMatchHistory(username);
        })
    })
}

function loading(bool) {
    if (bool) {
        document.getElementsByClassName("lds-ellipsis")[0].style.display = "inline-block"
    }
    else {
        document.getElementsByClassName("lds-ellipsis")[0].style.display = "none"
    }
}


//Page Event and OnLod functions.
document.getElementById("update-button").addEventListener("click", function () {
    requestMatchHistory(document.getElementById("user-input").value);
})

document.getElementById("areas").addEventListener("change", function () {
    area_id = parseInt(document.getElementById("areas").value.split(" ")[0])
    localStorage.setItem("area_id", area_id)
})

document.getElementById("clear-local-button").addEventListener("click", function () {
    window.localStorage.clear();
})

if (localStorage.getItem("last_profile")) {
    let last_profile = JSON.parse(localStorage.getItem("last_profile"))
    populatePlayerCard(last_profile)
    populateMatchHistory(last_profile)
    populateMostPlayed(last_profile)
    loadLocalStoarge()
}

if (devMode) {
    //sendMessage("loading");
    populateMatchHistory(we_data2)
    populateMostPlayed(we_data2)
}

if (localStorage.getItem("recent_users")) {
    recent_users = localStorage.getItem("recent_users").split(",")
    for (i in recent_users) {
        //Recent Searches
        let recent_item = document.createElement("li")
        recent_item.innerText = recent_users[i]
        let recent_item_a = document.createElement("a")
        recent_item_a.href = "#"
        recent_item.class = "recent_link"
        recent_item_a.appendChild(recent_item)
        recent_item_a.id = "recent_link"
        document.getElementById("recent_searches").appendChild(recent_item_a)
    }
    document.querySelectorAll('#recent_link').forEach(item => {
        item.addEventListener('click', event => {
            let username = event.path[0].innerText
            requestMatchHistory(username);
        })
    })
}

window.addEventListener('message', function (message) {
    console.log(message)
    if (message.origin != "//downthecrop.github.io") {
        try {
            JSON.parse(message.data)
        } catch (e) {
            console.log("Message isn't jdata")
            console.log(message.data)
            if (message.data === "loading") {
                loading(true)
            }
            if (message.data === "ticket-error") {
                loading(false)
                document.getElementsByClassName("GameItemWrap")[0].innerHTML = "<h1>Ticket Error</h1>"
            }
            if (message.data === "error-slol-id-not-found") {
                loading(false)
                document.getElementsByClassName("GameItemWrap")[0].innerHTML = "<h1>Player Not Found</h1>"
            }

        }
        let jMessage = JSON.parse(message.data)
        console.log("I got a message: " + message.data)
        if (jMessage.type === "profile-basic-reply") {
            loading(false)
            if ("player_battle_brief_list" in jMessage) {
                populatePlayerCard(jMessage)
                setRecent(jMessage.data)
                populateMatchHistory(jMessage)
                populateMostPlayed(jMessage)
                loadLocalStoarge()
                //Save JSON response to last_profile localstorage
                localStorage.setItem("last_profile", JSON.stringify(jMessage))
            }
            else {
                populatePlayerCard(jMessage)
                document.getElementsByClassName("GameItemWrap")[0].innerHTML = "<h1>Play found but no games on record</h1>"
            }
        }
        if (jMessage.type === "profile-detailedmatch-reply") {
            loading(false)
            const matchDiv = document.getElementById(jMessage.data.battle_info.battle_id)
            populateMatchDetails(matchDiv, jMessage)
            localStorage.setItem(jMessage.data.battle_info.battle_id, JSON.stringify(jMessage));
        }
    }
});

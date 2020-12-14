 $.OP.GG.tracker = {
	combine: {
		sendEvent: function(type, location, action, eventParams){
			// return;
			var amplitude = window.amplitude;

			if (type.indexOf('GA') !== -1) {
				if (eventParams) {
					for (var key in eventParams) {
						if ($.isNumeric(eventParams[key])) {
							ga('send', 'event', location, action, key, eventParams[key]);
						} else {
							console.log('value 값은 정수여야함');
						}
					}
				} else {
					ga('send', 'event', location, action);
				}
			}

			if (type.indexOf('Pixel') !== -1 && (typeof fbq === 'function')) {
				eventName = location + ' ' + action;
				if (eventName.length > 40) {
					eventName = "Fail Event";
					eventParams = {
						message: "Too Long Event Name",
						location: location,
						action: action
					}
				}
				fbq('trackCustom', eventName, eventParams);
			}

			if(type.indexOf('FB') !== -1) {
				var eventName = location + ' ' + action;
				Facebook.logEvent(eventName, eventParams);
			}

			if (type.indexOf('AMPLITUDE') !== -1 && !!amplitude) {
				amplitude.getInstance().logEvent('[' + location + ']' + ' ' + action, eventParams);
			}
		}
	},
	amplitude: {
		setUserProperties: function(userProps){
			appLogger.setUserProperties(userProps);
		}
	},
	inGamePlus: {
		track: function(eventType, props){
			$.OP.GG.tracker.combine.sendEvent(['AMPLITUDE'], 'Summoner-InGame', eventType, props);
		},
		visit: function(){
			$.OP.GG.tracker.inGamePlus.track('Visit');
		},
		visitUnique: function(){
			$.OP.GG.tracker.inGamePlus.track('Unique Visit');
		},
		changeViewType: function(props){
			$.OP.GG.tracker.inGamePlus.track('Change View Type', props);
		},
		checkMapDetail: function(props){
			$.OP.GG.tracker.inGamePlus.track('Check Map Detail', props);
		},
		summonerPageOpen: function(){
			$.OP.GG.tracker.inGamePlus.track('Open Summoner Page');
		},
		userPlayStyleCheck: function(){
			$.OP.GG.tracker.inGamePlus.track('Check User Playstyle');
		},
		userPlayStyleCheckDetail: function(props){
			$.OP.GG.tracker.inGamePlus.track('Check User Playstyle Detail', props);
		},
		buildCheck: function(){
			$.OP.GG.tracker.inGamePlus.track('Check Build');
		},
		buildChange: function(props){
			$.OP.GG.tracker.inGamePlus.track('Change Build', props);
		},
		changeLaneShow: function(){
			$.OP.GG.tracker.inGamePlus.track('Show Change Lane');
		},
		changeLaneSave: function(){
			$.OP.GG.tracker.inGamePlus.track('Save Change Lane');
		},
		changeLaneCancel: function(){
			$.OP.GG.tracker.inGamePlus.track('Cancel Change Lane');
		}
	},
	 urf: {
		 index: {
			 _track: function(action, props){
				 $.OP.GG.tracker.combine.sendEvent(['AMPLITUDE', 'FB', 'Pixel'], 'URF_Index', action, props);
			 },
			 visit: function(){
				 $.OP.GG.tracker.combine.sendEvent(['FB', 'Pixel'], 'URF_Index', 'Visit');
			 },
			 clkChampDetail: function(referral){
				 $.OP.GG.tracker.championStatistics.index._track('clkChampDetail', {
					 Referral: referral
				 });
			 }
		 },
		 detail: {
			 visit: function(){
				 $.OP.GG.tracker.combine.sendEvent(['FB', 'Pixel'], 'URF_Detail', 'Visit');
			 }
		 }
	 },
	championStatistics: {
		index: {
			_track: function(action, props){
				$.OP.GG.tracker.combine.sendEvent(['AMPLITUDE', 'FB', 'Pixel'], 'ChampStat-Index', action, props);
			},
			visit: function(){
				$.OP.GG.tracker.championStatistics.index._track('Visit');
			},
			openChampionPage: function(referral, position, trendType){
				$.OP.GG.tracker.championStatistics.index._track('OpenChampPage', {
					Referral: referral,
					Position: position,
					TrendType: trendType
				});
			}
		},
		detail: {
			_defaultProps: {},
			_track: function(action, props, subLocation){
				var location = 'ChampStat-Detail';
				if (!!subLocation) {
					location = location + "-" + subLocation;
				}
				$.OP.GG.tracker.combine.sendEvent(['AMPLITUDE', 'FB', 'Pixel'], location, action,
					$.extend({}, $.OP.GG.tracker.championStatistics.detail._defaultProps, props)
				);
			},
			setChampionInfo: function(championId, championName, position){
				$.OP.GG.tracker.championStatistics.detail._defaultProps = {
					ChampionId: championId,
					ChampionName: championName,
					Position: position.toUpperCase()
				};
				return true;
			},
			visit: function(){
				$.OP.GG.tracker.championStatistics.detail._track('Visit');
			},
			changePosition: function(changePosition){
				$.OP.GG.tracker.championStatistics.detail._track('Change Position', {
					ChPosition: changePosition
				});
			},
			scrollDown: function(){
				$.OP.GG.tracker.championStatistics.detail._track('ScrollDown');
			},
			openMasterPage: function(){
				$.OP.GG.tracker.championStatistics.detail._track('OpenMasterPage');
			},
			changeMatchupSummary: function(summaryType){
				if (event.type === 'load')
					return;

				$.OP.GG.tracker.championStatistics.detail._track('ChMatchupSummary', {
					SummaryType: summaryType
				});
			},
			changeKeystoneMastery: function(index){
				if (event.type === 'load')
					return;

				$.OP.GG.tracker.championStatistics.detail._track('ChKistonOrder', {
					index: index
				});
			},
			item: {
				visit: function(referral){
					$.OP.GG.tracker.championStatistics.detail._track('Visit', {
						Referral: referral
					}, 'Item');
				}
			},
			skill: {
				visit: function(referral){
					$.OP.GG.tracker.championStatistics.detail._track('Visit', {
						Referral: referral
					}, 'Skill');
				},
				changeSkillOrder: function(index){
					if (event.type === 'load')
						return;
					$.OP.GG.tracker.championStatistics.detail._track('ChSkillOrder', {
						Index: index
					}, 'Skill');
				}
			},
			rune: {
				visit: function(){
					$.OP.GG.tracker.championStatistics.detail._track('Visit', null, 'Rune');
				}
			},
			mastery: {
				visit: function(){
					$.OP.GG.tracker.championStatistics.detail._track('Visit', null, 'Mastery');
				},
				changeKistonOrder: function(index){
					if (event.type === 'load')
						return;

					$.OP.GG.tracker.championStatistics.detail._track('ChKistonOrder', {
						Index: index
					}, 'Mastery');
				}
			},
			trend: {
				visit: function(){
					$.OP.GG.tracker.championStatistics.detail._track('Visit', null, 'Trend');
				}
			},
			tip: {
				visit: function(){
					$.OP.GG.tracker.championStatistics.detail._track('Visit', null, 'Tip');
				}
			},
			matchUp: {
				visit: function(){
					$.OP.GG.tracker.championStatistics.detail._track('Visit', null, 'MatchUp');
				},
				changeGraph: function(graphType){
					if (event.type === 'load')
						return;
					$.OP.GG.tracker.championStatistics.detail._track('ChGraph', {
						GraphType: graphType
					}, 'MatchUp');
				},
				changeVSChampion: function(filter){
					$.OP.GG.tracker.championStatistics.detail._track('ChVSChamp', {
						Filter: filter
					}, 'MatchUp');
				}
			}
		}
	}
};
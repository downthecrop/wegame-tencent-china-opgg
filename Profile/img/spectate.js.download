$.OP.GG.spectate = {
	showRuneMastery: function(btn, summonerId){
		var row = $(btn).closest('tr'),
			rowID = row.attr('id'),
			nextRowId = 'nextRow-' + rowID;

		// 이미 룬마스터리 표시하는 창이 떠있을 경우 지워줌
		var findNextRowId = $("#" + nextRowId);
		if (findNextRowId.length > 0) {
			findNextRowId.remove();
			return;
		}

		// 다른 룬마스터리를 모두 지워줌
		$(".Row.RuneMasteryRow").remove();

		// 룬마스터리 띄워줌
		var maximumColspanSize = row.is(':first-child') == false ? row.find('td').length + 1 : row.find('td').length,
			nextRow = $("<tr><td></td></tr>")
				.attr('id', nextRowId).attr('class', 'Row RuneMasteryRow'),
			nextRowCell = nextRow.find('td')
				.attr('colspan', maximumColspanSize).attr('class', 'Cell');

		row.after(nextRow);

		var setHTML = function(html){
			nextRowCell.html(html);
		};

		var doClose = function(){
			nextRow.remove();
		};

		setHTML($.OP.GG.common.makeCenteredTableLoader('black', 100));

		$.OP.GG.ajax.getHTML({
			url: '/summoner/ajax/popupRuneMastery3/',
			data: {
				summonerId: summonerId
			},
			callback: {
				onHTML: function(html){
					setHTML(html);
				},
				onError: function(error){
					setHTML("<div class='ErrorMessage'>" + error + "</div>");
				}
			}
		});

		return false;
	},
	showMobileRuneMastery: function(summonerId){
		$.OP.GG.util.blockBodyScroll(function(end){
			$.OP.GG.common.dim({
				hideCloseButton: true,
				onClose: function(){
					end();
				},
				job: function(setHTML, doClose){
					$.OP.GG.ajax.getHTML({
						url: '/summoner/ajax/popupRuneMastery3/',
						data: {
							summonerId: summonerId
						},
						callback: {
							onHTML: function(html){
								setHTML(html);
							},
							onError: function(error){
								alert(error);
								doClose();
							}
						}
					});
				}
			});
			//});
			//
			//$.OP.GG.ajax.getHTML({
			//	url: '/summoner/ajax/popupRuneMastery3/',
			//	data: {
			//		summonerId: summonerId
			//	},
			//	callback: {
			//		onHTML: function(html){
			//			setHTML(html);
			//		},
			//		onError: function(error){
			//			setHTML("<div class='ErrorMessage'>" + error + "</div>");
			//		}
			//	}
			//});
		});
		return false;
	},
	setLOLDirectory: function(btn){
		var preset = $.cookie('loldirectory');
		if (!preset || preset == 'undefined' || typeof preset == 'undefined') {
			preset = '';
		}
		var dir = prompt(_L('SPECTATE_SETLOLDIRECTORY_PROMPT'), preset);

		if (dir != null) {
			dir = dir.replace(/^\"(.*?)\"$/, '$1');
			dir = dir.replace(/\//g, '\\');
			dir = dir.replace(/\\$/, '');
			dir = dir.replace(/\\RADS$/, '');

			$.cookie('loldirectory', dir, {expires: 365, path: '/'});
			var setted = $.cookie('loldirectory');
			if (setted && setted != 'undefined') {
				alert(_L('SPECTATE_SETLOLDIRECTORY_SETTED', '', {
					directoryPath: setted
				}));
			} else {
				alert(_L('SPECTATE_SETLOLDIRECTORY_REMOVED'));
			}
		}
		return false;
	},
	requestRecording: function(btn, gameId){
		var oRecording = $(btn).closest('.Recording');

		$(btn).startLoading({
			maxHeight: 11
		});

		var setHTML = function(html){
			oRecording.html(html);
		};

		$.OP.GG.ajax.getHTML({
			url: '/summoner/ajax/requestRecording/',
			data: {
				gameId: gameId
			},
			callback: {
				onHTML: function(html){
					setHTML(html);
				},
				onError: function(error){
					alert(error);
				},
				onFinal: function(){
					$(btn).stopLoading();
				}
			}
		});
	}
};
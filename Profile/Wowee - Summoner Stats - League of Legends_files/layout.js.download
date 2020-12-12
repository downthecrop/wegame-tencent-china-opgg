$(function(){
	// 헤더 고정. 성능에 영향 미치므로 IE11 이상만
	// if (!(BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 10)) {
	// 	setTimeout(function(){
	// 		var eHeaderScrollFix = $(".headerScrollFix");
	// 		eHeaderScrollFix.scrollToFixed({
	// 			//preFixed: function(){
	// 			//	$(this).addClass('isLocked');
	// 			//},
	// 			//postFixed: function(){
	// 			//	$(this).removeClass('isLocked');
	// 			//}
	// 		});
	// 	}, 500);
	// }

	var dynamicDateTimeout = null;
	var refreshDynamicDate = function(){
		if (dynamicDateTimeout == null) {
			clearTimeout(dynamicDateTimeout);
		}
		dynamicDateTimeout = setTimeout(function(){
			//$.OP.GG.UI.dynamicDate.refreshDocumentDate();
			$.OP.GG.UI.dynamicDate.assignNewCountTime();
			dynamicDateTimeout = null;
		}, 100);
	};

	Tipped.delegate('.tip', {
		radius: false,
		behavior: 'hide',
		maxWidth: 320,
		fadeIn: 0,
		fadeOut: 0,
		position: 'top'
	});

	$.tablesorter.addParser({
		// set a unique id
		id: 'value',
		is: function(s, table, cell){
			return false;
		},
		format: function(s, table, cell, cellIndex){
			return $(cell).data('value');
		},
		type: 'numeric'
	});

	var refreshTableSorter = function(){
		$(".sortable").tablesorter({
			sortInitialOrder: "desc",
			headers: {
				0: {sortInitialOrder: 'asc'},
			},
			widgets: ["columns"],
			widgetOptions: {
				columns: ["sorted", "sorted", "sorted", "sorted", "sorted"]
			},
			/**
			 * tablesorter에서 data-value를 이용한 열에 대해서는 정렬 데이터로 사용 되지 않음.
			 * 별도로 textExtraction 옵션을 이용하여 data-value도 정렬 데이터로 참고하도록 수정
			 */
			textExtraction: function(node){
				var text = $(node).text();
				var value = $(node).data('value');
				return (value != undefined) ? value : text;
			}
		});
	};

	// run init
	jcf.replaceAll();
	refreshDynamicDate();
	refreshTableSorter();
	$.OP.GG.util.clippable();

	// run ajax
	$(document).ajaxComplete(function(){
		$('.tabWrap:not(._recognized)').trigger('tabRecognize');
		// jcf.setOptions('Select', {
		// 	wrapNative: false,
		// 	wrapNativeOnMobile: false
		// });
		jcf.replaceAll();
		refreshDynamicDate();
		refreshTableSorter();
		$.OP.GG.util.clippable();
	});

	// 부하 위험.
	setInterval(function(){
		refreshDynamicDate();
	}, 60000);

	// 소환사 히스토리 및 즐겨찾기 발동
	$.OP.GG.common.SummonerHistory.History.loadList();
	$.OP.GG.common.SummonerHistory.Favorite.loadList();
	// $.OP.GG.sidebar.load();

	// 탭로딩하는거 구현
	$(document).on('tabRecognize', '.tabWrap:not(._recognized)', function(){
		var tab = $(this),
			tabHeaders = tab.find('.tabHeaders').first(),
			tabItems = tab.find('.tabItems').first();

		// 미리 준비된 탭 갯수와 동일한 컨텐츠 레이어들을 모두 가려줌.
		var doHideAllItems = function(){
			$(">.tabItem", tabItems).hide();
		};

		// 현재 활성화되지 않은 모든 메뉴들에서 active 클래스를 제거함.
		var doDeactiveAllItems = function(){
			$(">.tabHeader", tabHeaders).removeClass('active');
		};

		var clickCurrentActiveMenu = function(isForce){
			$(">.tabHeader.active", tabHeaders).trigger('click', isForce); // active 항목을 클릭해주는 효과.
		};

		$(this).on('refresh', function(){
			clickCurrentActiveMenu(true);
		});

		tab.addClass('_recognized');

		$(">.tabHeader", tabHeaders).on('click', function(evt, isForce){
			var self = this;
			$.OP.GG.util.keepScroll(function(keepScroll){
				doHideAllItems();
				doDeactiveAllItems();

				var showClass = $(self).data('tab-show-class'),
					showClassElement = $(".tabItem." + showClass, tab),
					showClassElementDataUrl = showClassElement.data("tab-data-url"),
					isLoadedAlready = (showClassElement.data('tab-is-loaded-already') == true),
					isAlwaysForceLoad = ($(self).data('tab-always-force-load') == true && evt.type != 'DOMContentLoaded'),
					spinnerClass = (showClassElement.data('tab-spinner-class') || 'black'),
					spinnerHeight = (showClassElement.data('tab-spinner-height') || 300);

				// isForce 가 있으면 이미 컨텐츠가 로드 됐음에도 불구하고 다시 로그함.
				if (isForce || isAlwaysForceLoad)
					isLoadedAlready = false;

				if (showClassElementDataUrl && !isLoadedAlready) {
					// 데이터 로딩 후 표현하는 코드
					var setHTML = function(html){
						showClassElement.html(html);
					};

					setHTML($.OP.GG.common.makeCenteredTableLoader(spinnerClass, spinnerHeight));

					$.OP.GG.ajax.getHTML({
						url: showClassElementDataUrl,
						callback: {
							onHTML: function(html){
								setHTML(html);
								keepScroll();
								showClassElement.data('tab-is-loaded-already', true);
							},
							onError: function(error){
								setHTML("<div style='padding: 5px; font-size: 11px; line-height: 140%; color: #777;'>" + error + "</div>");
								showClassElement.data('tab-is-loaded-already', null);
							},
							onFinal: function() {
								var isInGame = evt.delegateTarget.className.indexOf('inGame');
								var isPlus = false;
								if(evt.delegateTarget.children[1]) {
									isPlus = evt.delegateTarget.children[1].className === 'inGamePlusTag' ? true : false;
								}

								if(isInGame !== -1) {
									fbq('trackCustom', 'Summoner-InGame Visit', {isPlus: isPlus});
								}
							}
						}
					});
				}

				showClassElement.show();
				$(window).resize();

				$(self).addClass('active');
			});

			return false;
		});

		doHideAllItems(); // 먼저 모두 가려줌
		clickCurrentActiveMenu();
	});

	$(".tabWrap").trigger('tabRecognize');

	$.hideATLifeowner = function(obj){
		var date = new Date();
		// pass 30 minutes
		date.setTime(date.getTime() + (19 * 60 * 60 * 1000));

		$.cookie('atlw', 'hide', {
			expires: date,
			path: '/'
		});
		$(obj).closest(".AtLifeOwner").remove();
	};

	$("body .l-wrap").append("<div style='width: 1px; height: 1px;' class='adsbygoogle' id='adsense'></div>");

	setTimeout(function(){
		var ad = document.querySelector("#adsense");

		if (!ad || ad.length == 0 || ad.offsetHeight == 0) {
			ga('send', 'event', 'tracker', 'adblock', 'yes', {'nonInteraction': 1});

			// if (document.domain != 'www.op.gg') {
			// 	if ($.cookie('atlw') != 'hide') {
			// 		$.OP.GG.common.dim({
			// 			onClose: function(){
			// 				$.hideATLifeowner(this);
			// 			},
			// 			job: function(setHTML, doClose){
			// 				$(".DimmedBlock")[0].onclick = function(){
			// 					return false;
			// 				};
			// 				setHTML("<div class='AtLifeOwner'></div>");
			// 			}
			// 		});
			// 	} else {
			// 		// $("<div></div>")
			// 		// 	.addClass('AtLifeOwnerWrap')
			// 		// 	.html("<div class='AtLifeOwner'><a href='#' onclick='$(this).closest(\".AtLifeOwnerWrap\").remove(); return false' class='Close'>✕</a></div>")
			// 		// 	.css({
			// 		// 		position: 'fixed',
			// 		// 		left: 0,
			// 		// 		bottom: -400,
			// 		// 		zIndex: 9999999
			// 		// 	})
			// 		// 	.appendTo($("body"))
			// 		// 	.animate({
			// 		// 		bottom: 0
			// 		// 	});
			// 	}
			// }
		} else {
			ga('send', 'event', 'tracker', 'adblock', 'no', {'nonInteraction': 1});
		}
	}, 2000);
});
$.OP.GG.sidebar = {
    load: function() {
        var isClosed = $.OP.GG.sidebar._loadFromCookie();
        if (isClosed) {
            $("#SideBarToggleElement").removeClass('hasSideBar');
        } else {
            $("#SideBarToggleElement").addClass('hasSideBar');
        }
    },
    toggle: function() {
        var $sideBarToggleElement = $("#SideBarToggleElement");
        $sideBarToggleElement.toggleClass('hasSideBar');
        $.OP.GG.sidebar._saveToCookie();
        $(window).resize();

        if ($sideBarToggleElement.hasClass('hasSideBar')) {
            $(document.body).css({
                overflow: 'hidden',
                position: 'fixed',
                width: '100%',
                height: '100%'
            });
            if (_isMobile === true) {
                window.history.pushState(null, null, location.pathname);
                $(window).on('popstate', function() {
                    $.OP.GG.sidebar.toggle();
                });
            }
        } else {
            $(document.body).css({
                overflow: '',
                position: '',
                width: '',
                height: ''
            });
            if (_isMobile === true) {
                $(window).off('popstate');
            }
        }
        return false;
    },
    _loadFromCookie: function() {
        return ($.cookie('sideclosed') == 'true');
    },
    _saveToCookie: function() {
        var isOpened = $("#SideBarToggleElement").hasClass('hasSideBar');
        if (isOpened) {
            $.cookie('sideclosed', null);
        } else {
            $.cookie('sideclosed', 'true');
        }
    },
    ticker: {
        close: function(tickerElement) {
            tickerElement.addClass('closed');
        },
        open: function(tickerElement) {
            tickerElement.removeClass('closed');
        },
        toggle: function(tickerElement) {
            if (tickerElement.hasClass('closed')) {
                $.OP.GG.sidebar.ticker.open(tickerElement);
            } else {
                $.OP.GG.sidebar.ticker.close(tickerElement);
            }
        }
    },
    tool: {
        openWithTicker: function(oButton, tickerElement) {
            var oTools = $(oButton).closest('.Tools'),
                oTool = $(oButton).closest('.Tool'),
                isSelected = $(oButton).hasClass('selected'),
                oToolBox = $('.SideBarToolBox');

            if (isSelected) {
                $(oButton).removeClass('selected');
                oToolBox.html('');
                oToolBox.removeClass('filled');
                return false;
            }

            oTools.find('.Button').removeClass('selected');
            $(oButton).addClass('selected');

            var buttonPosition = oTool.position();

            oToolBox.html(tickerElement.outerHTML());
            oToolBox.addClass('filled');
            oToolBox.css({top: buttonPosition.top - 1});

            oToolBox.find('.Ticker').removeClass('closed');

            return true;
        }
    }
};

var mobile = {
  appStore:
    "https://itunes.apple.com/kr/app/op-gg-%EC%98%A4%ED%94%BC%EC%A7%80%EC%A7%80/id605722237?mt=8",
  playStore:
    "https://play.google.com/store/apps/details?id=gg.op.lol.android&referrer=utm_source%3Dadblock%26utm_medium%3Dbanner",
  isIOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
  },
  isAndroid: function() {
    return navigator.userAgent.match(/Android/i) ? true : false;
  },
  goToMarket: function() {
    window.location = mobile.isIOS() ? mobile.appStore : mobile.playStore;
  },
  goToPlayStore: function(url) {
    window.open(url || mobile.playStore, "_blank");
  },
  goToAppStore: function() {
    window.open(mobile.appStore, "_blank");
  }
};

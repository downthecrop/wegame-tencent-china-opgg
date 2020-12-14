/**
 * @description Detect Adblock.
 * @date 2018.11.01
 * @author Taesu Hyeon
 */
var detectAds = {
  /**
   * @description Adblock 동작을 체크하기 위한 함정 Element를 body태그에 숨겨서 삽입한다.
   */
  init: function() {
    var element = document.createElement("div");

    element.id = "adsense";
    element.classList.add("adsbygoogle");
    element.style.width = "1px";
    element.style.height = "1px";
    element.style.backgroundColor = "transparent";
    element.style.display = "none";
    document.body.appendChild(element);
  },
  /**
   * @description Adblock이 enable인지 판단하여 callback함수를 실행하는 함수
   * @param {number} time callback function 실행 시간(ms) / default 2000ms
   * @param {function} callback callback function(value)에 true/false return value넘겨준다.
   */
  isEnableAdblock: function(callback, time) {
    var defaultTime = 2000;
    time = time ? time : defaultTime;

    setTimeout(function() {
      var ad = document.querySelector("#adsense");
      var adblockCondition = !ad || ad.length == 0 || ad.offsetHeight == 0;

      callback(adblockCondition);
      // console.log(!ad || ad.length == 0 || ad.offsetHeight == 0 ? true : false);
    }, time);
  },
  insertAds: function(targetDOM, size, className) {
    $.OP.GG.ajax.getHTML({
      url: "/opggNotice/ajax/content/",
      data: {
        size: size,
        className: className,
      },
      callback: {
        onHTML: function(html) {
          targetDOM.append(html)
        },
        onError: function(message) {
          alert(message);
        },
        onFinal: function() {}
      }
    });
  }
};

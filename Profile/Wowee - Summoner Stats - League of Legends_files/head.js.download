// jQuery 가 로딩되지 않은 페이지에서 $(function(){}) 을 쓰더라도 로딩 가능하게 함.

var $loadEvent = [];
var $ = function(cb){
	$loadEvent.push(cb);
};
window.onload = function(){
	if ($loadEvent.length > 0) {
		for (var i in $loadEvent) {
			if (!$loadEvent.hasOwnProperty(i))
				continue;

			$loadEvent[i]();
		}
	}
};

_i18n = {
	stringList: [],
	getString: function(key, string){
		return ( _i18n.stringList[key] ? _i18n.stringList[key] : (string ? string : key));
	}
};
_L = function(key, string, argv){
	var str = _i18n.getString(key, string);
	str = str.replace(/\{\{(.+?)\}\}/g, function(entire, key){
		if (argv[key]) return argv[key];
		return entire;
	});
	return str;
};
_isMobile = false;
var initFCM = function() {
  var config = {
    apiKey: "AIzaSyCoC_v5HhQdmnrHIbaBHmXuVq_n8dL5-ws",
    projectId: "opgg-app",
    messagingSenderId: "115916307426"
  };

  firebase.initializeApp(config);

  var messaging = firebase.messaging();

  messaging.requestPermission().then(function () {
    messaging.getToken().then(function (currentToken) {
      if (currentToken) {
        var _ot = '';
        var value = "; " + document.cookie;
        var parts = value.split("; " + '_ot' + "=");
        if (parts.length == 2) {
          _ot = parts.pop().split(";").shift();
        }

        var headers = {
          "X-OPGG-OCM-Service": 'OCMAPI-243ACA75-E271-4B47-AEC0-0551DAF56B94',
          "Content-Type": "application/json"
        };

        if (_ot) {
          headers['X-OCM-Access-Token'] = 'Bearer ' + _ot;
        }

        $.ajax({
          type: 'POST',
          url: "https://ocm-api.op.gg/ocm/v1/token",
          data: JSON.stringify({
            "country": fcmRegion,
            "token": currentToken,
            "topics": [
              "LOL"
            ],
            "type": "WEB"
          }),
          headers: headers,
          crossDomain: true,
          success: function (data) {
            // console.log(data);
          },
          fail: function (err) {
            console.log(err);
          }
        });
      } else {
        console.log('No Instance ID token available. Request permission to generate one.');
      }
    }).catch(function (err) {
      console.log('An error occurred while retrieving token. ', err);
    });
  }).catch(function (err) {
    console.log('Unable to get permission to notify.', err);
  });
};

if(typeof firebase === 'object') {
  initFCM();
} else {
  setTimeout(function() {
    initFCM();
  }, 3000);
}


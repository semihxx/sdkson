// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
  Displays a notification with the current time. Requires "notifications"
  permission in the manifest file (or calling
  "Notification.requestPermission" beforehand).
*/ 

var user_id = 0;
var web = localStorage.web;
function init(){
  // Conditionally initialize the options.
  if (!localStorage.isInitialized) {
    localStorage.isActivated = true;   // The display activation.
    localStorage.frequency = 1;        // The display frequency, in minutes.
    localStorage.isInitialized = true; // The option initialization.
    localStorage.user_id = 0;
  }

  // Test for notification support.
  if (window.Notification) {
    // While activated, show notifications at the display frequency.
    if (JSON.parse(localStorage.isActivated)) { show(); count(user_id) }

    var interval = 0; // The display interval, in minutes.

    setInterval(function() {
      interval++;

      if (
        JSON.parse(localStorage.isActivated) &&
          localStorage.frequency <= interval
      ) {
        show();
        interval = 0;
      }
    }, 60000);
  }
}
function giris_yap() {

    var xhr = new XMLHttpRequest();

    xhr.open("POST", web + "/crmlogin", true);

    var params = 'username=' + localStorage.adi + 
                 '&password=' + localStorage.sifre;
    params = params.replace(/%20/g, '+');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var resp = JSON.parse(xhr.responseText);
          user_id = resp;
          localStorage.user_id = resp;
          init();
        }
      }
    xhr.send(params);

}
giris_yap();
var query = web + "/api/personalmission/";
function count() {
  var xhr = new XMLHttpRequest();

  xhr.open("GET",  query + user_id +'?state=pendingCount', true);

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          var resp = JSON.parse(xhr.responseText);
          chrome.browserAction.setBadgeText({text: ""+resp});
        }
      }
    xhr.send();
      
}

function show() {
  var xhr = new XMLHttpRequest();


   xhr.open("GET",  query + user_id + "?date=" + localStorage.frequency + "&state=last", true);
        console.log(xhr);

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {

          // JSON.parse does not evaluate the attacker's scripts.
          var resp = JSON.parse(xhr.responseText);
          var len = resp.length;
          count(user_id);
          for (var i = len-1; i >= 0; i--) {

            var time = /(..)(:..)/.exec(resp[i].updated_at);     // The prettyprinted time.
            var hour = time[1];               // The prettyprinted hour.


            /*var opt = {
                type: "basic",
                title: resp[i].prname ,
                message: resp[i].name,
                iconUrl: "128.png",
                priority: 2,
                buttons: [
                  { title: "Görev Sorumlusu: " + resp[i].pname + "  |  Saat: "+ hour + time[2]}
                ]
            }
            chrome.notifications.create("id"+date, opt, function(){
                setTimeout(function() {
                  chrome.notifications.clear("id"+date, function(wasCleared) {
                  });
                }, 60000);
            });*/
            
            new Notification(resp[i].prname + " | " + hour + time[2], {
              icon: '128.png',
              body: resp[i].name + " / " + resp[i].pname
            });

          };
          
        }
      }
    xhr.send();
      

}




// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
  Grays out or [whatever the opposite of graying out is called] the option
  field.
*/
function ghost(isDeactivated) {
  options.style.color = isDeactivated ? 'graytext' : 'black';
                                              // The label color.
  options.frequency.disabled = isDeactivated; // The control manipulability.
}


function giris_yap() {

    var xhr = new XMLHttpRequest();

    xhr.open("POST", localStorage.web + "/crmlogin", true);

    var params = 'username=' + localStorage.adi + 
                 '&password=' + localStorage.sifre;
    params = params.replace(/%20/g, '+');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var resp = JSON.parse(xhr.responseText);
          user_id = resp;
          localStorage.user_id = resp;
        }
      }
    xhr.send(params);

}
window.addEventListener('load', function() {

options.adi.value = localStorage.adi;
options.sifre.value = localStorage.sifre;
options.web.value = localStorage.web;
  // Initialize the option controls.
  if (!localStorage.isInitialized) {
    localStorage.isActivated = true;   // The display activation.
    localStorage.frequency = 1;        // The display frequency, in minutes.
    localStorage.isInitialized = true; // The option initialization.
    localStorage.user_id = 0;
  }
  options.isActivated.checked = JSON.parse(localStorage.isActivated);
                                         // The display activation.
  options.frequency.value = localStorage.frequency;
                                         // The display frequency, in minutes.

  if (!options.isActivated.checked) { ghost(true); }

  // Set the display activation and frequency.
  options.isActivated.onchange = function() {
    localStorage.isActivated = options.isActivated.checked;
    ghost(!options.isActivated.checked);
  };

  options.frequency.onchange = function() {
    localStorage.frequency = options.frequency.value;
  };

  options.kaydet.onclick = function() {
    localStorage.adi = options.adi.value;
    localStorage.sifre = options.sifre.value;
    localStorage.web = options.web.value;
    giris_yap();
    return false;
  };

});

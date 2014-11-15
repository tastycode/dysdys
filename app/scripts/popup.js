'use strict';
;(function(_WIN, _DOC){
  var _BG;
  var _init = function(){
    console.log(">>onload: popup");
    _BG = chrome.extension.getBackgroundPage();
    _BG._func_toggle(true);
    
    _WIN.addEventListener("unload", function(){
      _BG._func_toggle(false);
    }, false);
  }
  _WIN.onload = _init;
})(window, document);

function save_options() {
  var enabled = document.getElementById('enabledOption').value;
  console.log('Saving');
  chrome.storage.sync.set({
    enabled: color,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      console.log('saved:');
      status.textContent = '';
      refresh();
    }, 750);
  });
}

function refresh() {
  chrome.storage.sync.get({
    enabled: true
  }, function(settings) {
    console.log('settings:', settings);
    document.getElementById('enabledOption').checked = settings.enabled;
  });
};
refresh();
document.addEventListener('DOMContentLoaded', refresh);
document.getElementById('enabledOption').addEventListener ("CheckboxStateChange", alert('x'));


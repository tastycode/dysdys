'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'ON'});
var _timer = null;
var _flg_opened = false;
var _func_toggle = function(flg){
  _flg_opened = flg;
  clearTimeout(_timer);
  _timer = setTimeout(function(){
    console.log(">>_flg_opened: "+ _flg_opened);

    chrome.storage.sync.set({
      enabled: !_flg_opened,
    }, function() {
      
    });

    if(_flg_opened){
      chrome.browserAction.setPopup({"popup": ""});
      chrome.browserAction.setBadgeText({text:"OFF"});
      chrome.browserAction.setTitle({"title": "NextClick: Close"});
      clearTimeout(_timer);
    }else{
      chrome.browserAction.setPopup({"popup": "popup.html"});
      chrome.browserAction.setBadgeText({text:"ON"});
      chrome.browserAction.setTitle({"title": "NextClick: OPEN"});
      clearTimeout(_timer);
    }
  }, 200);
};
;(function(_WIN, _DOC){
  var _init = function(){
    console.log(">>onload: background");
    _func_toggle(false);
  }
  _WIN.onload = _init
})(window, document);

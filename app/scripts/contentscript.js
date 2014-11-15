'use strict';

function attach() {
  var link = document.createElement("link");
  link.id = "dysdys";
  link.href = chrome.extension.getURL("styles/main.css");
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}

function detach() {
  var link = document.getElementById("dysdys");
  if (link) {
    link.parentNode.removeChild(link);
  }
};

chrome.storage.onChanged.addListener(function(changes, namespace) {
  refresh();
});

function refresh() {
  chrome.storage.sync.get({
    enabled: true
  }, function(settings) {
    if (settings.enabled) {
      attach();
    } else {
      detach();
    }
  });
};

refresh();


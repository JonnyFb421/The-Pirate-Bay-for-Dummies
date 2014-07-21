/*
//  background.js
//  Launches options.html when icon is pressed
*/

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.update({url: "http://thepiratebay.se/"});
});
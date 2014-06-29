/*
//  background.js
//  Launches background.html when icon is pressed
*/
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.update({url: "background.html"});
});
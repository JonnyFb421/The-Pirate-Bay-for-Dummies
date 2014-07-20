/*
//  background.js
//  Launches options.html when icon is pressed
*/

// Redirect to seeds descending 
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  chrome.tabs.update(sender.tab.id, {url: request.redirect});
});


chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.update({url: "http://thepiratebay.se/"});
});
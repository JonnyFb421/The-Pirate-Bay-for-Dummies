/*
//  background.js
//  Launches background.html when icon is pressed
*/

// Redirect to seeds descending
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.tabs.update({url: request.redirect});
  }
);

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.update({url: "options.html"});
});
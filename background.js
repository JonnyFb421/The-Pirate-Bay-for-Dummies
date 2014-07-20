/*
//  background.js
//  Launches options.html when icon is pressed
*/

// Redirect to seeds 
/*
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      chrome.tabs.update({url: "google.com", active: true});
    }
);
*/
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  chrome.tabs.getCurrent( function() {
    chrome.tabs.update({url: request.redirect});
  });
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.update({url: "http://thepiratebay.se/"});
});
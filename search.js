/*
//  search.js
//  This script listens to the search field on background.html
//  and redirects the tab to TPB with descending seed order
*/
window.onload = function() {
  document.getElementById("search").onchange = function() {
    search_query = document.getElementById("search").value;
    if (search_query == search_query) {
      tpbSeedDescendUrl = "http://thepiratebay.se/search/" + search_query + "/0/7/0";
      chrome.tabs.update({url: tpbSeedDescendUrl});
    } 
  }
}
function save_options() {
  var replaceMagnentVal = $('input:radio[name=replaceMagnent]:checked').val();
  var addCategoryImagesVal = $('input:radio[name=addCategoryImages]:checked').val();
  var changeSeedersLeechersStyleVal = $('input:radio[name=changeSeedersLeechersStyle]:checked').val();
  var changeSeasonVal = $('input:radio[name=changeSeason]:checked').val();
  var sortBySeedsDescendingVal = $('input:radio[name=sortBySeedsDescending]:checked').val();
  var removeNonTrustedVal = $('input:radio[name=removeNonTrusted]:checked').val();
  
  chrome.storage.local.set({
    replaceMagnent: replaceMagnentVal,
    addCategoryImages: addCategoryImagesVal,
    changeSeedersLeechersStyle: changeSeedersLeechersStyleVal,
    changeSeason: changeSeasonVal,
    sortBySeedsDescending: sortBySeedsDescendingVal,
    removeNonTrusted: removeNonTrustedVal
  }, function() {
    //Status Update (not like social media)
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

//Restore user's settings
function restore_options() { 
    //Default settings
  chrome.storage.local.get({
    replaceMagnent: 1,
    addCategoryImages: 1,
    changeSeedersLeechersStyle: 1,
    changeSeason: 1,
    sortBySeedsDescending: 1,
    removeNonTrusted: 1
  }, function(items) {
    $('input:radio[name=replaceMagnent][value='+ items.replaceMagnent +']').prop('checked', true);
    $('input:radio[name=addCategoryImages][value='+ items.addCategoryImages +']').prop('checked', true);
    $('input:radio[name=changeSeedersLeechersStyle][value='+ items.changeSeedersLeechersStyle +']').prop('checked', true);
    $('input:radio[name=changeSeason][value='+ items.changeSeason +']').prop('checked', true);
    $('input:radio[name=sortBySeedsDescending][value='+ items.sortBySeedsDescending +']').prop('checked', true);
    $('input:radio[name=removeNonTrusted][value='+ items.removeNonTrusted +']').prop('checked', true);
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
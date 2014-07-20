function thePirateBayForDummiesSettings() {
  function save_options() {
    var replaceMagnetVal = $('input:radio[name=replaceMagnet]:checked').val();
    var addCategoryImagesVal = $('input:radio[name=addCategoryImages]:checked').val();
    var changeSeedersLeechersStyleVal = $('input:radio[name=changeSeedersLeechersStyle]:checked').val();
    var changeSeasonVal = $('input:radio[name=changeSeason]:checked').val();
    var sortBySeedsDescendingVal = $('input:radio[name=sortBySeedsDescending]:checked').val();
    var removeNonTrustedVal = $('input:radio[name=removeNonTrusted]:checked').val();
    var removePornVal = $('input:radio[name=removePorn]:checked').val();
    
    chrome.storage.local.set({
      replaceMagnet: replaceMagnetVal,
      addCategoryImages: addCategoryImagesVal,
      changeSeedersLeechersStyle: changeSeedersLeechersStyleVal,
      changeSeason: changeSeasonVal,
      sortBySeedsDescending: sortBySeedsDescendingVal,
      removeNonTrusted: removeNonTrustedVal,  
      removePorn: removePornVal
    }, function() {
      //Status Update (not like social media)
      var status = document.getElementById('status');
      status.style.display = "block";
      console.log('apple');
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  //Restore user's settings
  function restore_options() { 
      //Default settings
    chrome.storage.local.get({
      replaceMagnet: 1,
      addCategoryImages: 1,
      changeSeedersLeechersStyle: 1,
      changeSeason: 1,
      sortBySeedsDescending: 1,
      removeNonTrusted: 0,
      removePorn: 0
    }, function(items) {
      $('input:radio[name=replaceMagnet][value='+ items.replaceMagnet +']').prop('checked', true);
      $('input:radio[name=addCategoryImages][value='+ items.addCategoryImages +']').prop('checked', true);
      $('input:radio[name=changeSeedersLeechersStyle][value='+ items.changeSeedersLeechersStyle +']').prop('checked', true);
      $('input:radio[name=changeSeason][value='+ items.changeSeason +']').prop('checked', true);
      $('input:radio[name=sortBySeedsDescending][value='+ items.sortBySeedsDescending +']').prop('checked', true);
      $('input:radio[name=removeNonTrusted][value='+ items.removeNonTrusted +']').prop('checked', true);
      $('input:radio[name=removePorn][value='+ items.removePorn +']').prop('checked', true);
    });
  }
  
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click', save_options);
}
thePirateBayForDummiesSettings();
/*
//  content.js
//  This script is responsible for altering the content displayed on TPB by
//  removing non-verified torrents and making torrents easier to read and download 
*/

//changeMemDigi Undecided if this should stay or go
chrome.storage.local.get({
  replaceMagnent: 1,
  addCategoryImages: 1,
  changeSeedersLeechersStyle: 1,
  changeSeason: 1,
  sortBySeedsDescending: 1,
  removeNonTrusted: 1
}, function(settings) {
  for (setting in settings) {
    if (settings.hasOwnProperty(setting)) {
      if (setting == "sortBySeedsDescending" && settings[setting] == true) {
        sortBySeedsDescending();
      } else if (setting == "addCategoryImages" && settings[setting] == true) {
        addCategoryImages();
      } else if (setting == "changeSeedersLeechersStyle" && settings[setting] == true) {
        changeSeedersLeechersStyle();
      } else if (setting == "changeSeason" && settings[setting] == true) {
        changeSeason();
      } else if (setting == "replaceMagnent" && settings[setting] == true) {
        replaceMagnent();
      } else if (setting == "removeNonTrusted" && settings[setting] == true) {
        removeNonTrusted();
      }
    }
  }
});


/** Changes URL to seeds descending */
function sortBySeedsDescending() {
  //There is a bug here when a new tab is opened.  Use API to select correct tab id.
  var url = window.location.href;
  var searchPattern = /(\/[0-9]+\/)(99)(\/[0-9])+/;
  var browsePattern = /browse\/[0-9]+$/;
  if (url.match(searchPattern)) {
    var newUrl = url.replace(searchPattern, "$17$3");
    chrome.runtime.sendMessage({redirect: newUrl}, function(response) {
    });
  } else if (url.match(browsePattern)) {
    var newUrl = url + "/0/7/0";
    chrome.runtime.sendMessage({redirect: newUrl}, function(response) {
    });
  }
}

/** Adds images to category section */
function addCategoryImages() {
  //Porn
  var imgPorn = chrome.extension.getURL("images/porn.png");
  //Games
  var imgGamesAndroid = chrome.extension.getURL("images/games_android.png");
  var imgGamesHandheld = chrome.extension.getURL("images/games_handheld.png");
  var imgGamesIos = chrome.extension.getURL("images/games_ios.png");
  var imgGamesMac = chrome.extension.getURL("images/games_mac.png");
  var imgGamesOther = chrome.extension.getURL("images/games_other.png");
  var imgGamesPc = chrome.extension.getURL("images/games_pc.png");
  var imgGamesPsx = chrome.extension.getURL("images/games_psx.png");
  var imgGamesWii = chrome.extension.getURL("images/games_wii.png");
  var imgGamesXbox = chrome.extension.getURL("images/games_xbox.png");
  //Video
  var imgVideoThreeD = chrome.extension.getURL("images/video_3d.png");
  var imgVideoClip = chrome.extension.getURL("images/video_clip.png");
  var imgVideoHdMovie = chrome.extension.getURL("images/video_hdmovie.png");
  var imgVideoHdTv = chrome.extension.getURL("images/video_hdtv.png");
  var imgVideoMovie = chrome.extension.getURL("images/video_movie.png");
  var imgVideoHandheld = chrome.extension.getURL("images/video_handheld.png");
  var imgVideoMusic = chrome.extension.getURL("images/video_music.png");
  var imgVideoOther = chrome.extension.getURL("images/video_other.png");
  var imgVideoTv = chrome.extension.getURL("images/video_tv.png");
  //Audio
  var imgAudioMusic = chrome.extension.getURL("images/audio_music.png");
  var imgAudioOther = chrome.extension.getURL("images/audio_other.png");
  var imgAudioFlac = chrome.extension.getURL("images/audio_flac.png");
  var imgAudioClips = chrome.extension.getURL("images/audio_clips.png");
  var imgAudioBook = chrome.extension.getURL("images/audio_book.png");
  //Other
  var imgOtherEbook = chrome.extension.getURL("images/other_ebook.png");
  var imgOtherComics = chrome.extension.getURL("images/other_comics.png");
  var imgOtherPictures = chrome.extension.getURL("images/other_pictures.png");
  var imgOtherPhysibles = chrome.extension.getURL("images/other_physibles.png");
  var imgOtherOther = chrome.extension.getURL("images/other_other.png");
  //Applications
  var imgAppAndroid = chrome.extension.getURL("images/application_android.png");
  var imgAppHandheld = chrome.extension.getURL("images/application_handheld.png");
  var imgAppIos = chrome.extension.getURL("images/application_ios.png");
  var imgAppMac = chrome.extension.getURL("images/application_mac.png");
  var imgAppUnix = chrome.extension.getURL("images/application_unix.png");
  var imgAppOther = chrome.extension.getURL("images/application_other.png");
  var imgAppWindows = chrome.extension.getURL("images/application_windows.png");

  var mediaTypes = {
    //Porn
    'Porn (Movies)': imgPorn,
    'Porn (Movies DVDR)': imgPorn,
    'Porn (Pictures)': imgPorn,
    'Porn (Games)': imgPorn,
    'Porn (HD - Movies)': imgPorn,
    'Porn (Movie clips)': imgPorn,
    'Porn (Other)': imgPorn,
    //Games
    'Games (PC)': imgGamesPc,
    'Games (Mac)': imgGamesMac,
    'Games (PSx)': imgGamesPsx,
    'Games (XBOX360)': imgGamesXbox,
    'Games (Wii)': imgGamesWii,
    'Games (Handheld)': imgGamesHandheld,
    'Games (IOS (iPad/iPhone))': imgGamesIos,
    'Games (Android)': imgGamesAndroid,
    'Games (Other)': imgGamesOther,
    //Video
    'Video (Movies)': imgVideoMovie,
    'Video (Movies DVDR)': imgVideoMovie,
    'Video (Music videos)': imgVideoMusic,
    'Video (Movie clips)': imgVideoClip,
    'Video (TV shows)': imgVideoTv,
    'Video (Handheld)': imgVideoHandheld, 
    'Video (HD - Movies)': imgVideoHdMovie,
    'Video (HD - TV shows)': imgVideoHdTv,
    'Video (3D)': imgVideoThreeD,
    'Video (Other)': imgVideoOther,
    //Audio
    'Audio (Music)': imgAudioMusic,
    'Audio (Audio books)': imgAudioBook,
    'Audio (Sound clips)': imgAudioClips,
    'Audio (FLAC)': imgAudioFlac,
    'Audio (Other)': imgAudioOther, 
    //Applications
    'Applications (Windows)': imgAppWindows,
    'Applications (Mac)': imgAppMac,
    'Applications (UNIX)': imgAppUnix, 
    'Applications (Handheld)': imgAppHandheld,
    'Applications (IOS (iPad/iPhone))': imgAppIos,
    'Applications (Android)': imgAppAndroid,
    'Applications (Other OS)': imgAppOther,
    //Other
    'Other (E-books)': imgOtherEbook,
    'Other (Comics)': imgOtherComics,
    'Other (Pictures)': imgOtherPictures,
    'Other (Covers)': imgOtherPictures,
    'Other (Physibles)': imgOtherPhysibles, 
    'Other (Other)': imgOtherOther
    
  };
  $.each(mediaTypes, function(media, imgUrl) {
    var newImg = $("<img>", {src: imgUrl});
    $('#searchResult > tbody > tr > td.vertTh > center').filter(function() {
      //Regex replaces multiple whitespace for a single ' '.  $.trim will polish the result.
      return $.trim($(this).text().replace(/\s+/g, ' ')) == media;
    }).text('')
      .html(newImg);
  });
}

/** Removes torrents that are not Verified/Trusted/VIP */
function removeNonTrusted() {
    var trusted = "/static/img/trusted.png";
    var vip = "/static/img/vip.gif";
    $('tr:not(:first, :last, :has(img[src="'+ trusted +'"]), :has(img[src="'+ vip +'"]))').hide();   
}

/** Swaps image for Magnent link with larger download button*/
function replaceMagnent() {  
  var newMagImgUrl = chrome.extension.getURL("images/download-button.png");
  var magIcon = "/static/img/icon-magnet.gif";
  $('#searchResult > tbody > tr > td > a > img[src="'+ magIcon +'"]').attr('src', newMagImgUrl);
}

/** Changes GiB/MiB to Gigibytes/Mebibytes */
/*
function changeMemDigi(apple) {
  var gib = /GiB/;
  var mib = /MiB/;
  var gigibytes = "Gigibytes";
  var mebibytes = "Mebibytes";
  
}
*/

/** Changes S01E01 formatting to Season 01 Episode 01 */
function changeSeason() {
  //http://stackoverflow.com/questions/9794851/find-text-string-in-jquery-and-make-it-bold
  $.fn.wrapInTag = function(opts) {
    var tag = opts.tag || 'strong'
      , words = opts.words || []
      , regex = RegExp(words.join('|'), 'gi')
      , replacement = '<'+ tag +'>$&</'+ tag +'>';

    return this.html(function() {
      return $(this).text().replace(regex, replacement);
    });
  };
  var seasonAndEpisodePatterns = {
    'Season ': /s(?=\d\d)/gi,
    ' Episode ': /e(?=\d\d)/gi
  };
  $.each(seasonAndEpisodePatterns, function(title, pattern) {
    $('.detLink').html(function () {
      return $(this).html().replace(pattern, title);
    });
  });

  $('.detLink').wrapInTag({ 
    tag: 'b',
    words: ['Season', 'Episode']
  });
}

/** Adds styling to Seeds/Leechers */
function changeSeedersLeechersStyle() {
  $('abbr[title="Seeders"]').css('color', 'green');
  $('abbr[title="Leechers"]').css('color', 'red');
  $('a[title="Order by Seeders"]').text('Seeders')
                                  .css('color', 'green');
  $('a[title="Order by Leechers"]').text('Leechers')
                                   .css('color', 'red');
  $('td[align="right"]:not(:last-child)').addClass('seeds');
  $('td[align="right"]:last-child').addClass('leeches');
}
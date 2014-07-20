/*
// **********************************************************************************************
//  content.js                                                                                 //
//  Author:  JonathonCarlyon@gmail.com                                                         //
//  Purpose: This script is responsible for altering the content displayed on TPB by removing  //
//           non-verified torrents and making torrents easier to read and download             //
//  Usage:   Content.js is executed if the URL matches:                                        //
//           mainfest.json "content_scripts": [{"matches": ["URL"]}]                           //
// **********************************************************************************************
*/
function thePirateBayForDummies() { 
  
  chrome.storage.local.get({
    //Default values
    replaceMagnet: 1,
    addCategoryImages: 1,
    changeSeedersLeechersStyle: 1,
    changeSeason: 1,
    sortBySeedsDescending: 1,
    removeNonTrusted: 0,
    removePorn: 0
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
        } else if (setting == "replaceMagnet" && settings[setting] == true) {
          replaceMagnet();
        } else if (setting == "removeNonTrusted" && settings[setting] == true) {
          removeNonTrusted();
        } else if (setting == "removePorn" && settings[setting] == true) {
          removePorn();
        }
      }
    }
  });
  
  /** Changes URL to seeds descending */
  function sortBySeedsDescending() {
    var url = window.location.href,
        searchPattern = /(\/[0-9]+\/)(99)(\/[0-9])+/,
        browsePattern = /browse\/[0-9]+$/;
    if (url.match(searchPattern)) {
      var newUrl = url.replace(searchPattern, "$17$3");
      chrome.runtime.sendMessage({redirect: newUrl});
    } else if (url.match(browsePattern)) {
      var newUrl = url + "/0/7/0";
      chrome.runtime.sendMessage({redirect: newUrl});
    }
  }
  
  /** Replace category name with more obvious icons */
  function addCategoryImages() {
    //Porn
    var imgPorn = chrome.extension.getURL("images/porn.png")
    //Games
    , imgGamesAndroid = chrome.extension.getURL("images/games_android.png")
    , imgGamesHandheld = chrome.extension.getURL("images/games_handheld.png")
    , imgGamesIos = chrome.extension.getURL("images/games_ios.png")
    , imgGamesMac = chrome.extension.getURL("images/games_mac.png")
    , imgGamesOther = chrome.extension.getURL("images/games_other.png")
    , imgGamesPc = chrome.extension.getURL("images/games_pc.png")
    , imgGamesPsx = chrome.extension.getURL("images/games_psx.png")
    , imgGamesWii = chrome.extension.getURL("images/games_wii.png")
    , imgGamesXbox = chrome.extension.getURL("images/games_xbox.png")
    //Video
    , imgVideoThreeD = chrome.extension.getURL("images/video_3d.png")
    , imgVideoClip = chrome.extension.getURL("images/video_clip.png")
    , imgVideoHdMovie = chrome.extension.getURL("images/video_hdmovie.png")
    , imgVideoHdTv = chrome.extension.getURL("images/video_hdtv.png")
    , imgVideoMovie = chrome.extension.getURL("images/video_movie.png")
    , imgVideoHandheld = chrome.extension.getURL("images/video_handheld.png")
    , imgVideoMusic = chrome.extension.getURL("images/video_music.png")
    , imgVideoOther = chrome.extension.getURL("images/video_other.png")
    , imgVideoTv = chrome.extension.getURL("images/video_tv.png")
    //Audio
    , imgAudioMusic = chrome.extension.getURL("images/audio_music.png")
    , imgAudioOther = chrome.extension.getURL("images/audio_other.png")
    , imgAudioFlac = chrome.extension.getURL("images/audio_flac.png")
    , imgAudioClips = chrome.extension.getURL("images/audio_clips.png")
    , imgAudioBook = chrome.extension.getURL("images/audio_book.png")
    //Other
    , imgOtherEbook = chrome.extension.getURL("images/other_ebook.png")
    , imgOtherComics = chrome.extension.getURL("images/other_comics.png")
    , imgOtherPictures = chrome.extension.getURL("images/other_pictures.png")
    , imgOtherPhysibles = chrome.extension.getURL("images/other_physibles.png")
    , imgOtherOther = chrome.extension.getURL("images/other_other.png")
    //Applications
    , imgAppAndroid = chrome.extension.getURL("images/application_android.png")
    , imgAppHandheld = chrome.extension.getURL("images/application_handheld.png")
    , imgAppIos = chrome.extension.getURL("images/application_ios.png")
    , imgAppMac = chrome.extension.getURL("images/application_mac.png")
    , imgAppUnix = chrome.extension.getURL("images/application_unix.png")
    , imgAppOther = chrome.extension.getURL("images/application_other.png")
    , imgAppWindows = chrome.extension.getURL("images/application_windows.png");
  
    var mediaTypes = {
      //Porn
        'Porn (Movies)': imgPorn
      , 'Porn (Movies DVDR)': imgPorn
      , 'Porn (Pictures)': imgPorn
      , 'Porn (Games)': imgPorn
      , 'Porn (HD - Movies)': imgPorn
      , 'Porn (Movie clips)': imgPorn
      , 'Porn (Other)': imgPorn
        //Games
      , 'Games (PC)': imgGamesPc
      , 'Games (Mac)': imgGamesMac
      , 'Games (PSx)': imgGamesPsx
      , 'Games (XBOX360)': imgGamesXbox
      , 'Games (Wii)': imgGamesWii
      , 'Games (Handheld)': imgGamesHandheld
      , 'Games (IOS (iPad/iPhone))': imgGamesIos
      , 'Games (Android)': imgGamesAndroid
      , 'Games (Other)': imgGamesOther
        //Video
      , 'Video (Movies)': imgVideoMovie
      , 'Video (Movies DVDR)': imgVideoMovie
      , 'Video (Music videos)': imgVideoMusic
      , 'Video (Movie clips)': imgVideoClip
      , 'Video (TV shows)': imgVideoTv
      , 'Video (Handheld)': imgVideoHandheld 
      , 'Video (HD - Movies)': imgVideoHdMovie
      , 'Video (HD - TV shows)': imgVideoHdTv
      , 'Video (3D)': imgVideoThreeD
      , 'Video (Other)': imgVideoOther
        //Audio
      , 'Audio (Music)': imgAudioMusic
      , 'Audio (Audio books)': imgAudioBook
      , 'Audio (Sound clips)': imgAudioClips
      , 'Audio (FLAC)': imgAudioFlac
      , 'Audio (Other)': imgAudioOther 
        //Applications
      , 'Applications (Windows)': imgAppWindows
      , 'Applications (Mac)': imgAppMac
      , 'Applications (UNIX)': imgAppUnix
      , 'Applications (Handheld)': imgAppHandheld
      , 'Applications (IOS (iPad/iPhone))': imgAppIos
      , 'Applications (Android)': imgAppAndroid
      , 'Applications (Other OS)': imgAppOther
        //Other
      , 'Other (E-books)': imgOtherEbook
      , 'Other (Comics)': imgOtherComics
      , 'Other (Pictures)': imgOtherPictures
      , 'Other (Covers)': imgOtherPictures
      , 'Other (Physibles)': imgOtherPhysibles 
      , 'Other (Other)': imgOtherOther
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
  
  /** Removes torrents that are not uploaded by Trusted or VIP users*/
  function removeNonTrusted() {
      var trusted = "/static/img/trusted.png",
          vip = "/static/img/vip.gif";
      $('tr:not(:first, :last, :has(img[src="'+ trusted +'"]), :has(img[src="'+ vip +'"]))').hide();   
  }
  
  /** Swaps image of Magnet with larger "download button" image */
  function replaceMagnet() {  
    var newMagImgUrl = chrome.extension.getURL("images/download-button.png"),
        magIcon = "/static/img/icon-magnet.gif";
    $('#searchResult > tbody > tr > td > a > img[src="'+ magIcon +'"]').attr('src', newMagImgUrl);
  }
  
  /** Changes text in torrent from: S01E01 to:Season 01 Episode 01 */
  function changeSeason() {
    var seasonAndEpisodePatterns = {
      '<b>Season $1</b> ': /s(\d\d)/gi,
      '<b>- Episode $1</b>': /e(\d\d)/gi
    };
    $.each(seasonAndEpisodePatterns, function(title, pattern) {
      $('.detLink').html(function () {
        return $(this).html().replace(pattern, title);
      });
    });
  }
  
  function removePorn() {
    var pornImg = chrome.extension.getURL("images/porn.png");
    $('td.vertTh > center:contains("Porn"), :has(img[src="'+ pornImg +'"])').filter(function()  {
      return $(this).parents('tr').remove();
    });
  }
  
  /** Adds styling to Seeds/Leechers */
  function changeSeedersLeechersStyle() {
    $('abbr[title="Seeders"]').css('color', 'green')
                              .text('Seeders');
    $('abbr[title="Leechers"]').css('color', 'red')
                              .text('Leechers');
    $('a[title="Order by Seeders"]').text('Seeders')
                                    .css('color', 'green');
    $('a[title="Order by Leechers"]').text('Leechers')
                                    .css('color', 'red');
    $('td[align="right"]:not(:last-child)').addClass('seeds');
    $('td[align="right"]:last-child').addClass('leeches');
  }
}
thePirateBayForDummies();
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
  var url = window.location.href;
  var pattern = /(\/[0-9]+\/)(99)(\/[0-9])+/;
  if (url.match(pattern)) {
    var newUrl = url.replace(pattern, "$17$3");
    chrome.runtime.sendMessage({redirect: newUrl}, function(response) {
    });
  }
}

/** Adds images to category section */
function addCategoryImages() {
  var imgPorn = chrome.extension.getURL("images/porn.png");
  var imgGames = chrome.extension.getURL("images/games.png");
  var imgMovie = chrome.extension.getURL("images/Movie_Clip.png");
  var imgHdMovie = chrome.extension.getURL("images/HD_Movie_Clip.png");
  var imgTv = chrome.extension.getURL("images/tv.png");
  var imgAudio = chrome.extension.getURL("images/audio.png");
  var imgEbook = chrome.extension.getURL("images/ebook.png");
  var imgAudioBook = chrome.extension.getURL("images/audio_book.png");
  var imgComics = chrome.extension.getURL("images/comics.png");
  var imgMusicVideo = chrome.extension.getURL("images/music_video.png");
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
    'Games (PC)': imgGames,
    'Games (Mac)': imgGames,
    'Games (PSx)': imgGames,
    'Games (XBOX360)': imgGames,
    'Games (Wii)': imgGames,
    'Games (Handheld)': imgGames,
    'Games (IOS (iPad/iPhone))': imgGames,
    'Games (Android)': imgGames,
    'Games (Other)': imgGames,
    //Video
    'Video (Movies)': imgMovie,
    'Video (Movies DVDR)': imgMovie,
    'Video (Music videos)': imgMusicVideo,
    'Video (Movie clips)': imgMovie,
    'Video (TV shows)': imgTv,
    'Video (Handheld)': imgMovie,
    'Video (HD - Movies)': imgHdMovie,
    'Video (HD - TV shows)': imgTv,
    'Video (3D) ': imgMovie,
    'Video (Other) ': imgMovie,
    //Audio
    'Audio (Music)': imgAudio,
    'Audio (Audio books)': imgAudioBook,
    //'Audio (Sound clips)': FIX,
    'Audio (FLAC)': imgAudio,
    'Audio (Other)': imgAudio,
    //Applications
    /*
    'Applications (Windows)': FIX,
    'Applications (Mac)': FIX,
    'Applications (UNIX)': FIX,
    'Applications (Handheld)': FIX,
    'Applications (IOS (iPad/iPhone))': FIX,
    'Applications (Android)': FIX,
    'Applications (Other OS)': FIX,
    */
    //Other
    'Other (E-books)': imgEbook,
    'Other (Comics)': imgComics
    /*
    'Other (Pictures)': FIX,
    'Other (Covers)': FIX,
    'Other (Physibles)': FIX,
    'Other (Other)': FIX,
    */
  };
  $.each(mediaTypes, function(media, imgUrl) {
    var newImg = $("<img>", {src: imgUrl});
    $('#searchResult > tbody > tr > td.vertTh > center').filter(function() {
      //Regex replaces multiple whitespace for a single ' '.  $.trim will polish the result.
      return $.trim($(this).text().replace(/\s+/g, ' ')) == media;
    }).text('')
      .after(newImg);
  });
}

/** Removes torrents that are not Verified/Trusted/VIP */
function removeNonTrusted() {
    var trusted = "/static/img/trusted.png";
    var vip = "/static/img/vip.gif";
    $('tr:not(:first, :has(img[src="'+ trusted +'"]), :has(img[src="'+ vip +'"]))').hide();   
}

/** Swaps image for Magnent link with larger download button*/
function replaceMagnent() {  
  var newMagImgUrl = chrome.extension.getURL("images/download-button.png");
  var magIcon = "/static/img/icon-magnet.gif";
  $('img[src="'+ magIcon +'"]').attr('src', newMagImgUrl);
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
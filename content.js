/*
//  content.js
//  This script is responsible for altering the content displayed on TPB by
//  removing non-verified torrents and making torrents easier to read and download 
*/
replaceMagnent(); //Good to go
addCategoryImages(); //Fix me - Add category for porn
changeSeLe(); //Good to go
changeSeason();  //Good to go
sortBySeedsDescending(); //Good to go
removeNonTrusted(); // Fix me - Not keeping Trusted(pink) rows, just VIP(green)


/** This function checks if the page is sorted by seeds descending and if not sorts the page by seeds. */
function sortBySeedsDescending() {
  var url = document.URL;
  var pattern = /(\/[0-9]+\/)(99)(\/[0-9])+/;
  if (url.match(pattern)) {
    var newUrl = url.replace(pattern, "$17$3");
    chrome.runtime.sendMessage({redirect: newUrl}, function(response) {
    });
  }
}

/** Adds images to category section */
function addCategoryImages() {
  var imgMovie = chrome.extension.getURL("images/Movie_Clip.png");
  var imgHdMovie = chrome.extension.getURL("images/HD_Movie_Clip.png");
  var imgTv = chrome.extension.getURL("images/tv.png");
  var imgAudio = chrome.extension.getURL("images/audio.png");
  var imgEbook = chrome.extension.getURL("images/ebook.png");
  var imgAudioBook = chrome.extension.getURL("images/audio_book.png");
  var imgComics = chrome.extension.getURL("images/comics.png");
  var imgMusicVideo = chrome.extension.getURL("images/music_video.png");
  var mediaTypes = {
    'Movies': imgMovie,
    'Movies DVDR': imgMovie,
    'HD - Movies': imgHdMovie,
    'TV shows': imgTv,
    'HD - TV shows': imgTv,
    'Music': imgAudio,
    'FLAC': imgAudio,
    'E-books': imgEbook,
    'Audio books': imgAudioBook,
    'Comics': imgComics,
    'Music videos': imgMusicVideo
  };
  
  $.each(mediaTypes, function(media, imgUrl) {
  var newImg = $("<img>", {src: imgUrl});
    $('a').filter(function() {
      return $(this).text() === media;
    }).parent('center').text('')
      .after(newImg);
  });
}

/** Removes torrents that are not Verified/Trusted/VIP */
function removeNonTrusted() {
  var trusted = ["/static/img/vip.gif", "/static/img/trusted.gif"];
    for (var i = 0; i < trusted.length; i++) {
      $('tr:not(:first, :has(img[src= "/static/img/trusted.gif"], :has(img[src="/static/img/vip.gif"])))').hide();
    }
}

/** Swaps image for Magnent link with T-Swift */
function replaceMagnent() {  
  var newMagImgUrl = chrome.extension.getURL("images/download-button.png");
  var imgElems = document.getElementsByTagName("img"); 
  var mag_icon = /static\/img\/icon-magnet.gif/;
  $('img[src="/static/img/icon-magnet.gif"]').attr('src', newMagImgUrl);
}

/** Changes GiB/MiB to Gigibytes/Mebibytes */
/*
function changeMemDigi(apple) {
  var gib = /GiB/;
  var mib = /MiB/;
  var gigibytes = "Gigibytes";
  var mebibytes = "Mebibytes";
  var swapMem = apple.innerHTML.search(gib);
  var swapMem2 = apple.innerHTML.search(mib);
  
  if(swapMem != -1) {
    //Replace is NOT a mutator method, never going to make that mistake again.
    return apple.innerHTML.replace(gib, gigibytes);
  }
  else if (swapMem2 != -1) {
    return apple.innerHTML.replace(mib, mebibytes);
  }
  else {
  return false;
  }
}
*/

/** Changes S01E01 formatting to Season 01 Episode 01 */
function changeSeason() {
  //http://stackoverflow.com/questions/9794851/find-text-string-in-jquery-and-make-it-bold
  $.fn.wrapInTag = function(opts) {
    var tag = opts.tag || 'strong'
      , words = opts.words || []
      , regex = RegExp(words.join('|'), 'gi') // case insensitive
      , replacement = '<'+ tag +'>$&</'+ tag +'>';

    return this.html(function() {
      return $(this).text().replace(regex, replacement);
    });
  };
  
  var titleConvertPattern= /s\d\de\d\d/gi;
  var seasonPattern = /s(?=\d\d)/gi;
  var episodePattern = /e(?=\d\d)/gi;

  
  $('.detLink').html(function () {
    return $(this).html().replace(seasonPattern, "Season: ");
  });
  $('.detLink').text(function () {
    return $(this).text().replace(episodePattern, " Episode: ");
  });
  
  $('.detLink').wrapInTag({ 
    tag: 'b',
    words: ['Season', 'Episode']
  });
}

/** Adds styling to Seeds/Leechers */
function changeSeLe() {
  $('abbr[title="Seeders"]').css('color', 'green');
  $('abbr[title="Leechers"]').css('color', 'red');
  $('a[title="Order by Seeders"]').text('Seeders')
                                  .css('color', 'green');
  $('a[title="Order by Leechers"]').text('Leechers')
                                   .css('color', 'red');
  $('td[align="right"]:not(:last-child)').addClass('seeds');
  $('td[align="right"]:last-child').addClass('leeches');
}
/*
//  content.js
//  This script is responsible for altering the content displayed on TPB by
//  removing non-verified torrents and making torrents easier to read and download 
*/
changeTable();  //Function to be removed - jQuery selectors will replace it.
replaceMagnent(); //Good to go
addCategoryImages(); //Pretty much good to go
changeSeLe();
//changeSeason();
//removeNonTrusted();


/** This function traverses through the searchResult table and searches the HTML. */
function changeTable() {   
  var tableOfResults = document.getElementById("searchResult");
  //We start at 1 so we don't cut the header off the table.
  for (var i = 1, row; row = tableOfResults.rows[i]; i++) {
    
    //iterate through rows
    //rows[] are accessed using the "row" variable assigned in the for loop  
    var matchPos = row.innerHTML.search(/\/img\/vip.gif/i);
    var matchPos2 = row.innerHTML.search(/\img\/trusted/i);
    // Hide the torrents if it is not VIP or trusted
    if(matchPos == -1 && matchPos2 == -1) {         
      row.style.display = 'none';
    }
    
    //MiB to Mebibytes
    if(changeMemDigi(row)) {
      tableOfResults.rows[i].innerHTML = changeMemDigi(row);
    } 
    //Change s01e01 to Season 1 Episode 1
    for (var j = 0, col; col = row.cells[j]; j++) {
      if (changeSeason(col)) {
        row.cells[j].innerHTML = changeSeason(col);
        }
    }
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
    'Comics': imgComics
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
//Selector is ok but having trouble with <br>( <a></a> ) format on TPB. Currently selecting parent center and removing text.
  var trusted = ["/static/img/vip.gif", "/static/img/trusted.gif"];
    for (var i = 0; i < trusted.length; i++) {
      $('img:not([src="/static/img/vip.gif"').each(function(imgElemIndex) {
        $(this).parent('tr').hide();
      });
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

/** Changes S01E01 formatting to Season 01 Episode 01 */
function changeSeason(orange) {
//function changeSeason() {
  var titleConvertPattern= /s\d\de\d\d/gi;
 /* if ($('.detLink').filter(function() {
    return $(this).text() === 's02e22';
    }).append('<eeeeeeeeeek>');
  } */
  
  var swapTitle = orange.innerHTML.search(titleConvertPattern);
  if (swapTitle != -1) {
    var matchTitle = titleConvertPattern.exec(orange.innerHTML);
    var swapMatchSeason = matchTitle[0].replace(/s/gi, "<b>Season: ");
    var swapMatchEpisode = swapMatchSeason.replace(/e(?=\d\d)/gi, " Episode: "); 
    swapMatchEpisode += "</b> ";
    return orange.innerHTML.replace(titleConvertPattern, swapMatchEpisode);
  }
  else {
  return false;
  } 
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
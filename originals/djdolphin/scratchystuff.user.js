// ==UserScript==
// @name        Scratchy Stuff
// @namespace   http://scratch.cf
// @include     http://scratch.mit.edu/*
// @version     0.2.1
// @grant       none
// ==/UserScript==

var queryString = {};
window.location.search.replace(/([^?=&]+)(=([^&]*))?/g, function($0, $1, $2, $3) { queryString[$1] = $3; });

var username = Scratch.INIT_DATA.LOGGED_IN_USER.model ? Scratch.INIT_DATA.LOGGED_IN_USER.model.username : null;

var extPresets = {
  'Mesh': {url: 'https://raw.githubusercontent.com/bobbybee/mesh-2.0/master/ext.js', author: 'bobbybee'},
  'Scratch Cloud': {url: 'https://dl.dropboxusercontent.com/u/6274273/web/scratchcloud/icon.js', author: 'MathWizz'},
  'Image Stuff': {url: 'http://scratch.cf/extensions/imagestuff.js', author: 'djdolphin'},
  'Cool helpful things extension': {url: 'http://textuploader.com/07bg/raw', author: 'PullJosh'},
  'More Math': {url: 'http://savakamyimages00000.weebly.com/uploads/6/4/5/3/6453739/more_math.js', author: 'savaka'},
  'Debugging': {url: 'http://savakamyimages00000.weebly.com/uploads/6/4/5/3/6453739/javascript_dialogs.js', author: 'savaka'},
  'Javascript Dialogs': {url: 'http://savakamyimages00000.weebly.com/uploads/6/4/5/3/6453739/javascript_dialogs.js', author: 'savaka'},
  'Link Opener': {url: 'http://savakamyimages00000.weebly.com/uploads/6/4/5/3/6453739/link_opener.js', author: 'savaka'},
  'littleBits': {url: 'https://raw.githubusercontent.com/khanning/scratch-littlebits-extension/master/littlebits_extension.js', author: 'khanning'},
  'Data Blocks': {url: 'https://raw.githubusercontent.com/Thepuzzlegame/My-Scratch-Extensions/master/data_extension.js', author: 'Thepuzzlegame'},
  'Infinity Reporter': {url: 'https://raw.githubusercontent.com/Thepuzzlegame/My-Scratch-Extensions/master/infinity_reporter.js', author: 'Thepuzzlegame'},
  'Extension Loader': {url: 'https://raw.githubusercontent.com/Thepuzzlegame/My-Scratch-Extensions/master/extension_loader.js', author: 'Thepuzzlegame'},
  'Alarm extension': {url: 'https://raw.githubusercontent.com/LLK/scratch-extension-docs/master/alarm_extension.js', author: 'sdg1'},
  'Browser Stuff': {url: 'https://raw.githubusercontent.com/LLK/scratch-extension-docs/master/browser_extension.js', author: 'grokblah'},
  'Joystick': {url: 'https://raw.githubusercontent.com/LLK/scratch-extension-docs/master/joystickExtension.js', author: 'sdg1'},
  'Local Storage': {url: 'https://raw.githubusercontent.com/LLK/scratch-extension-docs/master/localstorage_extension.js', author: 'sdg1'},
  'PicoBoard': {url: 'https://raw.githubusercontent.com/LLK/scratch-extension-docs/master/picoExtension.js', author: 'grokblah'},
  'PicoBoard Fixed': {url: 'http://www.picaxe.com/downloads/scratch/scraxepicoextension.js', 'author': 'SCRAXE'},
  'Power Extension': {url: 'https://raw.githubusercontent.com/LLK/scratch-extension-docs/master/power_extension.js', author: 'sdg1'},
  'Random wait extension': {url: 'https://raw.githubusercontent.com/LLK/scratch-extension-docs/master/random_wait_extension.js', author: 'sdg1'},
  'Speech to Text': {url: 'https://raw.githubusercontent.com/LLK/scratch-extension-docs/master/speech_to_text_extension.js', author: 'sdg1'},
  'Text to Speech': {url: 'https://raw.githubusercontent.com/LLK/scratch-extension-docs/master/text_to_speech_extension.js', author: 'sdg1'},
  'Text to Speech Simple': {url: 'https://raw.githubusercontent.com/LLK/scratch-extension-docs/master/text_to_speech_simple_extension.js', author: 'sdg1'},
  'Weather Extension': {url: 'https://raw.githubusercontent.com/LLK/scratch-extension-docs/master/weather_extension.js', author: 'sdg1'}
};
//Thanks, Thepuzzlegame!

function createMenu() {
  $('head').append('<style type="text/css">#scratchystuff { position: absolute; top: 33px; right:' + (data.project.creator == username ? (data.project.isPrivate ? '204': '150') : '207') +'px; z-index: 1000; user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; } #scratchystuff > .button { height: 20px; line-height: 20px; margin: 0; display: none; } body.editor #scratchystuff > .button { display: block; } #scratchystuff > .dropdown-menu { top: 22px; } .scratchystuffextlib tr > * { text-align: left; padding-right: 10px; } .scratchystuffextlib tr > *:last-child { padding-right: 0; } .scratchystuffextlib .ui-dialog-title { color: black; }</style>');

  //Scratchy Stuff Extension Library
  var extLibrary = $('<div><table><tbody id="scratchystuffextmenu"><tr><th>Extension</th><th>Author</th></tr></tbody></table></div>'), extTable = $(''),
      extMenu = extLibrary.find('#scratchystuffextmenu');
  $.each(extPresets, function(extName, ext) {
    extMenu.append($('<tr></tr>')
      .append($('<td></td>').append($('<a></a>').text(extName).attr('data-extension', ext.url).click(function() {
        ScratchExtensions.loadExternalJS($(this).attr('data-extension')); 
      })))
      .append($('<td></td>').append($('<a target="_blank"></a>').text(ext.author).attr('href', '/users/' + ext.author + '/')))
    );
  });
  extLibrary.dialog({
    autoOpen: false,
    dialogClass: 'scratchystuffextlib',
    title: 'Scratchy Stuff Extension Library',
    width: 365,
    minWidth: 365,
    maxWidth: 365
  });

  //Menu
  $('body').append('<div id="scratchystuff" class="dropdown"><div class="button" data-toggle="dropdown"><span>Scratchy Stuff</span></div><div class="dropdown-menu"><ul id="scratchystuffmenu"></ul></div></div>');
  //Load extension from URL
  var menu = $('#scratchystuffmenu');
  menu.append($('<li>Load extension from URL</li>').click(function() {
    var extensionURL = prompt('What URL?');
    if (!extensionURL) return;
    ScratchExtensions.loadExternalJS(extensionURL);
  }));
  //Load asset from URL
  menu.append($('<li>Load asset from URL</li>').click(function() {
    var assetURL = prompt('What URL?');
    if (!assetURL) return;
    var fileName = assetURL.slice(assetURL.lastIndexOf('/') + 1);
    assetURL = 'http://www.corsproxy.com/' + assetURL.replace(/^https?:\/\//, '');
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var scratchData = ',' + btoa(String.fromCharCode.apply(null, new Uint8Array(this.response)));
      Scratch.FlashApp.ASobj.ASdropFile(fileName, scratchData, 0, 0);
    };
    xhr.open('GET', assetURL);
    xhr.responseType = 'arraybuffer';
    xhr.send();
  }));
  //Load extension from library
  menu.append($('<li>SS Extension Library</li>').click(function() {
    extLibrary.dialog('open');
  }));
  //Self-remix
  if (data.project.creator == username) menu.append($('<li>Remix project</li>').click(JSremixProject));
}

if (username) {
  if (/^\/projects\/\d+\/$/.test(window.location.pathname)) {
    createMenu();
    //Download
    $('#see-inside').parent().before($('<div class="button"><span>Download</span></div>').click(JSdownloadProject));
    $('#see-inside').parent().css('display', 'inline-block');
  }
  alert(/^\/accounts\/(password_change|email_change|change_country)\/$/.test(window.location.pathname));
  if (/^\/accounts\/(password_change|email_change|change_country)\/$/.test(window.location.pathname)) {
  	$('#tabs-index > ul').append('<li><a href="#scratchystuff">Scratchy Stuff</a></li>');
  }
}
// ==UserScript==
// @name		Mega Scratch Userscript
// @include		http://scratch.mit.edu/*
// @version		0.1
// @grant		none
// ==/UserScript==

var queryString = {};
window.location.search.replace(/([^?=&]+)(=([^&]*))?/g, function($0, $1, $2, $3) { queryString[$1] = $3; });

var username = Scratch.INIT_DATA.LOGGED_IN_USER.model ? Scratch.INIT_DATA.LOGGED_IN_USER.model.username : null;

if (!localStorage.hiddenMessages) localStorage.hiddenMessages = '[]';

function titleMessages() {
	var basetitle = document.getElementsByTagName("title")[0].innerHTML;

	setInterval(function() {
		if (parseInt($(".notificationsCount").html()) == 0 || $(".notificationsCount").html() === null) document.title = basetitle;
    	else document.title = "(" + $(".notificationsCount").html() + ") " + basetitle;
	}, 2000);
}

function projectPage() {
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

	$('head').append('<style type="text/css">#scratchystuffbutton { position: absolute; top: 33px; right:' + (data.project.creator == username ? (data.project.isPrivate ? '204': '150') : '207') +'px; z-index: 1000; user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; } #scratchystuffbutton > .button { height: 20px; line-height: 20px; margin: 0; display: none; } body.editor #scratchystuffbutton > .button { display: block; } #scratchystuff > .dropdown-menu { top: 22px; } .scratchystuffextlib tr > * { text-align: left; padding-right: 10px; } .scratchystuffextlib tr > *:last-child { padding-right: 0; } .scratchystuffextlib .ui-dialog-title { color: black; }</style>');

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
	$('body').append('<div id="scratchystuffbutton" class="dropdown"><div class="button" data-toggle="dropdown"><span>Scratchy Stuff</span></div><div class="dropdown-menu"><ul id="scratchystuffmenu"></ul></div></div>');
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
	//Download button
	$('#see-inside').parent().before($('<div class="button"><span>Download</span></div>').click(JSdownloadProject));
	$('#see-inside').parent().css('display', 'inline-block');
}

function settingsPage() {
	function showSettings() {
		var hiddenMessages = JSON.parse(localStorage.hiddenMessages),
			hiddenChoices = ['Loves', 'Favorites', 'Remixes', 'Comments', 'Replies', 'Follows', 'Studio Updates', 'Studio Invites', 'Forums'];
		$('.tabs-index li').removeClass('active');
		$('.megascratchsettings').addClass('active');
		var main = $('#main-content');
		main.html('');
		//Message filtering
		main.append('<h3>Message Filtering</h3>Filter out:');
		var msgFilterChoices = $('<ul></ul>');
		$.each(hiddenChoices, function(i, choice) {
			msgFilterChoices.append($('<li></li>').text(choice).css('margin', 0).append(
				$('<input type="checkbox" />').val(choice).attr('checked', hiddenMessages.indexOf(choice) > -1).css('margin-left', '5px').click(function() {
					if (this.checked) hiddenMessages.push(this.value);
					else hiddenMessages.splice(hiddenMessages.indexOf(this.value), 1);
					localStorage.hiddenMessages = JSON.stringify(hiddenMessages);
				})
			));
		});
		main.append(msgFilterChoices);
	}
	$('.tabs-index > ul').append('<li class="megascratchsettings"><a href="#megascratch">Mega Scratch</a></li>');
	if (location.hash == '#megascratch') showSettings();
	else $(window).on('hashchange', function() { if (location.hash == '#megascratch') showSettings(); });
}

function messagesPage() {
	var hidden = JSON.parse(localStorage.hiddenMessages);
	if (hidden.length == 0) return;

	if($.inArray("Loves", hidden) > -1) {
		$( "li:contains('loved')" ).css( "display", "none" );
		console.log('Loves hidden');
	}
	if($.inArray("Favorites", hidden) > -1) {
		$( "li:contains('favorited')" ).css( "display", "none" );
		console.log('Favs hidden');
	}
	if($.inArray("Remixes", hidden) > -1) {
		$( "li:contains('remixed')" ).css( "display", "none" );
    	console.log('Remixes hidden');
	}
	if($.inArray("Comments", hidden) > -1) {
		$( "li:contains('commented on')" ).css( "display", "none" );
		console.log('Comments hidden');
	}
	if($.inArray("Replies", hidden) > -1) {
		$( "li:contains('replied to your comment on')" ).css( "display", "none" );
    	console.log('Replies hidden');
	}
	if($.inArray("Follows", hidden) > -1) {
		$( "li:contains('is now following you')" ).css( "display", "none" );
		console.log('Follows hidden');
	}
	if($.inArray("Studio Updates", hidden) > -1) {
		$( "li:contains('There was new activity in')" ).css( "display", "none" );
	    console.log('Studio updates hidden');
	}
	if($.inArray("Studio Invites", hidden) > -1) {
		$( "li:contains('curate the studio')" ).css( "display", "none" );
		console.log('Studio invites hidden');
	}
	if($.inArray("Forums", hidden) > -1) {
		$( "li:contains('There are new posts in the forum thread:')" ).css( "display", "none" );
		console.log('Forum updates hidden');
	}

	$(".box-head h2").append( "<span class='notice'>Some messages hidden</span>" );

	$(".notice").css({"color":"#aaa", "font-size":"12px", "text-shadow":"none", "font-weight":"400", "line-height":"0", "float":"right", "margin-top":"13px", "cursor":"pointer"});

	$(".notice").click(function() {
	$( "#notification-list li" ).css( "display", "list-item" );
		$(this).css( "display", "none" );
	});
}

if (username) {
	titleMessages();
	if (/^\/projects\/\d+\/$/.test(location.pathname)) projectPage();
	if (/^\/accounts\/(password_change|email_change|change_country)\/$/.test(location.pathname)) settingsPage();
	if (location.pathname == '/messages/') messagesPage();
}
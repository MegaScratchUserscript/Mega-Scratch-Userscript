msuParts["scratchyStuff"] = function(ScratchUserscript){
	var settingsDlg = $("<div></div>");
	
	ScratchUserscript.registerPart("Scratchy Stuff", "Adds more features to projects.", settingsDlg);

	var isEnabled = ScratchUserscript.isPartEnabled("scratchyStuff");
	
	var settings = {download: true, exts: true, assets: true, selfRemix:true};
	var labels = {
		download: "Enable project download button",
		diff: "Enable remix difference viewer",
		links: "Enable Scratchblocks and Phosphorus button",
		exts: "Enable extensions in projects",
		assets: "Enable loading assets from URL",
		selfRemix: "Enable self-remixing"
	};
	settings = ScratchUserscript.readSetting("scratchyStuff", "settings", settings);
	
	updateChanges = function(){
		for(x in settings){
			if($("#msu-ss"+x+"btn").is(":checked")){
				settings[x] = true;
			} else {
				settings[x] = false;
			}
		}
		ScratchUserscript.writeSetting("scratchyStuff", "settings", settings);
	};
	
	settingsDlg.append("<br/>");
	
	for(x in settings){ // much more concise than adding individual settings one by one I would say
		settingsDlg.append("<input type='checkbox' id='msu-ss"+x+"btn' /> \
			<label for='msu-ss"+x+"btn' \
			style='display: inline;margin-right:1em;'>\
			"+labels[x]+"</label><br/>");
		if(settings[x]) $("#msu-ss"+x+"btn").attr("checked", "checked");
	}
	
	settingsDlg.find("input").bind("change", updateChanges);
	settingsDlg.find("textarea").bind("cut paste keyup", updateChanges);
	
	if(!isEnabled) return;
	
	// begin actual script
	// --- IDK what the next two lines are supposed to do
	// var queryString = {};
	// window.location.search.replace(/([^?=&]+)(=([^&]*))?/g, function($0, $1, $2, $3) { queryString[$1] = $3; });
	var username = ScratchUserscript.getUsername();
	var extPresets = unsafeWindow.extPresets;
	
	function createButton() {
		$('head').append('<style type="text/css">#scratchystuffbutton { position: absolute; top: 33px; right:' + (unsafeWindow.data.project.creator == username ? (unsafeWindow.data.project.isPrivate ? '204': '150') : '207') +'px; z-index: 1000; user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; } #scratchystuffbutton > .button { height: 22px; line-height: 24px; margin: 0; display: none; font-weight: bold; font-size: 12px; background-color: #179fd7; background-image: none; box-shadow: none; border: none;} body.editor #scratchystuffbutton > .button { display: block;} #scratchystuff > .dropdown-menu { top: 22px; } .scratchystuffextlib tr > * { text-align: left; padding-right: 10px; } .scratchystuffextlib tr > *:last-child { padding-right: 0; } .scratchystuffextlib .ui-dialog-title { color: black; }</style>');
		
		//Scratchy Stuff Extension Library
		var extLibrary = $('<div><table><tbody id="scratchystuffextmenu"><tr><th>Extension</th><th>Author</th></tr></tbody></table></div>'), extTable = $(''),
		extMenu = extLibrary.find('#scratchystuffextmenu');
		$.each(extPresets, function(extName, ext) {
			// wow that's some messy code
			extMenu.append($('<tr></tr>')
				.append($('<td></td>').append($('<a></a>').text(extName).attr('data-extension', ext.url).click(function() {
					unsafeWindow.ScratchExtensions.loadExternalJS($(this).attr('data-extension')); 
				}))).append($('<td></td>').append($('<a target="_blank"></a>').text(ext.author).attr('href', '/users/' + ext.author + '/')))
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
		$(".scratchystuffextlib").append('<iframe class="iframeshim" frameborder="0" scrolling="no">&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;&lt;/body&gt;&lt;/html&gt;</iframe>');
		//Menu
		$('body').append('<div id="scratchystuffbutton" class="dropdown"><div class="button" data-toggle="dropdown"><span>Scratchy Stuff</span><iframe class="iframeshim" frameborder="0" scrolling="no">&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;&lt;/body&gt;&lt;/html&gt;</iframe></div><div class="dropdown-menu"><ul id="scratchystuffmenu"><iframe class="iframeshim" frameborder="0" scrolling="no">&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;&lt;/body&gt;&lt;/html&gt;</iframe></ul></div></div>');
		if(settings.exts){
			//Load extension from URL
			var menu = $('#scratchystuffmenu');
			menu.append($('<li>Load extension from URL</li>').click(function() {
				var extensionURL = prompt('What URL?');
				if (!extensionURL) return;
				unsafeWindow.ScratchExtensions.loadExternalJS(extensionURL);
			}));
			//Load extension from library
			menu.append($('<li>SS Extension Library</li>').click(function() {
				extLibrary.dialog('open');
			}));
		}
		if(settings.assets){
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
		}
		//Self-remix
		if (unsafeWindow.data.project.creator == username && settings.selfRemix) menu.append($('<li>Self-remix project</li>').click(unsafeWindow.JSremixProject));
	}

	if (username) {
		if (ScratchUserscript.getPageType().type == "project") {
			// Editor "Scratchy Stuff" button
			createButton();
			
			// Download Button
			if(settings.download){
				$('#see-inside').parent().before($(
					'<div class="button" style="width:100px;line-height:0px;"><img src="http://i.imgur.com/INmHsg1.png"><span style="left:90px;top:11px;position:absolute;">Download</span></div>'
					).click(unsafeWindow.JSdownloadProject));
				$('#see-inside').parent().css('display', 'inline-block');
			}
			
			// Phosperous/Scratchblocks buttons Buttons
			var currenthref = window.location.pathname.slice(10, -1);
			if(settings.scratchblocks){
				/****** PHOSPHORUS & SCRATCHBLOCKS ******/
				var phosp = $('<a/>');
				phosp.attr('href', 'http://phosphorus.github.io/#' + currenthref);
				phosp.append('<div class="button" style="padding: 0 10px;">Phosphorus</div>');
				 
				var sblocks = $('<a/>');
				sblocks.attr('href', 'http://blob8108.github.io/scratchblocks2/generator/#project=' + currenthref);
				sblocks.append('<div class="button" style="padding: 0 10px;">Scratchblocks</div>');
				 
				var pbuttons = $('<div/>');
				pbuttons.addClass('buttons');
				pbuttons.css('display', 'inline-block');
				pbuttons.append(phosp).append(sblocks);
				$('#stats .stats').prepend(pbuttons);
			}
			
			// Differences between remixes
			if(settings.diff) {
				if($('#remix-history').length > 0) {
				    $('#remix-history li').each(function (index, value) {
				        var link2 = $(value).find('a').attr('href').slice(10, -1);
				        var difflink = $('<a/>');
				        difflink.attr('href', 'http://blob8108.github.io/scratchblocks2/diff/#' + currenthref + '+' + link2);
				        difflink.append('(diff)');
				        $('#remix-history li').eq(index).find('.attribute').append(' ').append(difflink);
				    });
				}
			}
		}
	}
};

msuParts["notificationbootcamp"] = function (ScratchUserscript) {
	var settingsDlg = $("<div></div>");

	ScratchUserscript.registerPart("Notification Bootcamp", "Organizes messages by type.", settingsDlg);

	var isEnabled = ScratchUserscript.isPartEnabled("notificationbootcamp");

	var settings = {newMessagesOnly:true};
	var labels = {
		newMessagesOnly:"Organize new messages only"
	};
	settings = ScratchUserscript.readSetting("notificationbootcamp", "settings", settings);
	
	updateChanges = function(){
		for(x in settings){
			if($("#msu-not"+x+"btn").is(":checked")){
				settings[x] = true;
			} else {
				settings[x] = false;
			}
		}
		ScratchUserscript.writeSetting("notificationbootcamp", "settings", settings);
	};
	
	for(x in settings){ // much more concise than adding individual settings one by one I would say
		settingsDlg.append("<input type='checkbox' id='msu-not"+x+"btn' /> \
			<label for='msu-not"+x+"btn' \
			style='display: inline;margin-right:1em;'>\
			"+labels[x]+"</label><br/>");
		if(settings[x]) $("#msu-not"+x+"btn").attr("checked", "checked");
	}
	
	settingsDlg.find("input").bind("change", updateChanges);
	settingsDlg.find("textarea").bind("cut paste keyup", updateChanges);

	if (!isEnabled)
		return;

	// begin actual script
	///////CSS first
	var notStyle = "<style>"
		 + "#notification-list li {padding: .7em 5px; margin: 0 0 2px 10px !important;}"
		 + ".unread{border-radius: 5px; background-color: #eed;}"
		 + ".notarrow {position: relative; right: 20px; color: #888; cursor: default; transition: all .4s; clear: both; display: inline-block; width: 0;}"
		 + ".nshow .notarrow {-webkit-transform: rotate(90deg); -moz-transform: rotate(90deg); -ms-transform: rotate(90deg);-o-transform: rotate(90deg); transform: rotate(90deg);}"
		 + ".notshowhide {margin-left: 11px !important; border-left: 1px solid #ccb; padding-left: 2px; display: none;}"
		 + ".unreadcount {float: right; color: #ccb; background: white; margin: 10px 10px 0 5px; padding: 0 5px; border-radius: 3px; font-weight: bold;}"
		 + "#notification-list {margin-top: 20px}"
		 + "#notification-list .notshowhide li {margin-left: 0 !important;}"
		 + "</style>";
	$('head').append(notStyle);

	///////now JS
	var notNewMessagesOnly = settings.newMessagesOnly; //when on, only sort unread messages. When off, sort all messages.

	var notArray = new Array();
	var notlist;
	if (notNewMessagesOnly) {
		notlist = '#notification-list .unread li';
	} else {
		notlist = '#notification-list li';
	}

	$(notlist).each(function (index, value) {
		var notTime = $(value).find('.time');
		var dateTCL = $(value).parent().children().first().text();
		dateTCL = dateTCL.substring(0, 1).toLowerCase() + dateTCL.substring(1);
		$(notTime).append(' ' + dateTCL);

		var notContent = $('<li>' + $(value).html() + '</li>');
		var userlinkDeleted = false
			notContent.children().each(function (index, value) {
				if ($(value).prop('tagName') == 'A') {
					if ($(value).attr('href').indexOf('/users/') != -1 && !userlinkDeleted) {
						notContent.children().eq(index).html('');
						userlinkDeleted = true;
					}
					if ($(value).attr('href').indexOf('/studios/') != -1) {
						notContent.children().eq(index).html('');
					}
					if (index == 3 && $(value).text().indexOf('remixed') != 1) { // special case: link to remix
						notContent.children().eq(index).html('');
					}
				} else if ($(value).prop('tagName') == 'SPAN') {
					notContent.children().eq(index).html('');
				}
			});

		var notGroupExists = false;
		for (i2 = 0; i2 < notArray.length; i2++) {
			if (notArray[i2].text == notContent.text()) {
				notGroupExists = true;
				var notObj = new Object();
				notObj.html = $(value);
				if (notNewMessagesOnly) {
					notObj.class = 'unread';
				} else {
					notObj.class = $(value).parent().attr('class');
				}
				if (notObj.class == 'unread') {
					notArray[i2].nots.unreadcount++;
				}
				notArray[i2].nots.push(notObj);

			}
		}
		if (!notGroupExists) {
			var notGroup = new Object();
			notGroup.text = notContent.text();
			notGroup.nots = new Array();
			notGroup.nots[0] = new Object();
			notGroup.nots[0].html = $(value);
			if (notNewMessagesOnly) {
				notGroup.nots[0].class = 'unread';
				notGroup.nots.unreadcount = 1;
			} else {
				notGroup.nots[0].class = $(value).parent().attr('class');
				notGroup.nots.unreadcount = (notGroup.nots[0].class == 'unread' ? 1 : 0);
			}
			notArray.push(notGroup);
		}
	});

	var notElement = $('<ul id="notContainer"/>');

	var notForLength;
	if (notNewMessagesOnly) {
		notForLength = notArray.length;
		if (notForLength > 0) {
			notElement.append('<h3>New</h3>');
		}
	} else {
		notForLength = notArray.length - 1;
	}
	for (i = 0; i < notForLength; i++) { //there's an extra notif in there for some reason that's like "please be respectful when commenting"
		if (notArray[i].nots.length == 1) {
			notArray[i].nots[0].html.addClass(notArray[i].nots[0].class);
			notElement.append(notArray[i].nots[0].html);
		} else {
			var showhide = $('<section id="not' + i + '"><li class="' + notArray[i].nots[0].class + '">' + notArray[i].nots[0].html.html() + '</li></section>');
			showhide.children().first().contents().each(function (index, value) {
				if ($(value).prop('tagName') == 'A' && $(value).attr('href').indexOf('/users/') != -1) {
					if (notArray[i].nots.length == 2) {
						showhide.children().first().contents().eq(index).after(' and 1 other ');
					} else {
						showhide.children().first().contents().eq(index).after(' and ' + (notArray[i].nots.length - 1) + ' others ');
					}
				}
			});
			showhide.children().first().html(showhide.children().first().html().replace('is now', 'are now')); //it's these little grammatical things that really get to me

			showhide.children().first().prepend('<span onclick="$(\'#not' + i + '\').toggleClass(\'nshow\'); $(\'#not' + i + ' ul\').slideToggle()" class="notarrow">&#9658;</span>');
			var list = $('<ul class="notshowhide"/>');
			for (i2 = 1; i2 < notArray[i].nots.length; i2++) {
				notArray[i].nots[i2].html.addClass(notArray[i].nots[i2].class);
				list.append(notArray[i].nots[i2].html);
			}
			showhide.append(list);
			if (!notNewMessagesOnly && notArray[i].nots.unreadcount > 0) {
				showhide.prepend('<span class="unreadcount">' + notArray[i].nots.unreadcount + '</span>');
			}
			notElement.append(showhide);
		}
	}

	if (notNewMessagesOnly) {
		$('#notification-list .unread').empty().append(notElement).removeClass('unread');
	} else {
		$('#notification-list').empty().append(notElement);

		if (document.URL.match(/\/\d+/) == null || document.URL.match(/\/\d+/)[0] == '/0') {
			$('#message-nav-links').remove();
			$('#notification-list').append($('<div id="message-nav-links"><a class="older" href="/messages/1">&laquo Older messages</a></div>'));
		} else {
			$('#message-nav-links').detach().appendTo('#notification-list');
		}
	}
};

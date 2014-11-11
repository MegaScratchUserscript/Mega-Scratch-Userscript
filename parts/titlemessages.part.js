msuParts["titlemessages"] = function (ScratchUserscript) {
	var settingsDlg = $("<div></div>");

	ScratchUserscript.registerPart("Title Messages", "Shows your message count in the titlebar.", settingsDlg);

	var isEnabled = ScratchUserscript.isPartEnabled("titlemessages");

	var settings = {
		titlemsg : true,
		fav : true
	};

	var labels = {
		titlemsg : "Show number of messages in the page title",
		fav : "Show number of messages in the page favicon"
	};

	settings = ScratchUserscript.readSetting("titlemessages", "settings", settings);

	updateChanges = function () {
		for (x in settings) {
			if ($("#msu-titlemsg" + x + "btn").is(":checked")) {
				settings[x] = true;
			} else {
				settings[x] = false;
			}
		}
		ScratchUserscript.writeSetting("titlemessages", "settings", settings);
	};

	for (x in settings) { // much more concise than adding individual settings one by one I would say
		settingsDlg.append("<input type='checkbox' id='msu-titlemsg" + x + "btn' /> \
			<label for='msu-titlemsg" + x + "btn' \
			style='display: inline;margin-right:1em;'>\
			" + labels[x] + "</label><br/>");
		if (settings[x])
			$("#msu-titlemsg" + x + "btn").attr("checked", "checked");
	}

	settingsDlg.find("input").bind("change", updateChanges);
	settingsDlg.find("textarea").bind("cut paste keyup", updateChanges);

	if (!isEnabled)
		return;

	// begin actual script

	var basetitle = $("title").eq(0).html();
	var link = $('<link id="favicon" rel="icon" type="image/x-icon" href="/favicon.ico" />');
	link.appendTo(document.head);
	setInterval(function () {
		if ($(".notificationsCount").length == 0 || isNaN(x = parseInt($(".notificationsCount").html())) || x == 0) {
			if (settings.titlemsg)
				document.title = basetitle;
			if (settings.fav) {
				link.attr({
					"type" : "image/x-icon",
					"href" : "/favicon.ico"
				});
			}
		} else {
			var tf = ""+x;
			if(tf.length > 2) tf="99+";
			
			if (settings.titlemsg)
				document.title = "(" + tf + ") " + basetitle;
			if (settings.fav) {
				var canvas = document.createElement('canvas'),
				ctx,
				img = document.createElement('img');

				if (canvas.getContext) {
					canvas.height = canvas.width = 16;
					ctx = canvas.getContext('2d');
					img.onload = function () {
						ctx.drawImage(this, 0, 0);
						ctx.font = 'bold 9px "helvetica", sans-serif';
						ctx.strokeStyle = 'black';
						ctx.lineWidth = 3;
						ctx.strokeText(tf+"", 0, 15);
						ctx.fillStyle = '#FFFFFF';
						ctx.fillText(tf+"", 0, 15);
						link.attr({
							"type" : "image/png",
							"href" : canvas.toDataURL('image/png')
						});
					};
					img.src = '/favicon.ico';
				}
			}
		}
	}, 2000);
};
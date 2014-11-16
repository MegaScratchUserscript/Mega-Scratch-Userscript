msuParts["messagefilter"] = function (ScratchUserscript) {
	var settingsDlg = $("<div></div>");

	ScratchUserscript.registerPart("Message Filter", "Hides items from your messages.", settingsDlg);

	var isEnabled = ScratchUserscript.isPartEnabled("messagefilter");

	var settings = {
		Love : true,
		Fav : true,
		Remix : true,
		Comment : true,
		Reply : true,
		Follow : true,
		StudioUpdate : true,
		StudioInvite : true,
		Forum : true
	};

	var labels = {
		Love : "Love-its",
		Fav : "Favorites",
		Remix : "Remixes",
		Comment : "Comments",
		Reply : "Replies to your comments",
		Follow : "Follows",
		StudioUpdate: "Studio activity",
		StudioInvite : "Studio invites",
		Forum : "Forum updates"
	};

	settings = ScratchUserscript.readSetting("messagefilter", "settings", settings);

	updateChanges = function () {
		for (x in settings) {
			if ($("#msu-messages" + x + "btn").is(":checked")) {
				settings[x] = true;
			} else {
				settings[x] = false;
			}
		}
		ScratchUserscript.writeSetting("messagefilter", "settings", settings);
	};

	settingsDlg.append("<b>Show the following messages:</b><br/>");

	for (x in settings) { // much more concise than adding individual settings one by one I would say
		settingsDlg.append("<input type='checkbox' id='msu-messages" + x + "btn' /> \
												<label for='msu-messages" + x + "btn' \
												style='display: inline;margin-right:1em;'>\
												" + labels[x] + "</label><br/>");
		if (settings[x])
			$("#msu-messages" + x + "btn").attr("checked", "checked");
	}

	settingsDlg.find("input").bind("change", updateChanges);
	settingsDlg.find("textarea").bind("cut paste keyup", updateChanges);

	if (!isEnabled)
		return;

	// begin actual script
	if (ScratchUserscript.getPageType().type != 'messages')
		return;

	var isHidden = false;

	function hideItem(name) {
		var en;
		if ((en = !settings[name]))
			isHidden = true;
		return en;
	}

	if (hideItem("Love")) {
		$("li:contains('loved')").css("display", "none");
		console.log('Loves hidden');
	}
	if (hideItem("Fav")) {
		$("li:contains('favorited')").css("display", "none");
		console.log('Favs hidden');
	}
	if (hideItem("Remix")) {
		$("li:contains('remixed')").css("display", "none");
		console.log('Remixes hidden');
	}
	if (hideItem("Comment")) {
		$("li:contains('commented on')").css("display", "none");
		console.log('Comments hidden');
	}
	if (hideItem("Reply")) {
		$("li:contains('replied to your comment')").css("display", "none");
		console.log('Replies hidden');
	}
	if (hideItem("Follow")) {
		$("li:contains('is now following you'), li:contains('are now following you')").css("display", "none");
		console.log('Follows hidden');
	}
	if (hideItem("StudioUpdate")) {
		$("li:contains('There was new activity in')").css("display", "none");
		console.log('Studio updates hidden');
	}
	if (hideItem("StudioInvite")) {
		$("li:contains('curate the studio')").css("display", "none");
		console.log('Studio invites hidden');
	}
	if (hideItem("Forum")) {
		$("li:contains('There are new posts in the forum thread:')").css("display", "none");
		console.log('Forum updates hidden');
	}

	if (isHidden) {
		$(".box-head h2").append("<span class='notice'>Some messages hidden</span>")

		$(".notice").css({
			"color" : "#aaa",
			"font-size" : "12px",
			"text-shadow" : "none",
			"font-weight" : "400",
			"line-height" : "0",
			"float" : "right",
			"margin-top" : "13px",
			"cursor" : "pointer"
		});

		$(".notice").click(function () {
			$("#notification-list li").css("display", "list-item");
			$(this).css("display", "none");
		});
	}
};
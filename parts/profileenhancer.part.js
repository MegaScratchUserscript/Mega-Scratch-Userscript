msuParts["profileEnhancer"] = function (ScratchUserscript) {
	var settingsDlg = $("<div></div>");

	ScratchUserscript.registerPart("Profile Enhancer", "Adds extra features and enhancements to profile pages.", settingsDlg);

	var isEnabled = ScratchUserscript.isPartEnabled("profileEnhancer");

	var settings = {
		liveProject : false,
		sectionShared : true,
		sectionFavorite : true,
		sectionStudioFollow : true,
		sectionStudioCurate : true,
		sectionFollowing : true,
		sectionFollowers : true,
		sectionComments : true
	};
	settings = ScratchUserscript.readSetting("profileEnhancer", "settings", settings);

	updateChanges = function () {
		settings.liveProject = $("#msu-enableliveproject").is(":checked");
		settings.sectionShared = $("#msu-enablesectionshared").is(":checked");
		settings.sectionFavorite = $("#msu-enablesectionfavorite").is(":checked");
		settings.sectionStudioFollow = $("#msu-enablesectionstudiofollow").is(":checked");
		settings.sectionStudioCurate = $("#msu-enablesectionstudiocurate").is(":checked");
		settings.sectionFollowing = $("#msu-enablesectionfollowing").is(":checked");
		settings.sectionFollowers = $("#msu-enablesectionfollowers").is(":checked");
		settings.sectionComments = $("#msu-enablesectioncomments").is(":checked");
		ScratchUserscript.writeSetting("profileEnhancer", "settings", settings);
	};

	settingsDlg.append("<b>Options:</b><br/>");
	settingsDlg.append("<label for='msu-enableliveproject' \
				style='display: inline;margin-right:1em;'>\
				Enable live featured project:</label><input type='checkbox' id='msu-enableliveproject' /><br/><br />");
	settingsDlg.append("<b>Toggle Sections:</b><br/>");
	settingsDlg.append("<label for='msu-enablesectionshared' \
				style='display: inline;margin-right:1em;'>\
				Shared Projects:</label><input type='checkbox' id='msu-enablesectionshared' /><br/>");
	settingsDlg.append("<label for='msu-enablesectionfavorite' \
				style='display: inline;margin-right:1em;'>\
				Favorite Projects:</label><input type='checkbox' id='msu-enablesectionfavorite' /><br/>");
	settingsDlg.append("<label for='msu-enablesectionstudiofollow' \
				style='display: inline;margin-right:1em;'>\
				Studios I'm Following:</label><input type='checkbox' id='msu-enablesectionstudiofollow' /><br/>");
	settingsDlg.append("<label for='msu-enablesectionstudiocurate' \
				style='display: inline;margin-right:1em;'>\
				Studios I Curate:</label><input type='checkbox' id='msu-enablesectionstudiocurate' /><br/>");
	settingsDlg.append("<label for='msu-enablesectionfollowing' \
				style='display: inline;margin-right:1em;'>\
				Following:</label><input type='checkbox' id='msu-enablesectionfollowing' /><br/>");
	settingsDlg.append("<label for='msu-enablesectionfollowers' \
				style='display: inline;margin-right:1em;'>\
				Followers:</label><input type='checkbox' id='msu-enablesectionfollowers' /><br/>");
	settingsDlg.append("<label for='msu-enablesectioncomments' \
				style='display: inline;margin-right:1em;'>\
				Comments:</label><input type='checkbox' id='msu-enablesectioncomments' /><br/>");
	
	// update changes on checkbox toggle
	settingsDlg.find("input").bind("change", updateChanges);

	if (settings.liveProject) {
		$("#msu-enableliveproject").attr("checked", "checked");
	}
	if (settings.sectionShared) {
		$("#msu-enablesectionshared").attr("checked", "checked");
	}
	if (settings.sectionFavorite) {
		$("#msu-enablesectionfavorite").attr("checked", "checked");
	}
	if (settings.sectionStudioFollow) {
		$("#msu-enablesectionstudiofollow").attr("checked", "checked");
	}
	if (settings.sectionStudioCurate) {
		$("#msu-enablesectionstudiocurate").attr("checked", "checked");
	}
	if (settings.sectionFollowing) {
		$("#msu-enablesectionfollowing").attr("checked", "checked");
	}
	if (settings.sectionFollowers) {
		$("#msu-enablesectionfollowers").attr("checked", "checked");
	}
	if (settings.sectionComments) {
		$("#msu-enablesectioncomments").attr("checked", "checked");
	}

	var pageType = ScratchUserscript.getPageType();
	var json = pageType; // getPageType() returns a json object, no need to parse it
	/*console.log(json);
	console.log(isEnabled);
	console.log(settings.liveProject);*/
	if (json.type == 'profile' && isEnabled) {
		if (!settings.sectionShared) {
			$("#shared").parent().remove();
		}
		if (!settings.sectionFavorite) {
			$("#favorites").parent().remove();
		}
		//I'm working on it...
		/*    if (!settings.sectionStudioFollow) {
		$( "#shared" ).parent().remove();
		}
		if (!settings.sectionStudioCurate) {
		$( "#shared" ).parent().remove();
		}
		if (!settings.sectionFollowing) {
		$( "#shared" ).parent().remove();
		}
		if (!settings.sectionFollowers) {
		$( "#shared" ).parent().remove();
		}
		if (!settings.sectionComments) {
		$( "#shared" ).parent().remove();
		}*/

		if (settings.liveProject) {
			//Make project live
			$("#featured-project").remove();
			var projID = unsafeWindow.Scratch.INIT_DATA.PROFILE.featuredProject.id;
			$(".stage").append("<iframe allowtransparency='true' width='282' height='210' src='http://scratch.mit.edu/projects/embed/" + projID + "/?autostart=true' frameborder='0' allowfullscreen=''></iframe>");
		}
	}
};
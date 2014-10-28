unsafeWindow.msuParts["feed"] = function(ScratchUserscript){
	var settingsDlg = $("<div></div>");
	
	ScratchUserscript.registerPart("Feed", "Hides items from your front page feed.", settingsDlg);

	var isEnabled = ScratchUserscript.isPartEnabled("feed");
	
	var settings = {
		love: true,
		favorite: true,
		remix: true,
		curator: true,
		manager: true,
		following: true,
		share: true
	};
	
	var labels = {
		love: "Project Love-its",
		favorite: "Project Favorites",
		remix: "Project Remixes",
		curator: "Curator Promotions",
		manager: "Manager Promotions",
		following: "Following Messages",
		share: "Project Shares From Followers"
	};
	
	settings = ScratchUserscript.readSetting("feed", "settings", settings);
	
	updateChanges = function(){
		for(x in settings){
			if($("#msu-feed"+x+"btn").is(":checked")){
				settings[x] = true;
			} else {
				settings[x] = false;
			}
		}
		ScratchUserscript.writeSetting("feed", "settings", settings);
	};
	
	settingsDlg.append("<b>Show the following messages in the feed:</b><br/>");
	
	for(x in settings){ // much more concise than adding individual settings one by one I would say
		settingsDlg.append("<input type='checkbox' id='msu-feed"+x+"btn' /> \
			<label for='msu-feed"+x+"btn' \
			style='display: inline;margin-right:1em;'>\
			"+labels[x]+"</label><br/>");
		if(settings[x]) $("#msu-feed"+x+"btn").attr("checked", "checked");
	}
	
	settingsDlg.find("input").bind("change", updateChanges);
	settingsDlg.find("textarea").bind("cut paste keyup", updateChanges);
	
	if(!isEnabled) return;
	
	// begin actual script
	if(location.pathname != "/") return;
	function hideItem(name){
		return !settings[name];
	}
	
	waitForKeyElements("#whats-happenin #activity-feed", runHider);
	
	function runHider(jNode){
		if (hideItem('love')) {
			$("#activity-feed li div:contains('loved')").css("display", "none");
		}
		if (hideItem('share')) {
			$("#activity-feed li:contains('shared the project')").css("display", "none");
		}
		if (hideItem('favorite')) {
			$("#activity-feed li:contains('favorited')").css("display", "none");
		}
		if (hideItem('remix')) {
			$("#activity-feed li:contains('remixed')").css("display", "none");
		}
		if (hideItem('following')) {
        $("#activity-feed li:contains('is now following')").css("display", "none");
		}
		if (hideItem('curator')) {
			$("#activity-feed li:contains('became a curator of')").css("display", "none");
		}
		if (hideItem('manager')) {
			$("#activity-feed li:contains('was promoted to manager of')").css("display", "none");
		}
		
		$("#whats-happenin .box-head").append("<span class='notice'>Some messages hidden</span>");
		$(".notice").css({
			"color": "#aaa",
			"font-size": "12px",
			"text-shadow": "none",
			"font-weight": "400",
			"line-height": "0",
			"float": "right",
			"margin-top": "13px",
			"cursor": "pointer",
			"right": "0px"
		});
		$(".notice").click(function () {
			$("#activity-feed li").css("display", "list-item");
			$(this).css("display", "none");
		});
	}
};
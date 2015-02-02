msuParts["wikilink"] = function(ScratchUserscript){
	var settingsDlg = $("<div></div>");
	
	ScratchUserscript.registerPart("Wiki Link", "Adds a link to the wiki in the top bar.", settingsDlg);

	var isEnabled = ScratchUserscript.isPartEnabled("wikilink");
	
	var settings = {
		name: "Wiki"
	};
	
	settings = ScratchUserscript.readSetting("wikilink", "settings", settings);
	
	updateChanges = function(){
		settings.name = $("#wiki-name").val();
		ScratchUserscript.writeSetting("wikilink", "settings", settings);
		
		if(isEnabled) {
			settings = ScratchUserscript.readSetting("wikilink", "settings", settings); //Update settings
			$(".site-nav li a[href='http://wiki.scratch.mit.edu/']").html(settings.name); //Auto-update button
		}
	};
	
	settingsDlg.append('Button Name: <input type="text" id="wiki-name" value="' + settings.name + '">');
	
	settingsDlg.find("input").bind("change cut paste keyup", updateChanges);
	
	if(!isEnabled) return;
	
	// begin actual script
	$('.site-nav li:nth-of-type(3)').after("<li><a href='http://wiki.scratch.mit.edu/'>" + settings.name + "</a></li>");
};

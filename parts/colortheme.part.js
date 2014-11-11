msuParts["colortheme"] = function(ScratchUserscript){
	var settingsDlg = $("<div></div>");
	
	ScratchUserscript.registerPart("Color Theme", "Changes the colors of the Scratch page.", settingsDlg);

	var isEnabled = ScratchUserscript.isPartEnabled("colortheme");
	
	var custom = {
		main: "#25B36A",
		dark: "#128C4D",
		text: "#FFFFFF"
	};
	
	var preset = {
		green:   ["#99CD4E", "#7EA840", "#fff"],
		orange:  ["#ED6332", "#AD4723", "#fff"],
		seafoam: ["#25B36A", "#128C4D", "#fff"],
		purple:  ["#8943E6", "#591DA8", "#fff"],
		pink:    ["#E34BA1", "#A6246E", "#fff"],
		custom:  []
	};
	
	var settings = {
		none: true,
		green: false,
		seafoam: false,
		orange: false,
		purple: false,
		pink: false,
		custom: false
	};
	
	var labels = {
		none: "Default Scratch Theme",
		green: "Green",
		seafoam: "Sea Foam",
		orange: "Orange",
		purple: "Purple",
		pink: "Pink",
		custom: "Custom"
	};
	
	settings = ScratchUserscript.readSetting("colortheme", "settings", settings);
	custom = ScratchUserscript.readSetting("colortheme", "custom", custom);
	
	updateChanges = function(){
		for(x in settings){
			if($("#msu-ct"+x+"btn").is(":checked")){
				settings[x] = true;
			} else {
				settings[x] = false;
			}
		}
		custom['main'] = $("#msu-ct-main").val();
		custom['dark'] = $("#msu-ct-dark").val();
		custom['text'] = $("#msu-ct-text").val();
		ScratchUserscript.writeSetting("colortheme", "settings", settings);
		ScratchUserscript.writeSetting("colortheme", "custom", custom);
	};
	
	settingsDlg.append("<b>Select a theme:</b><br/>");
	
	for(x in settings){ // much more concise than adding individual settings one by one I would say
		settingsDlg.append("<input type='radio' name='msu-ct-radio' id='msu-ct"+x+"btn' /> \
			<label for='msu-ct"+x+"btn' \
			style='display: inline;margin-right:1em;'>\
			"+labels[x]+"</label><br/>");
		if(settings[x]) $("#msu-ct"+x+"btn").attr("checked", "checked");
	}
	settingsDlg.append("<b>Custom colors (choose 'Custom'; hex colors only please):</b><br/>");
	settingsDlg.append("<label for='msu-ct-main'>Main color:</label><input type='text' id='msu-ct-main' /><br/>");
	settingsDlg.append("<label for='msu-ct-dark'>Dark color:</label><input type='text' id='msu-ct-dark' /><br/>");
	settingsDlg.append("<label for='msu-ct-text'>Text color:</label><input type='text' id='msu-ct-text' /><br/>");
	
	settingsDlg.find("input").bind("change cut paste keyup", updateChanges);
	
	$("#msu-ct-main").val(custom['main']);
	$("#msu-ct-dark").val(custom['dark']);
	$("#msu-ct-text").val(custom['text']);
	
	if(!isEnabled || settings.none) return;
	
	// begin actual script
	preset.custom = [custom['main'], custom['dark'], custom['text']];
	var sel = "custom";
	for(x in settings){
		if(settings.hasOwnProperty(x) && settings[x]){
			sel = x;
		}
	}
	var css = GM_getResourceText("theme");
	css = css.replace(/\$([a-zA-Z0-9\-]+)/g, function(match, p1, offset, string){
		if(p1.indexOf("main-color") > -1) return preset[sel][0];
		if(p1.indexOf("main-dark") > -1) return preset[sel][1];
		return preset[sel][2];
	});
	
	GM_addStyle(css);
};
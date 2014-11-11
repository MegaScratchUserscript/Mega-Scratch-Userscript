msuParts["wikilink"] = function(ScratchUserscript){
	var settingsDlg = $("<div></div>");
	
	ScratchUserscript.registerPart("Wiki Link", "Adds a link to the wiki in the top bar.", settingsDlg);

	var isEnabled = ScratchUserscript.isPartEnabled("wikilink");
	
	settingsDlg.append("<i>No additional settings (to disable this, use the checkbox in the left section).</i>");
	
	if(!isEnabled) return;
	
	// begin actual script
	$('.site-nav li:nth-of-type(3)').after("<li><a href='http://wiki.scratch.mit.edu/'>Wiki</a></li>");
};
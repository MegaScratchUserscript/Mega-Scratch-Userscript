// ==UserScript==
// @name		Mega Scratch Userscript (base/bootstrap)
// @author		MegaScratchUserscript (collab with some Scratch ATers: https://github.com/MegaScratchUserscript/Mega-Scratch-Userscript#-mega-scratch-userscript)
// @description	A mega userscript with tons of epic uses!
// @include		http://scratch.mit.edu/*
// @version		0.1
// @grant		unsafeWindow
// @icon		http://blue.gwiddle.org/img/MegaScratchUserscript65.png
// @require	parts/examplescript.part.user.js
// @require		resources/extensions.js
// ==/UserScript==

// I called this base.user.js in case this is the main script
var ScratchUserscript = {
        MODE_DEV: true, // change to false in the release; use this flag to print data to console for debug, etc
	_parts: ["examplePart"],
	_settingsHTML: $("<div>Settings go here</div>"),
	_init: function(){
		for(x in ScratchUserscript._parts){
			if(typeof unsafeWindow.suParts !== "undefined" && typeof unsafeWindow.suParts[ScratchUserscript._parts[x]] !== "undefined"){
				(unsafeWindow.suParts[ScratchUserscript._parts[x]])(ScratchUserscript);
			}
		}
		if(ScratchUserscript.MODE_DEV){
			console.log("Scratchuserscript started!");
		}
		ScratchUserscript._settingsHTML.css("display","none").appendTo(document.body).dialog({autoOpen: false});
	},
	/**
	 * Registers a part of the userscript onto the settings dialog
	 * @param name The name of the part
	 * @param description A description
	 * @param settings HTML for the part's settings page, if any
	 */
	registerPart: function(name, description, settings){
		// add settings gui section to ScratchUserscript.settingsHTML
		
	},
	/**
	 * Gets the page type
	 * @return The type, in the form of a JSON object:
	 *		type: either project, studio, messages, mystuff, settings, forum, or unknown
	 *		subtype: in forums, either section, topic, or null
	 *  	id: the forum topic id, project id, studio id, etc
	 */
	getPageType: function(){
		var obj = {type: "unknown", subtype: null, id: null};
		if (/^\/projects\/\d+\/$/.test(location.pathname)){
			obj.type = "project";
			obj.id = parseInt(/^\/projects\/(\d+)\/$/.exec(location.pathname)[1]);
		}
		if (/^\/studios\/\d+\/$/.test(location.pathname)){
			obj.type = "studio";
			obj.id = parseInt(/^\/studios\/(\d+)\/$/.exec(location.pathname)[1]);
		}
		if(/^\/discuss\//.test(location.pathname)){
			obj.type = "forum";
			if(/^\/discuss\/\d+\/$/.test(location.pathname)){
				obj.subtype = "section";
				obj.id = parseInt(/^\/discuss\/(\d+)\/$/.exec(location.pathname)[1]);
			}
			if(/^\/discuss\/topic\/\d+\//.test(location.pathname)){
				obj.subtype = "topic";
				obj.id = parseInt(/^\/discuss\/topic\/(\d+)\//.exec(location.pathname)[1]);
			}
		}
		if (/^\/accounts\/(password_change|email_change|change_country)\/$/.test(location.pathname)){
			obj.type = "settings";
		}
		if (location.pathname == '/messages/'){
			obj.type = "messages";
		}
		if (location.pathname == '/mystuff/'){
			obj.type = "mystuff";
		}
		return obj;
	},
	/**
	 * @return The username of the currently logged in user, or null if not logged in
	 */
	getUsername: function(){
		return Scratch.INIT_DATA.LOGGED_IN_USER.model ? Scratch.INIT_DATA.LOGGED_IN_USER.model.username : null;
	}
};

window.ScratchUserscript = ScratchUserscript; // make it global for parts

$(document).ready(ScratchUserscript._init);

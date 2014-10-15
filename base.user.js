// ==UserScript==
// @name		Mega Scratch Userscript (base/bootstrap)
// @include		http://scratch.mit.edu/*
// @version		0.1
// @grant		none
// @require		https://cdn.rawgit.com/MegaApuTurkUltra/Mega-Scratch-Userscript/master/parts/examplescript.part.js
// ==/UserScript==

// I called this base.user.js in case this is the main script
var ScratchUserscript = {
        MODE_DEV: true, // change to false in the release; use this flag to print data to console for debug, etc
	// _parts: [],
	_settingsHTML: $("<div></div>"),
	_init: function(){
		/*if(ScratchUserscript.MODE_DEV){ // load parts
			for(x in ScratchUserscript._parts){
				var sc = document.createElement("script");
				sc.src = ScratchUserscript._parts[x];
				document.head.appendChild(sc);
			}
		} // otherwise they are already included (the release will combine everything)
                */
		// run init tasks here
		// ScratchUserscript._settingsHTML.appendTo(derp);
	},
	/**
	 * Registers a part of the userscript onto the settings dialog
	 * @param name The name of the part
	 * @param description A description
	 * @param settings HTML for the part's settings page, if any
	 */
	register: function(name, description, settings, init){
		// add settings gui section to ScratchUserscript.settingsHTML
		$(document).ready(init);
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

// append other parts here

$(document).ready(ScratchUserscript._init);

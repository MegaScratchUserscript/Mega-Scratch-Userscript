// ==UserScript==
// @name		Mega Scratch Userscript (part: example)
// @author		MegaScratchUserscript 
// @description	Example part
// @include		http://scratch.mit.edu/*
// @version		0.1
// @grant		unsafeWindow
// @icon		http://blue.gwiddle.org/img/MegaScratchUserscript65.png
// ==/UserScript==
if(typeof unsafeWindow.suParts == "undefined") unsafeWindow.suParts = {};
unsafeWindow.suParts["exampleScript"] = function(ScratchUserscript){
	console.log("Example started!");
	// name, description, settings (to be implemented)
	ScratchUserscript.registerPart("Example", "Example", []);
}

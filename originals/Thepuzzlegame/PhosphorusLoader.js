// ==UserScript==
// @name PhosphorusLoader
// @namespace pl
// @include http://scratch.mit.edu/projects/*/*
// @version 0.1
// @grant none
// ==/UserScript==

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://raw.githubusercontent.com/MegaScratchUserscript/Mega-Scratch-Userscript/master/originals/Thepuzzlegame/externalJSSource.js';
document.getElementsByTagName('head')[0].appendChild(script);

$( ".active" ).append( '<div id="load-with-pho" class="action tooltip bottom" style="" onclick="loadPhos()";><span class="hovertext"><span class="arrow"></span>Load this project with Phosphorus</span><span>Phosphorus</span></div>' );

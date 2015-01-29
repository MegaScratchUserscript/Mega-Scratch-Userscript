// ==UserScript==
// @name         Forum Project Viewer
// @namespace    https://Felizolinha.github.io
// @version      1.0
// @description  Displays embedded projects inside forum posts
// @author       TheGameBuilder
// @match        *://scratch.mit.edu/discuss/*
// @run-at       document-end
// @grant        none
// ==/UserScript==
$(document).ready(function() {
    var selectors = "div.post_body_html a[href*='://scratch.mit.edu/projects/embed/']:not(blockquote>p.bb-quote-author ~ a)", //Look for links inside forum posts, but not the ones inside quotes with authors.
	    projectLinks = $(selectors);
   
    for (var i = 0; i < projectLinks.length; i++) {
        var p = $(selectors + ":eq(" + i + ")"),
            pLink = p.attr('href');
        p.replaceWith('<br><br><iframe style="display:block; margin:0 auto;" allowtransparency="true" width="485" height="402" src="' + pLink + '" frameborder="0" allowfullscreen></iframe><br><div style="text-align:center;"><a href="' + pLink + '">' + p.html() + '</a></div><br>');
    }
});
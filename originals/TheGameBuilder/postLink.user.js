// ==UserScript==
// @name         Copy post link
// @namespace    https://felizolinha.github.io
// @version      1.0
// @description  Copies post links to your clipboard when you click the post's number
// @author       TheGameBuilder
// @match        *://scratch.mit.edu/discuss/*
// @run-at       document-end
// 		 		       https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant        GM_setClipboard
// ==/UserScript==
$(document).ready(function() {
    for (var i = 0; i < 20; i++) {
        var n = $(".conr:gt(0):lt(20)" + ":eq(" + i + ")"),
            nID = n.parent().parent().parent().attr('id');
        
        n.wrap('<a data-post-ID="#' + nID + '"></a>');
        n.parent().click(function() {
            location.hash = $(this).attr('data-post-ID');
            if(confirm("Do you really want to copy the link to this post?")) 
                GM_setClipboard(location.href);
        });
    }
});

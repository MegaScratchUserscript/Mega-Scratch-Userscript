// ==UserScript==
// @name		Scratch Feed
// @include		http://scratch.mit.edu/
// @version		0.1
// @grant		none
// ==/UserScript==


//"love", "share", "favorite", "remix", "following", "curator", "manager"
var hide = ["remix", "following", "curator", "manager"];

if ($.inArray('love', hide) > -1) {
  $( "#activity-feed li div:contains('loved')" ).css( "display", "none" );
}

if ($.inArray('share', hide) > -1) {
  $( "#activity-feed li:contains('shared the project')" ).css( "display", "none" );
}

if ($.inArray('favorite', hide) > -1) {
  $( "#activity-feed li:contains('favorited')" ).css( "display", "none" );
}

if ($.inArray('remix', hide) > -1) {
  $( "#activity-feed li:contains('remixed')" ).css( "display", "none" );
}

if ($.inArray('following', hide) > -1) {
  $( "#activity-feed li:contains('is now following')" ).css( "display", "none" );
}

if ($.inArray('curator', hide) > -1) {
  $( "#activity-feed li:contains('became a curator of')" ).css( "display", "none" );
}

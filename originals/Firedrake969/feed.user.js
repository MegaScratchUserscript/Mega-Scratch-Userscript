// ==UserScript==
// @name		Scratch Feed
// @include		http://scratch.mit.edu/
// @version		0.1
// @grant		none
// ==/UserScript==

//great thanks to PullJosh's MessageFilter.user.js for guidance.

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

if ($.inArray('manager', hide) > -1) {
  $( "#activity-feed li:contains('was promoted to manager of')" ).css( "display", "none" );
}

$("#whats-happenin .box-head").append( "<span class='notice'>Some messages hidden</span>" )

$(".notice").css({
  "color":"#aaa",
  "font-size":"12px",
  "text-shadow":"none",
  "font-weight":"400",
  "line-height":"0", "float":"right",
  "margin-top":"13px",
  "cursor":"pointer",
  "right":"0px"
});

$(".notice").click(function() {
  $( "#activity-feed li" ).css( "display", "list-item" );
  $(this).css( "display", "none" );
});

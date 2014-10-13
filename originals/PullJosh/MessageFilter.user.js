var hidden = new Array( "Love", "Fav", "Remix", "StudioUpdate" ); //Options are: Love, Fav, Remix, Comment, Reply, Follow, StudioUpdate, StudioInvite, Forum. Add what you want HIDDEN to the array.
//Note: The "profile" and "project" options are for comments in the respective places (does not include replies). "Reply" applies to all comment replies.

if($.inArray("Love", hidden) > -1) {
	$( "li:contains('loved')" ).css( "display", "none" );
    console.log('Loves hidden');
}
if($.inArray("Fav", hidden) > -1) {
	$( "li:contains('favorited')" ).css( "display", "none" );
    console.log('Favs hidden');
}
if($.inArray("Remix", hidden) > -1) {
	$( "li:contains('remixed')" ).css( "display", "none" );
    console.log('Remixes hidden');
}
if($.inArray("Comment", hidden) > -1) {
	$( "li:contains('commented on')" ).css( "display", "none" );
    console.log('Comments hidden');
}
if($.inArray("Reply", hidden) > -1) {
	$( "li:contains('replied to your comment on')" ).css( "display", "none" );
    console.log('Replies hidden');
}
if($.inArray("Follow", hidden) > -1) {
	$( "li:contains('is now following you')" ).css( "display", "none" );
    console.log('Follows hidden');
}
if($.inArray("StudioUpdate", hidden) > -1) {
	$( "li:contains('There was new activity in')" ).css( "display", "none" );
    console.log('Studio updates hidden');
}
if($.inArray("StudioInvite", hidden) > -1) {
	$( "li:contains('curate the studio')" ).css( "display", "none" );
    console.log('Studio invites hidden');
}
if($.inArray("Forum", hidden) > -1) {
	$( "li:contains('There are new posts in the forum thread:')" ).css( "display", "none" );
    console.log('Forum updates hidden');
}

$(".box-head h2").append( "<span class='notice'>Some messages hidden</span>" )

$(".notice").css({"color":"#aaa", "font-size":"12px", "text-shadow":"none", "font-weight":"400", "line-height":"0", "float":"right", "margin-top":"13px", "cursor":"pointer"});

$(".notice").click(function() {
  $( "#notification-list li" ).css( "display", "list-item" );
  $(this).css( "display", "none" );
});

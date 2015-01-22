/*Could someone add a setting for this, I can't figure out how.*/
$(document).ready(function() { 
	//This is the part that hides the whole post
	$(".post_body_html:contains('spoiler'), .post_body_html:contains('Spoiler'), .post_body_html:contains('SPOILER')").hide();
	
	 $('<a class="reveal">Reveal spoilers &gt;&gt;</a> ').insertBefore(".post_body_html:contains('spoiler'), .post_body_html:contains('Spoiler'), .post_body_html:contains('SPOILER')");

	$("a.reveal").click(function(){
		$(this).parents("div").children(".post_body_html:contains('spoiler'), .post_body_html:contains('Spoiler'), .post_body_html:contains('SPOILER')").fadeIn(2500);
		$(this).remove();
	});
	//This is the [color=spoiler] tag scripts
	$('<a class="revealTag">Open spoilers &gt;&gt;</a> ').insertBefore("span[style='color:spoiler']");
	
	$("span[style='color:spoiler']").hide();
	
	$("a.revealTag").click(function(){
		$(this).parents("div").children("span").fadeIn(2500);
		$(this).remove();
	});

});

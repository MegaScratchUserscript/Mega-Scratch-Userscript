/*Could someone add a setting for this, I can't figure out how.*/
$(document).ready(function() { 
	
	$(".post_body_html:contains('spoiler')").hide();
	
	 $('<a class="reveal">Reveal spoilers &gt;&gt;</a> ').insertBefore(".post_body_html:contains('spoiler')");

	$("a.reveal").click(function(){
		$(this).parents("div").children(".post_body_html:contains('spoiler')").fadeIn(2500);
		$(this).remove();
	});

});

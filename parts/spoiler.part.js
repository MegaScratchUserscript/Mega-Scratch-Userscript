msuParts["spoiler"] = function (ScratchUserscript) {
	var settingsDlg = $("<div><i>Put [color=spoiler] Hello! [/color] in a forum post to make a spoiler!<br/>Also supports [color=transparent][/color]</i></div>");

	ScratchUserscript.registerPart("Forum Spoilers", "Adds support for spoilers to forums.", settingsDlg);

	var isEnabled = ScratchUserscript.isPartEnabled("spoiler");

	if (isEnabled) {
		// actual script
		$(document).ready(function() {
			$('.postright span').each(function(index) {
				if($(this).attr('style')==='color:spoiler' || $(this).attr('style')==='color:transparent') {
					var make = $(this).html();
					if($(this).attr('style')==='color:transparent'){
						$(this).css("color", "initial");
					}
					$(this).html('<blockquote><span class="bb-quote-author revealTag spoiler_closed" id="openspoiler'+index+'">'+
						"Open Spoiler &gt;&gt;"+
						'</span><div id="spoiler' + index + '" style="display:none">' + make + '</div></blockquote>');
				}
			});
	
		    $(".revealTag").css({"cursor":"pointer","text-decoration":"underline"}).click(function() {
		    	var thing = $(this).attr('id').substring(11, $(this).attr('id').length);
				if($(this).hasClass("spoiler_closed")){
					$(this).html("Close Spoiler &lt;&lt;").removeClass("spoiler_closed");
					$('#spoiler' + thing).slideDown();
				} else {
					$(this).html("Open Spoiler &gt;&gt;").addClass("spoiler_closed");
					$('#spoiler' + thing).slideUp();
				}
		    });
		});
	}
};

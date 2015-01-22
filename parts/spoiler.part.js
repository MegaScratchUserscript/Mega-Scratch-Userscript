msuParts["spoiler"] = function (ScratchUserscript) {
	var settingsDlg = $("<div></div>");

	ScratchUserscript.registerPart("Forum Spoilers", "Put [color=spoiler] Hello! [/color] in a forum post to make a spoiler!", settingsDlg);

	var isEnabled = ScratchUserscript.isPartEnabled("spoiler");

	if (!isEnabled)
		return;

	// actual script
	$(document).ready(function() {
		$('.postright span').each(function(index) {
			if($(this).attr('style')==='color:spoiler') {
				$('<a class="revealTag" id="openspoiler' + index + '">Open spoiler &gt;&gt;</a> ').insertBefore(this);
				var make = $(this).html();
				$(this).html('<span id="spoiler' + index + '">' + make + '</span>').hide();
			}
		});

	    $("a.revealTag").click(function() {
	    	var thing = $(this).attr('id').substring(11, $(this).attr('id').length);

	        $( '#spoiler' + thing ).parent().css('display', 'inherit');

	        $(this).remove();
	    });
	});
};

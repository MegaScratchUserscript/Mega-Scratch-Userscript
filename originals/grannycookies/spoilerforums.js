// replaces all BBcode [color=spoiler] with "Open spoiler >>" etc
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

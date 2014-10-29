unsafeWindow.msuParts["themeEffects"] = function(ScratchUserscript){
	var settingsDlg = $("<div></div>");
	
	ScratchUserscript.registerPart("Theme Effects", "Adds 3D scrolling and a parallax background.", settingsDlg);

	var isEnabled = ScratchUserscript.isPartEnabled("themeEffects");
	
	var settings = {scrollEffect: false, background: false, bgUrl:"http://i.imgur.com/ra8F49A.jpg"};
	settings = ScratchUserscript.readSetting("themeEffects", "settings", settings);
	
	updateChanges = function(){
		settings.scrollEffect = $("#msu-enablescrollfx").is(":checked");
		settings.background = $("#msu-enablebgfx").is(":checked");
		settings.bgUrl = $("#msu-bgfxurl").val();
		ScratchUserscript.writeSetting("themeEffects", "settings", settings);
	};
	
	settingsDlg.append("<b>Settings for Theme Effects:</b><br/><br/>");
	settingsDlg.append("<label for='msu-enablescrollfx' \
		style='display: inline;margin-right:1em;'>\
		Enable 3D scroll:</label><input type='checkbox' id='msu-enablescrollfx' /><br/>");
	settingsDlg.append("<label for='msu-enablebgfx' \
		style='display: inline;margin-right:1em;'>\
		Enable background:</label><input type='checkbox' id='msu-enablebgfx' /><br/>");
	settingsDlg.append("Background image URL:<br/> <textarea id='msu-bgfxurl' style='width:90%;height: 4em;'></textarea><br/>");
	
	settingsDlg.find("input").bind("change", updateChanges);
	settingsDlg.find("textarea").bind("cut paste keyup", updateChanges);
	
	if(settings.scrollEffect){
		$("#msu-enablescrollfx").attr("checked", "checked");
	}
	if(settings.background){
		$("#msu-enablebgfx").attr("checked", "checked");
	}
	$("#msu-bgfxurl").val(settings.bgUrl);
	
	if(isEnabled && settings.background){
		$("#pagewrapper").css({'background':'url('+settings.bgUrl+')',"background-size":"100% auto","background-repeat": "repeat-y"});
		$("#djangobbindex").css({'background':'rgba(255, 255, 255, 0.8)', 'padding':'10px', 'border-radius':'10px'});
	}
	
	if(isEnabled && settings.scrollEffect){
		$("#pagewrapper").css('perspective', '800px');
		$("#content").css({'transform-style': 'preserve-3d', 'transition': 'transform 0.5s', 'backface-visibility': 'hidden'});
		$("#topnav").css("z-index", "9999999");
		var t, l = (new Date()).getTime(), scrolling = false;
		initialAmt = 0;
		$(window).scroll(function(){
			$("#pagewrapper").css('background-position-y', ($(document).scrollTop()*10/11)+'px');
			$("#content").css('transform-origin', (($(document).width()/2))+"px "+($(document).scrollTop()+$(window).height()/2)+"px");
			diff = Math.abs($(document).scrollTop()-initialAmt);
			if(diff>600)$("#content").css('transform', 'rotateX(-5deg) translateZ(-50px) translateY(50px)');
			var now = (new Date()).getTime();
			if(now - l > 400 && !scrolling ){
				$(this).trigger('scrollStart');
				l = now;
			}
			clearTimeout(t);
			t = setTimeout(function(){
				if (scrolling)
					$(window).trigger('scrollEnd');
			}, 300);
		});
		
		$(window).bind('scrollStart', function(){
			scrolling = true;
			initialAmt = $(document).scrollTop();
		});
		
		$(window).bind('scrollEnd', function(){
			scrolling = false;
			initialAmt = $(document).scrollTop();
			$("#content").css('transform', 'none');
		});
		window.onbeforeunload=function(){
			$("#content").css('transform', 'translateZ(-50px)').animate({'opacity':'0'}, 700);
		};
	}
};
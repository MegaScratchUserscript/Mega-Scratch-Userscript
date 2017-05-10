msuParts["projectStuff"] = function (ScratchUserscript) {
	var settingsDlg = $("<div></div>");

	ScratchUserscript.registerPart("Project Stuff", "Adds phosphorus and scratchblocks2 buttons to projects.", settingsDlg);
	
	var settings = {
		phosphorus: true,
		autophosphorus: true,
		sb2: true,
		diff: true
	};
	var labels = {
		phosphorus: "Enable phosphorus button",
		autophosphorus: "Automatically switch to phosphorus",
		sb2:  "Enable scratchblocks2 generator button",
		diff: "Enable scratchblocks2 diff button"
	};
	settings = ScratchUserscript.readSetting("projectStuff", "settings", settings);
	
	updateChanges = function(){
		for(x in settings){
			if($("#msu-ps"+x+"btn").is(":checked")){
				settings[x] = true;
			} else {
				settings[x] = false;
			}
		}
		ScratchUserscript.writeSetting("projectStuff", "settings", settings);
	};
	
	settingsDlg.append("<br/>");
	
	for(x in settings){
		settingsDlg.append("<input type='checkbox' id='msu-ps"+x+"btn' /> \
			<label for='msu-ps"+x+"btn' \
			style='display: inline;margin-right:1em;'>\
			"+labels[x]+"</label><br/>");
		if(settings[x]) $("#msu-ps"+x+"btn").attr("checked", "checked");
	}
	
	settingsDlg.find("input").bind("change", updateChanges);

	var isEnabled = ScratchUserscript.isPartEnabled("projectStuff");

	if (isEnabled && ScratchUserscript.getPageType().type == "project") {
		if(settings.phosphorus){
			var phosButton = $('<div id="msu-ps-phosphorus" class="action tooltip bottom isflash">'+
				'<span class="hovertext" id="msu-ps-phosphorus-tool"><span class="arrow"></span>Switch to phosphorus</span>'+
				'<span>Player type</span></div>');
			$(".active").append(phosButton);
			$("#msu-ps-phosphorus").click(function(){
				if($(this).hasClass('isflash')){
					$(this).removeClass('isflash');
					$(".buttons").hide();
					$(".player").hide();
					
					var iframe = document.createElement('iframe');
					iframe.setAttribute('allowfullscreen', true);
					iframe.setAttribute('allowtransparency', true);
					iframe.src = 'https://phosphorus.github.io/embed.html?id=' + Scratch.INIT_DATA.PROJECT.model.id + '&auto-start=true&light-content=false';
					iframe.width = 482;
					iframe.height = 393;
					iframe.style.border = '0';
					iframe.className = 'phosphorus';
					var first = document.getElementsByClassName('player')[0];
					first.parentNode.insertBefore(iframe, first);
					
					$("#msu-ps-phosphorus-tool").html("<span class='arrow'></span>Switch to flash");
				} else {
					$(this).addClass('isflash');
					$(".buttons").show();
					$(".player").show();
					$(".msu-phosphorus-script, .phosphorus").remove();
					$("#msu-ps-phosphorus-tool").htmk("<span class='arrow'></span>Switch to phosphorus");
				}
			});
			if(settings.autophosphorus){
				$("#msu-ps-phosphorus").click();
			}
		}
		if(settings.sb2){
			var btn = $('<div id="msu-ps-sb2" class="action tooltip bottom isflash">'+
				'<span class="hovertext"><span class="arrow"></span>Generate scratchblocks2 code</span>'+
				'<span>Generate code</span></div>');
			$(".active").append(btn);
			$("#msu-ps-sb2").click(function(){
				window.open('https://scratchblocks.github.io/generator/#project='+Scratch.INIT_DATA.PROJECT.model.id, "_blank");
			});
		}
		if(settings.diff){
			var btn = $('<div id="msu-ps-diff" class="action tooltip bottom isflash">'+
				'<span class="hovertext"><span class="arrow"></span>Generate scratchblocks2 diff</span>'+
				'<span>Generate diff</span></div>');
			$(".active").append(btn);
			$("#msu-ps-diff").click(function(){
				var diff2 = prompt("Other project ID?");
				if(diff2 == null || diff2 == "") return;
				window.open('https://scratchblocks.github.io/diff/#'+Scratch.INIT_DATA.PROJECT.model.id+"+"+diff2, "_blank");
			});
		}
	}
};

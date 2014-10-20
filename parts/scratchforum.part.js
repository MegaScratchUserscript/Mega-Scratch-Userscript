unsafeWindow.msuParts["forumEnhancer"] = function(ScratchUserscript){
	var dlg = $("<div></div>");
	
	ScratchUserscript.registerPart("Forum Enhancements", "Adds support/no support buttons to forums posts and adds some other enhancements.", dlg);

	var isEnabled = ScratchUserscript.isPartEnabled("Forum Enhancements");
	
	sMessages = ["Support!", "Support as per this", "No support", "No support as per this", true];
	// LATER: Integrate localStorage with ScratchUserscript
	if(typeof localStorage != 'undefined' && typeof localStorage.sMessages != 'undefined'){
		sMessages = JSON.parse(localStorage.sMessages);
	}
	
	updateChanges = function(){
		sMessages[0]=$("#supportm").val();
		sMessages[1]=$("#supporta").val();
		sMessages[2]=$("#nsupportm").val();
		sMessages[3]=$("#nsupporta").val();
		sMessages[4]=$("#autosub").is(":checked");
		localStorage.sMessages = JSON.stringify(sMessages);
	};
	
	// Change these IDs to something more safe, preferably prefixed with msu-
	dlg.append("<b>Support messages:</b><br/><br/>");
	dlg.append("Support:<br/> <textarea id='supportm' style='width:90%;height: 4em;'></textarea><br/>");
	dlg.append("Support as per:<br/> <textarea id='supporta' style='width:90%;height: 4em;'></textarea><br/>");
	dlg.append("No support:<br/> <textarea id='nsupportm' style='width:90%;height: 4em;'></textarea><br/>");
	dlg.append("No support as per:<br/> <textarea id='nsupporta' style='width:90%;height: 4em;'></textarea><br/>");
	dlg.append("<label for='autosub' style='display: inline;margin-right:1em;'>Auto submit:</label><input type='checkbox' id='autosub' /><br/>");
	
	dlg.find("input").bind("change", updateChanges);
	dlg.find("textarea").bind("cut paste keyup", updateChanges);
	
	$("#supportm").val(sMessages[0]);
	$("#supporta").val(sMessages[1]);
	$("#nsupportm").val(sMessages[2]);
	$("#nsupporta").val(sMessages[3]);
	if(sMessages[4]){
		$("#autosub").attr("checked", "checked");
	} else {
		$("#autosub").removeAttr("checked");
	}

    
    if(isEnabled && location.href.indexOf("discuss/search/?") > -1 && location.href.indexOf("action=show_user") > -1){
        $(".tclcon a, .tcr a").each(function(){
           $(this).attr("href", $(this).attr("href")+"unread/"); 
        });
    }
    
	if(isEnabled && $(".linkst li").eq(1).text().toLowerCase().indexOf("suggestions")>-1){
		$(".blockpost.roweven.firstpost").each(function(){
			// messy, gotta fix later
			var id=Math.floor(Math.random()*10000000);
			var form = $("<form></form>");
			var support = $("<label></label><input type='radio' />");
			support.eq(0).attr("for", "s"+id+"1").text("| Support ").css({"background":"none","border":"none","padding":"0","margin":"0","color":"green"});
			support.eq(1).attr("id", "s"+id+"1").addClass('support').attr("name", "r"+id).css("vertical-align","middle");
			var nsupport = $("<label></label><input type='radio' />");
			nsupport.eq(0).attr("for", "s"+id+"2").text("| No Support ").css({"background":"none","border":"none","padding":"0","margin":"0","color":"red"});
			nsupport.eq(1).attr("id", "s"+id+"2").addClass('nsupport').attr("name", "r"+id).css("vertical-align","middle");
			var asper = $("<label></label><input type='checkbox' />");
			asper.eq(0).attr("for", "ap"+id).text("| As per this ").css({"background":"none","border":"none","padding":"0","margin":"0","font-weight":"bold"});
			asper.eq(1).attr("id", "ap"+id).attr("name", "ap"+id).addClass("asper").css("vertical-align","middle");
			var btnSubmit = $("<a href='javascript:void(0)'>Go &gt;</a>").attr("id", "btn"+id);
			id = $(this).attr("id").substr(1);
			username = $(this).find(".username").text();
			btnSubmit.click(function(){
				var text = "";
				var area=$("#id_body");
				area.val("");
				sbtn = $(this);
				$.ajax("/discuss/post/"+id+"/source/").done(function(data){
					var support = sbtn.parent().find(".support").is(":checked");
					var nsupport = sbtn.parent().find(".nsupport").is(":checked");
					var asper = sbtn.parent().find(".asper").is(":checked");
					console.log([support, nsupport, asper]);
					tinitial = asper ? "[quote="+username+"]"+data+"[/quote]\n": "";
					tsup = support ? (asper ? sMessages[1]:sMessages[0])+"\n" : (nsupport ? (asper ? sMessages[3]:sMessages[2])+"\n": "");
					area.val(tinitial+tsup+prompt("Enter extra reason or hit enter to continue"));
					location.hash="";
					location.hash="postarea";
					if(sMessages[4]){
						$("#post .form-submit button").trigger("click");
					}
				});
			});
			$(this).find(".postfootright ul").append($("<li></li>").append(support).append(nsupport).append(asper).append("&nbsp;|&nbsp;").append(btnSubmit));
		});
		$("#post").prepend($("<a name='postarea' style='height:0px'></a>"));
	}
}
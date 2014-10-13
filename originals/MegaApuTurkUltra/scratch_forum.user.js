// ==UserScript==
// @name         Scratchy Forums
// @namespace    http://aputurk.tk/
// @version      0.1
// @description  Adds some awesome features to Scratch forums
// @author       MegaApuTurkUltra
// @match        http://scratch.mit.edu/*
// @grant        none
// ==/UserScript==

$(document).ready(function(){
	sMessages = ["Support!", "Support as per this", "No support", "No support as per this", false];
	if(typeof localStorage != 'undefined' && typeof localStorage.sMessages != 'undefined'){
		sMessages = JSON.parse(localStorage.sMessages);
	}
	
	var dlg = $("<div title='Support Messages ' style='background:#eee'></div>");
	dlg.append("Support:<br/> <textarea id='supportm'></textarea><br/>");
	dlg.append("Support as per:<br/> <textarea id='supporta'></textarea><br/>");
	dlg.append("No support:<br/> <textarea id='nsupportm'></textarea><br/>");
	dlg.append("No support as per:<br/> <textarea id='nsupporta'></textarea><br/>");
	dlg.append("<label for='autosub'>Auto submit:</label><input type='checkbox' id='autosub' /><br/>");
	dlg.append($("<button id='supportmsub'>Save</button>").button().click(function(){
		dlg.dialog("close");
		sMessages[0]=$("#supportm").val();
		sMessages[1]=$("#supporta").val();
		sMessages[2]=$("#nsupportm").val();
		sMessages[3]=$("#nsupporta").val();
		sMessages[4]=$("#autosub").is(":checked");
		localStorage.sMessages = JSON.stringify(sMessages);
	}));
	dlg.appendTo($(document.body));
    dlg.dialog({modal:true,autoOpen:false});
	
	var edit = $("<a href='javascript:void(0)'>Edit Support Messages</a>");
	$("<li></li>").append(edit).insertBefore($(".user-nav .logout"));
	edit.click(function(){
		$("#supportm").val(sMessages[0]);
		$("#supporta").val(sMessages[1]);
		$("#nsupportm").val(sMessages[2]);
		$("#nsupporta").val(sMessages[3]);
		if(sMessages[4]){
			$("#autosub").attr("checked", "checked");
		} else {
			$("#autosub").removeAttr("checked");
		}
		dlg.dialog("open");
	});
    
    var myTopix = $("<a href='/discuss/search/?action=show_user&show_as=topics'>My Topics</a>");
	$("<li></li>").append(myTopix).insertBefore($(".user-nav .logout"));
    
    if(location.href.indexOf("discuss/search/?")>-1 && location.href.indexOf("action=show_user") > -1){
        $(".tclcon a, .tcr a").each(function(){
           $(this).attr("href", $(this).attr("href")+"unread/"); 
        });
    }
    
	if($(".linkst li").eq(1).text().toLowerCase().indexOf("suggestions")>-1){
	$(".blockpost.roweven.firstpost").each(function(){
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
});

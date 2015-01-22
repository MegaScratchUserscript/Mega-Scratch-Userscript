// ==UserScript==
// @name         Scratchultimate
// @version      0.2.1
// @description  Useful Stuff
// @author       GRA0007
// @contributor  TheGameBuilder
// @match        http://scratch.mit.edu/*
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        none
// ==/UserScript==

if(document.URL.indexOf("mystuff/") >= 0){ 
    waitForKeyElements ("#tabs", appendSidebarItems);
}

if(document.URL.indexOf("users/") >= 0){ 
    waitForKeyElements ("#featured-project", liveFeaturedProject);
    
    $('.stage iframe').load(function(){
        var is404 = $(this).contents().find('#page-404').length > 0;
        if(is404) {
            $('.stage div').css('height', '211px');
            $(this).css('margin-top', '-14px');
            $(this).attr('height', '239');
        	$(this).attr('src', 'http://phosphorus.github.io/app.html?id=' + projID);
        }
        else if($(this).attr('src').indexOf('http://scratch.mit.edu/projects/embed/') > -1) {
            setTimeout(function(){$('.stage iframe').attr('height', '238')}, 200);
        }
    });
    $('.stage iframe').attr("src", "http://scratch.mit.edu/projects/embed/" + projID + "/?autostart=true");
}

function appendSidebarItems(jNode) {
    jNode.append( "<li data-tab='myTopics'><a href='http://scratch.mit.edu/discuss/search/?action=show_user&show_as=topics'>My Topics</a></li>" );
}

function liveFeaturedProject(jNode) {
    var $projName = $('.project-name');
    $('.player .title').css('text-align', 'center');
    $projName.html($projName.html().trim()); //Make sure no whitespaces interefere with centering
    
    jNode.remove();
    projID = Scratch.INIT_DATA.PROFILE.featuredProject.id;
    
    $( ".stage" ).append( "<div style='overflow: hidden; height: 216px;' id='applet'><iframe style='margin-top: -25px;' allowtransparency='true' width='282' height='237' frameborder='0' allowfullscreen=''></iframe></div>" );
}

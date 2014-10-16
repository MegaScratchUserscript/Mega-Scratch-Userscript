// ==UserScript==
// @name         Scratchultimate
// @version      0.2.1
// @description  Useful Stuff
// @author       GRA0007
// @match        http://scratch.mit.edu/*
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        none
// ==/UserScript==

if(document.URL.indexOf("mystuff/") >= 0){ 
    waitForKeyElements ("#tabs", appendSidebarItems);
}

if(document.URL.indexOf("users/") >= 0){ 
    waitForKeyElements ("#featured-project", liveFeaturedProject);
}

function appendSidebarItems(jNode) {
    jNode.append( "<li data-tab='myTopics'><a href='http://scratch.mit.edu/discuss/search/?action=show_user&show_as=topics'>My Topics</a></li>" );
}

function liveFeaturedProject(jNode) {
    jNode.remove();
    var projID = Scratch.INIT_DATA.PROFILE.featuredProject.id
    var usid = Scratch.INIT_DATA.PROFILE.featuredProject.creator
    $( ".stage" ).append( "<iframe allowtransparency='true' width='282' height='210' src='http://scratch.mit.edu/projects/embed/" + projID + "/?autostart=true' frameborder='0' allowfullscreen=''></iframe>" );
}

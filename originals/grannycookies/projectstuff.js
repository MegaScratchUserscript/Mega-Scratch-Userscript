// helpful functions for extra buttons on project pages

// gets project id
function projectId(url) {
	return document.URL.substring(32,40);
}

// opens project in phosphorus
function openPhosphorus(projectid, turbo, fullscreen) {
	window.location = 'http://phosphorus.github.io/app.html?id='+projectid+'&turbo='+turbo+'&full-screen='+fullscreen;
}

// view scratchblocks using blob's generator
function openScratchblocks(projectid) {
	window.location = 'http://blob8108.github.io/scratchblocks2/generator/#project='+projectid;
}

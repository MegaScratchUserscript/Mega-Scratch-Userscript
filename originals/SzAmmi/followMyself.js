//Run on: *//scratch.mit.edu/users/*/

url = window.location.href;
yourUsername = Scratch.INIT_DATA.LOGGED_IN_USER.model.username;
usernameFromURL = url.substring(url.lastIndexOf("users/")+6,url.lastIndexOf("/"));

if (typeof(localStorage['following_myself']) === "undefined") { localStorage['following_myself'] = false; }
divClass = localStorage['following_myself'] == "false" ? "follow-button button notfollowing blue" : "follow-button button following grey";
dataControl = localStorage['following_myself'] == "true" ? "unfollow" : "follow";

Scratch.changeStatusForMyself = function() {
  if (localStorage['following_myself'] == "true") {
    localStorage['following_myself'] = false;
    return;
  }
  localStorage['following_myself'] = true;
}

$(".header-text").after('<div id="follow-button" class="buttons"><div class="' + divClass + '" data-control="' + dataControl + '" onClick="Scratch.changeStatusForMyself()"><span class="follow text"><span class="icon-sm follower white"></span>Follow</span><span class="unfollow text"><span class="icon-sm follower black"></span>Unfollow</span></div></div>');

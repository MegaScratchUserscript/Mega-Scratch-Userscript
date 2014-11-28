// ==UserScript==
// @name         Scratch Search Fixes
// @version      0.3
// @description  Uses loads of AJAX to make Scratch's search not useless
// @author       NickyNouse
// @match        http://scratch.mit.edu/search/google_results*
// @grant        none
// ==/UserScript==
var searchstyle = '<style>'
	 + '.search_results ul {min-height: initial;}'
	 + '.bigthumb img {width: 144px;}'
	 + '.user img {width: 144px !important; height: 144px !important;}'
	 + '.thumb td {vertical-align: top; padding: 2px;}'
	 + '.thumb .title {font-size: 120% !important; font-style: italic; font-weight: normal; color: #aaa;}'
	 + '.thumb .title a {display: inline !important; font-weight: bold; font-style: normal;}'
	 + '.forum .box-head {padding: 5px !important;}'
	 + '.searchcontent {min-width: 400px;}'
	 + '.stat {font-size: 11px; display: block; min-width: 55px; color: #666;}'
	 + '.inline .stat {display: inline-block; padding: 0 5px;}'
	 + '.inline .stat:not(:last-child)::after {content: "|"; display: inline-block; margin-left: 10px;}'
	 + '.stat .icon-xs {vertical-align: middle; margin: 0px; opacity: .4;}'
	 + '.searchthumbcontainer {background: #ddd; border-radius: 5px; padding: 10px 1px 3px 10px; margin-top: 5px; display: inline-block; box-shadow: 0 0 6px #aaa inset;}'
	 + '.searchthumbcontainer a {display: inline-block; margin-right: 10px;}'
	 + '.searchthumbcontainer img {width: 50px !important; height: auto !important; box-shadow: 0 0 4px #aaa; border: none;}'
	 + '.searchthumbcontainer iframe {display: none;}'
	 + '</style>';
$('head').append(searchstyle);

var searchintervals = [];
function searchFunc() {
	var searchhasclass = false;
	$('.gsc-tabdActive .gsc-webResult:not(:first)').each(function (index, value) {
		if (!$(value).hasClass('searchmodded')) {
			searchhasclass = true;
		}
	});
	if ($('.gsc-tabdActive .gsc-webResult').length > 0 && searchhasclass) {
		$('.gsc-tabdActive .gsc-webResult:not(:first)').each(function (index, value) {
			$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).addClass('searchmodded');
			if ($(value).find('a.gs-title').length > 0) {
				var href = $(value).find('a.gs-title').attr('href');
				if (href.slice(-1) == '/') {
					href = href.slice(0, -1)
				}
				if (href.match('remixes') != null) {
					//$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).hide();
				} else if (href.match('projects') != null && href.match('studios') != null) {
					//$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).hide();
				} else if (href.match(/users\/[^\/]+\/\w/) != null) {
					//$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).hide();
				} else if (href.match(/starter/) != null) {
					//$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).hide();
				} else {
					if (href.indexOf('projects') != -1) {
						var projectnum = href.match(/\/\d+/)[0].slice(1);
						var searchcontent = '';
						var searchimg = 'http://cdn2.scratch.mit.edu/get_image/project/' + projectnum + '_144x108.png';
						var searchtitle = '<span class="title"><a href="' + href + '">'
							 + $(value).find('a.gs-title').text().slice(0, $(value).find('a.gs-title').text().indexOf(' on Scr')) + '</a> (project)</span>';
						searchcontent += searchtitle;
						$.ajax({
							url : href,
							success : function (result) {
								var ajaxcontent = '';
								result = $(result).children().eq(1);
								var searchowner = result.find('#author a').text();
								searchowner = '<span class="owner"><a href="/users/' + searchowner + '">' + searchowner + '</a></span>';
								ajaxcontent += searchowner;
								var searchshared = '<span class="stat">' + result.find('.date-shared').text().slice(8) + '</span>';
								ajaxcontent += searchshared;
								var searchinline = '';
								var searchviews = '<span class="stat"><span class="icon-xs black view"></span>' + result.find('#stats .views').text() + '</span>';
								searchinline += searchviews;
								var searchfavs = '<span class="stat"><span class="icon-xs black favorite"></span>' + result.find('#stats .favorite').text() + '</span>';
								searchinline += searchfavs;
								var searchloves = '<span class="stat"><span class="icon-xs black love"></span>' + result.find('#stats .love').text() + '</span>';
								searchinline += searchloves;
								$(result).find('h4').each(function (index2, value2) {
									if ($(value2).text().indexOf('Comments') != -1) {
										var searchcomments = '<span class="stat"><span class="icon-xs black comment"></span>' + $(value2).text().match(/\(\d+\)/)[0].slice(1, -1) + '</span>';
										searchinline += searchcomments;
									}
								});
								ajaxcontent += '<div class="inline">' + searchinline + '</div>';
								var searchdescription = result.find('#description .overview').text().replace(/(\r\n|\n|\r|\s)/gm, " ").substring(0, 330);
								if (searchdescription.length == 330) {
									searchdescription += '...'
								}
								searchdescription = '<span class="stat" style="color: black;">' + searchdescription + '</span>';
								ajaxcontent += searchdescription;
								$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).find('.searchcontent').append(ajaxcontent);
							}
						});
						var table = $('<table cellpadding="4" class="thumb bigthumb item"><tr><td class="searchimage"><a href="' + href + '"><img src="'
								 + searchimg + '"/></a></td><td class="searchcontent"></td></tr></table>');
						table.find('.searchcontent').append(searchcontent);
						$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).empty().append(table);
					} else if (href.indexOf('users') != -1) {
						var username = href.match(/users\/[^\/]+/)[0].substring(6);
						$.ajax({
							url : href,
							success : function (result) {
								result = $(result).children().eq(1);
								var searchcontent = '';
								var searchusername = '<span class="title"><a href="' + href + '">' + username + '</a> (user)</span>';
								searchcontent += searchusername;
								var searchdetails = result.find('#profile-data .profile-details').text().replace(/(\r\n|\n|\r)+/gm, " | ").replace(/\|\s+\|/gm, '').replace(/\s{2,}/gm, ' ').slice(0, -2);
								searchcontent += searchdetails;
								$(result).find('h4').each(function (index2, value2) {
									if ($(value2).text().indexOf('Shared Projects') != -1) {
										var searchinline = '';
										searchinline = '<span class="stat"><span class="icon-xs black project"></span><a href="' + href + '/projects/">' + $(value2).text().match(/\(\d+\)/)[0].slice(1, -1) + ' projects</a></span>'
											searchcontent += '<div class="inline">' + searchinline + '</div>'
									}
								});
								var searchabout = '<span class="stat" style="color: black;">' + result.find('#bio-readonly .overview').text() + '</span>';
								searchcontent += searchabout;
								$.ajax({
									url : href + '/followers/',
									success : function (result2) {
										result2 = $(result2).children().eq(1);
										var searchfollowercount = result2.find('h2');
										searchfollowercount.find('a').remove();
										searchfollowercount = searchfollowercount.text().replace(/(\r\n|\n|\r|\s)/gm, "").slice(11, -1) + ' followers';
										searchfollowercount = '<span class="stat"><span class="icon-xs black follow"></span><a href="' + href + '/followers/">' + searchfollowercount + '</a></span>'
											$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).find('.inline').append(searchfollowercount);
									}
								});
								var searchimg = result.find('#profile-avatar img').attr('src').replace('60x60', '144x144');
								var table = $('<table cellpadding="4" class="thumb user item"><tr><td class="searchimage"><a href="' + href + '"><img src="'
										 + searchimg + '"/></a></td><td class="searchcontent"></td></tr></table>');
								table.find('.searchcontent').append(searchcontent);
								$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).empty().append(table);
							}
						});
					} else if (href.indexOf('studios') != -1) {
						var projectnum = href.match(/\/\d+/)[0].slice(1);
						var searchcontent = '';
						$.ajax({
							url : href,
							success : function (result) {
								result = $(result).children().eq(1);
								var searchimg = $(result).find('#gallery-cover-image img').attr('src');
								$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).find('.searchimage img').attr('src', searchimg);

								var ajaxcontent = '';
								var searchtitle = $(result).find('h2').first().text();
								searchtitle = '<span class="title"><a href="' + href + '">' + searchtitle + '</a> (studio)</span>';
								ajaxcontent += searchtitle;
								var searchprojcount = '<span class="stat"><span class="icon-xs black project"></span>' + $(result).find('#tabs li:first').find('span').text() + ' projects</span>';
								ajaxcontent += searchprojcount;
								var searchdescription = result.find('#description .overview').text().replace(/(\r\n|\n|\r|\s)/gm, " ").substring(0, 330);
								if (searchdescription.length == 330) {
									searchdescription += '...'
								}
								searchdescription = '<span class="stat" style="color: black;">' + searchdescription + '</span>';
								ajaxcontent += searchdescription;

								$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).find('.searchcontent').append(ajaxcontent);

								if (parseInt($(result).find('#tabs li:first').find('span').text()) != 0) {
									var container = $('<div class="searchthumbcontainer"/>');
									var iframe = $('<iframe src="' + href + '"/>');
									container.append(iframe);
									$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).find('.searchcontent').append(container);
									searchintervals[index] = window.setInterval(function () {
											searchcheckloaded(iframe, index, href)
										}, 300); //this is the worst way to do this, but .load() wasn't working
								}
							}
						});

						var table = $('<table cellpadding="4" class="thumb bigthumb item"><tr><td class="searchimage"><a href="' + href + '"><img/></a></td><td class="searchcontent"></td></tr></table>');
						table.find('.searchcontent').append(searchcontent);
						$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).empty().append(table);

					} else if (href.indexOf('/discuss/') != -1) {
						href = href.replace('/m/', '/');
						var searchposttype;
						if (href.match(/topic/) == null) { //POST
							$.ajax({
								url : href,
								success : function (result) {
									var ajaxcontent = '';
									result = $(result).children().eq(1);
									var postnum = '#p' + href.match(/\/post\/\d+/)[0].slice(6);
									var title = result.find('.linkst ul li:last').text().replace(/(\r\n|\n|\r|\s+)/gm, " ").slice(2) + ' - post ' + result.find(postnum + ' .conr').text();
									title = '<span class="title"><a href="' + href + '">' + title + '</a> (forum post)</span>';
									ajaxcontent += title;
									var searhshare = '<span class="stat">Posted ' + result.find(postnum + ' .box-head a').text() + ' by ' + result.find(postnum + ' .postleft dt').html().replace('class="black username"', '') + '</span>';
									ajaxcontent += searhshare;
									//var searchviews = '<span class="stat"><span class="icon-xs black view"></span>' + /*result.find('#stats .views').text()*/0 + '</span>';
									//ajaxcontent += searchviews;
									ajaxcontent += '<span class="searchstats"></span>';
									var searchpostpreview = result.find(postnum + ' .postmsg').text().replace(/(\r\n|\n|\r|\s)/gm, " ").substring(0, 330);
									if (searchpostpreview.length == 330) {
										searchpostpreview += '...'
									}
									ajaxcontent += '<span class="stat" style="color: black;">' + searchpostpreview + '</stat>';
									$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).empty().append('<div class="thumb">' + ajaxcontent + '</div>');
									if ($(result).children().eq(1).find('.pagination').length && $(result).children().eq(1).find('.pagination').children().last().prop('tagName') == 'A') {
										var pagecount = 'http://scratch.mit.edu'
											 + $(result).children().eq(1).find('.follow-button').attr('href').replace('/subscription', '').replace('/add/', '')
											 + '?page='
											 + $(result).children().eq(1).find('.pagination').children().slice(-2, -1).text();
										$.ajax({
											url : pagecount,
											success : function (result2) {
												result2 = $(result2).children().eq(1);
												var replycount = result2.find('.blockpost .conr').last().text().slice(1);
												var searchreplies = '<span class="stat"><span class="icon-xs black project"></span>' + replycount + ' posts</span>';
												$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).find('.searchstats').append(searchreplies);
											}
										});
									} else {
										var replycount = result.find('.blockpost .conr').last().text().slice(1);
										var searchreplies = '<span class="stat"><span class="icon-xs black project"></span>' + replycount + ' posts</span>';
										$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).find('.searchstats').append(searchreplies);
									}
								}
							});
						} else { //TOPIC
							$.ajax({
								url : href,
								success : function (result) {
									var ajaxcontent = '';
									result = $(result).children().eq(1);
									var title = result.find('.linkst ul li:last').text().replace(/(\r\n|\n|\r|\s+)/gm, " ").slice(2);
									title = '<span class="title"><a href="' + href + '">' + title + '</a> (forum topic)</span>';
									ajaxcontent += title;
									var searhshare = '<span class="stat">Posted ' + result.find('.blockpost .box-head a').slice(0, 1).text() + ' by ' + result.find('.blockpost .postleft dt').slice(0, 1).html().replace('class="black username"', '') + '</span>';
									ajaxcontent += searhshare;
									//var searchviews = '<span class="stat"><span class="icon-xs black view"></span>' + /*result.find('#stats .views').text()*/0 + '</span>';
									//ajaxcontent += searchviews;
									var pagecount = 1;
									if ($(result).children().eq(1).find('.pagination').length) {
										pagecount = $(result).children().eq(1).find('.pagination').children().slice(-2, -1).text();
									}
									$.ajax({
										url : href + '?page=' + pagecount,
										success : function (result2) {
											result2 = $(result2).children().eq(1);
											var replycount = result2.find('.conr').slice(-2, -1).text().slice(1);
											var searchreplies = '<span class="stat"><span class="icon-xs black project"></span>' + replycount + ' posts</span>';
											$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).find('.searchstats').append(searchreplies);
										}
									});
									ajaxcontent += '<span class="searchstats"></span>';
									var searchpostpreview = result.find('.blockpost .postmsg').slice(0, 1).text().replace(/(\r\n|\n|\r|\s)/gm, " ").substring(0, 330);
									if (searchpostpreview.length == 330) {
										searchpostpreview += '...'
									}
									ajaxcontent += '<span class="stat" style="color: black;">' + searchpostpreview + '</stat>';
									$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).empty().append('<div class="thumb">' + ajaxcontent + '</div>');
								}
							});
						}
					}
				}
			}
		});
	}
}

function searchcheckloaded(iframe, index, href) {
	if (iframe.contents().find('#page-scroll-content').find('div > a').length) {
		var searchcontent = '';
		var thumbs = iframe.contents().find('#page-scroll-content').find('div > a').slice(0, 5);
		thumbs.each(function (index, value) {
			searchcontent += '<a href="' + $(value).attr('href') + '"><img src="http://cdn2.scratch.mit.edu/get_image/project/' + $(value).attr('href').replace('/projects/', '') + '_50x37.png"/></a>';
		})
		searchcontent += '<a href="' + href + '"><img src="http://cdn2.scratch.mit.edu/get_image/project/34841368_50x37.png"/></a>';
		$('.gsc-tabdActive .gsc-webResult:not(:first)').eq(index).find('.searchthumbcontainer').append(searchcontent);
		iframe.remove();
		searchintervals[index] = window.clearInterval(searchintervals[index]);
	}
}

var searchobserver = new MutationObserver(function (mutations) {
		//searchinterval = window.setInterval(searchFunc, 100);
		searchFunc();
		//searchobserver = null;
	});

searchobserver.observe($('.search_results')[0], {
	'childList' : true,
	'subtree' : true,
});

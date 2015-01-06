function loadPhos() {
$('#load-with-flash').each(function() {
    $(this).remove();
});

$( ".active" ).append( '<div id="load-with-flash" class="action tooltip bottom" style="" onclick="loadNorm()";><span class="hovertext"><span class="arrow"></span>Load this project with the Flash Player</span><span>Revert</span></div>' );

$( ".buttons" ).hide();
$( ".player" ).hide();
var script = document.createElement('script');
script.src = 'https://phosphorus.github.io/embed.js?id=' + Scratch.INIT_DATA.PROJECT.model.id + '&auto-start=true&light-content=false';
var first = document.getElementsByClassName('player')[0];
first.parentNode.insertBefore(script, first);
}

function loadNorm() {
$('#load-with-pho').each(function() {
    $(this).remove();
});

$( ".active" ).append( '<div id="load-with-pho" class="action tooltip bottom" style="" onclick="loadPhos()";><span class="hovertext"><span class="arrow"></span>Load this project with Phosphorus</span><span>Phosphorus</span></div>' );

$( ".buttons" ).show();
$( ".player" ).show();
var script = document.createElement('script');
script.src = 'https://phosphorus.github.io/embed.js?id=' + Scratch.INIT_DATA.PROJECT.model.id + '&auto-start=true&light-content=false';
var first = document.getElementsByClassName('player')[0];
first.parentNode.insertBefore(script, first);
}

function loadWithPho() {
$( ".buttons" ).remove();
$( ".player" ).empty();
var script = document.createElement('script');
script.src = 'https://phosphorus.github.io/embed.js?id=' + Scratch.INIT_DATA.PROJECT.model.id + '&auto-start=true&light-content=false';
var first = document.getElementsByClassName('player')[0];
first.parentNode.insertBefore(script, first);
}

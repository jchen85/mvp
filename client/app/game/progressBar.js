var width = $("#progressBar").width(),
    aspect = 500 / 950;

var svg = d3.select("#progressBar").append("svg")
  .attr("preserveAspectRatio", "xMidYMid")
  .attr("viewBox", "0 0 950 500")
  .attr("width", width)
  .attr("height", width * aspect);

$(window).resize(function() {
  var width = $(".map").width();
  svg.attr("width", width);
  svg.attr("height", width * aspect);
});

svg.append('rect')
  .attr('width', 20)
  .attr('height', 20)
  .style('color', 'blue');
var margin = {top: 20, right: 20, bottom: 20, left:40}
  width = 500 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

var xscale = d3.scale.linear()
  .rangeRound([width, 0]);

var yscale = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

var colour = d3.scale.ordinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var xaxis = d3.svg.axis()
  .scale(xscale)
  .orient("bottom")
  .tickFormat(d3.format("0%"));

var yaxis = d3.svg.axis()
  .scale(yscale)
  .orient("left")

var svg = d3.select("#consumption_stack")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

d3.json("consumption.json", function(error, data){
  if (error) return console.warn(error);
consumption = data
console.log(consumption[1995]["Totaal"]);

// add colour domain
// color.domain(d3.keys(data[0]).filter(function(key) { return key !== "State"; }));
//
//   data.forEach(function(d) {
//     var y0 = 0;
//     d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
//     d.ages.forEach(function(d) { d.y0 /= y0; d.y1 /= y0; });
//   });

xaxis.domain(consumption.1995.Totaal)


})

// define margins
var margin = {top: 30, right: 20, bottom: 70, left: 60},
	width = 400 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;
// define x-scale
var xscale = d3.scale.ordinal()
	.rangeRoundBands([0,width], .1);
// define y-scale
var yscale = d3.scale.linear().range([height, 0]);
	// define X axis
var xaxis = d3.svg.axis()
    .scale(xscale)
    .orient("bottom");
// define Y axis
var yaxis = d3.svg.axis()
    .scale(yscale)
    .orient("left")
    //.ticks(10, "%");
// select svg
var svg = d3.select("#consumption")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");
//import dataset
d3.json("consumption.json", function(error, data){
	if (error) return console.warn(error);
consumption = data
//console.log(consumption[1995]["Totaal"]);

	 // define domain from data
	 xscale.domain([1990, 2014]).rangeRoundBands([0,width], .05);
	 yscale.domain([0, 5000])
		.range([height, 0]);
	 // append x axis
	 svg.append("g")
	 		.attr("class", "x axis")
	 		.attr("transform", "translate(0,"+ height + ")")
	 		.call(xaxis)
	 	//.selectAll("text")
	 	// append y axis
	   svg.append("g")
	       .attr("class", "y axis")
	       .call(yaxis)
	     .append("text")
	       .attr("transform", "rotate(-90)")
	       .attr("y", -35)
	       .attr("dy", ".71em")
	       .style("text-anchor", "middle")
	       .text("Year");
	 	// append bars
	 	svg.selectAll(".bar")
	 			.data(data)
	 		.enter().append("rect")
	 			.attr("class", "bar")
	 			.attr("x", function(d) { return xscale(d.key); })
				.attr("width", xscale.rangeBand())
	 			.attr("y", function(d) { return d.key.Totaal })
	 			.attr("height", function(d) {return height - (d.key.Totaal); })
});

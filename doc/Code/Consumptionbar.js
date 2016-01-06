// define margins
var margin = {top: 30, right: 20, bottom: 70, left: 60},
	width = 400 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;
// define x-scale
var x-scale = d3.scale.ordinal()
	.rangeRoundBands([0,width], .1);
// define y-scale
var y-scale = d3.scale.lineair()
	.range([height, 0]);
	// define X axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
// define Y axis
var yAxis = d3.svg.axis()
    .scale(y)
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
d3.json("consumption.json", type, function(error, data){
	if (error) return console.warn(error);

	// define domain from data
	x-scale.domain(data.map(function(d) { return d.letter; }));
	y-scale.domain([0, d3.max(data, function(d) { return d.frequency; })]);
	// append x axis
	svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0,"+ height + ")")
			.call(xAxis)
		//.selectAll("text")
		// append y axis
	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
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
				.attr("x", function(d) {return x(d.key); })
				.attr("y", function(d) {return y(d.value); })
				.attr("height", function(d) {return height - y(d.value); })
})

function retrievedata(data){
	var data_list = []
	for (var i = 1995; i < 2015; i++){
		var dict = {}
		dict["year"] = i
		dict["total"] = parseInt(data[i]["Totaal finaal verbruik"])
		data_list.push(dict)
		}
		console.log(data_list)
		return data_list
}

//import dataset
d3.json("consumption.json", drawBarchart);

function drawBarchart(data){
	//if (error) return console.warn(error);
consumption = retrievedata(data)
//console.log('consumption: ', consumption)
// define margins
var margin = {top: 30, right: 20, bottom: 70, left: 60},
	width = 800 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;
// define x-scale
var xscale = d3.scale.ordinal().rangeRoundBands([0,width], .1);
// define y-scale
var yscale = d3.scale.linear().range([height, 0]);

// select svg
var svg = d3.select("#consumption")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

			// define X axis
		var xaxis = d3.svg.axis()
		    .scale(xscale)
		    .orient("bottom");
		// define Y axis
		var yaxis = d3.svg.axis()
		    .scale(yscale)
		    .orient("left")
		    //.ticks(10, "%");

	 // define domain from data
	 xscale.domain(consumption.map(function(d) { return d.year; }));
	 yscale.domain([0, d3.max(consumption, function(d) {return d.total; })])
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
	       .text("PJ");
//console.log(retrievedata(consumption));
	 	//append bars
			svg.selectAll(".bar")
	 			.data(consumption)
				.enter().append("rect")
	 			.attr("class", "bar")
	 			.attr("x", function(d) { return xscale(d.year); })
				.attr("width", xscale.rangeBand())
	 			.attr("y", function(d) { return yscale(d.total) })
	 			.attr("height", function(d) {return height - yscale(d.total); })
				.on("click", function() {
					console.log("rect");
				  d3.event.stopPropagation();
				});
};

// sources
// http://jsfiddle.net/bxW9T/17/
// http://bl.ocks.org/mbostock/3885304
//

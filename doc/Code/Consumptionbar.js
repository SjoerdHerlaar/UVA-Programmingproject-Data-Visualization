function retrievex(data){
	var years = []
	for (var i = 1995; i < 2015; i++){
		years.push(i)
	}
	return years
}

function retrievey(data){
	var Totaal = []
	for (var i = 1995; i < 2015; i++){
		Totaal.push(parseInt(data[i]["Totaal finaal verbruik"]))
	}
	return Totaal
}

function retrievedata(data){
	var data_list = []
	for (var i = 1995; i < 2015; i++){
		var dict = {}
		dict["year"] = i
		dict["total"] = parseInt(data[i]["Totaal finaal verbruik"])
		data_list.push(dict)
		}
		console.log(data_list)
}

//import dataset
d3.json("consumption.json", function(error, data){
	if (error) return console.warn(error);
consumption = retrievedata(data)

// define margins
var margin = {top: 30, right: 20, bottom: 70, left: 60},
	width = 400 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;
// define x-scale
var xscale = d3.scale.ordinal()
	.rangeRoundBands([0,width], .1);
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
	 xscale.domain(d3.map(consumption, function(d) { return d.year; }));
	 yscale.domain([0, d3.max(consumption, function(d) { return d.total; })])
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
//console.log(retrievedata(consumption))
	 	//append bars
			svg.selectAll(".bar")
	 			.data(consumption)
				.enter().append("rect")
	 			.attr("class", "bar")
	 			.attr("x", function(d) { return xscale(d.year); })
				.attr("width", xscale.rangeBand())
	 			.attr("y", function(d) {console.log(d.total); return d.total })
	 			.attr("height", function(d) {return height - (d.total); })
});

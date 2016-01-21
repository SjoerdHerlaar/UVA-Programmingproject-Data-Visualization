function retrievedata(data){
	var data_list = []
	for (var i = 2000; i < 2015; i++){
		var dict = {}
		dict["year"] = i
		dict["total"] = parseInt(data[i]["Totaal (stationair + mobiel)"])
		data_list.push(dict)
		}
		return data_list
}

//import dataset
d3.json("emissies.json", drawBarchart);

function drawBarchart(data){

var production = retrievedata(data)

// define margins
var margin = {top: 30, right: 20, bottom: 70, left: 60},
	width = 600 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;
// define x-scale
var xscale = d3.scale.ordinal().rangeRoundBands([0,width], .1);
// define y-scale
var yscale = d3.scale.linear().range([height, 0]);

// select svg
var svg = d3.select("#Production")
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

		var tip = d3.tip()
		  	.attr('class', 'd3-tip')
		  	.offset([-10, 0])
		  	.html(function(d) { return "<strong>year:</strong> <span style='color:red'>" + d.total + "</span>";
		  })

	 // define domain from data
	 xscale.domain(production.map(function(d) { return d.year; }));
	 yscale.domain([0, d3.max(production, function(d) {return d.total; })])
		.range([height, 0]);
	 // append x axis
	 svg.append("g")
	 		.attr("class", "x axis")
	 		.attr("transform", "translate(0,"+ height + ")")
	 		.call(xaxis)
			.call(tip);
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
	       .text("Kilo CO2");

	 	//append bars
			svg.selectAll(".bar")
	 			.data(production)
				.enter().append("rect")
	 			.attr("class", "bar")
				.attr("id", function(d) {return d.year})
	 			.attr("x", function(d) { return xscale(d.year); })
				.attr("width", xscale.rangeBand())
	 			.attr("y", function(d) { return yscale(d.total) })
	 			.attr("height", function(d) {return height - yscale(d.total); })
				.on('mouseover', tip.show)
      	.on('mouseout', tip.hide)
				.on("click", function() {
					console.log(this.id);
				  d3.event.stopPropagation();
					drawPiechart(data, this.id)
				});
};

// sources
// http://jsfiddle.net/bxW9T/17/
// http://bl.ocks.org/mbostock/3885304
//

function retrievedetails (data, year){
  var data_list = []
  var details = d3.entries(data[year])
  for (var i = 0; i < 24; i++){
    if (details[i]["key"] == "Totaal finaal verbruik"){continue};
    if (details[i]["key"] == "Totaal") {continue};
    var market = {
      name : details[i]["key"],
			value : parseFloat(details[i]["value"]),
    }
    data_list.push(market);
  }
  return data_list
}

var width = 800,
    height = 400,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) { return d.value})

function drawPiechart(data, year){

var details = retrievedetails(data, year)

var svg = d3.select("#Productiondonut")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

var g = svg.selectAll(".arc")
    .data(function(d){ return pie(details)})
  .enter().append("g")
    .attr("class", "arc");

g.append("path")
  .attr("d", arc)
  .style("fill", function(d) { return color(d.data.name)});
};

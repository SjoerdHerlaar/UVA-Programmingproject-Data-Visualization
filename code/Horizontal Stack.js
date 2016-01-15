function retrievedata(data, year){
	var data_list = []
	var details = d3.entries(data[year])
	//console.log(details)
	var xoffset = 0
	for (var i = 0; i < 24; i++) {
		var market = {
			name : details[i]["key"],
			value : parseFloat(details[i]["value"]),
			x : xoffset,
			y : 100
		}
		xoffset += market["value"]
		data_list.push(market)
	}
		//console.log(data_list)
		return data_list
}

d3.json("consumption.json", stacked_chart);

function stacked_chart(data){

// retrieve data
var stackedData = retrievedata(data, "1998")

var margin = {top: 20, right: 20, bottom: 20, left:40}
  width = 800 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

var xscale = d3.scale.linear()
  .rangeRound([0, width]);

var yscale = d3.scale.ordinal()
  .rangeRoundBands([height, 0],.1);

var colour = d3.scale.ordinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c",
	"#ff8c00", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c",
	"#ff8c00", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c",
	"#ff8c00"]);

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



			xscale.domain(stackedData.map(function(d) { return d.x; }));
			yscale.domain([0]);

			console.log(stackedData)
			console.log(xscale.domain())
			console.log(yscale.domain())

		svg.append("g")
			 .attr("class", "x axis")
			 .attr("transform", "translate(0,"+ height + ")")
			 .call(xaxis)

			 // append axis
		svg.append("g")
				.attr("class", "y axis")
				.call(yaxis)
			.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", -35)
				.attr("dy", ".71em")
				.style("text-anchor", "middle")
				.text("PJ");

			var bars = svg.selectAll("rect")
					.data(stackedData)
					.enter().append("rect")
		 			.attr("class", "bar")
					.attr("height", 30)
					.attr("y", function(d) { return yscale(d.y); })
					.attr("width", function(d) { return xscale(d.value); })
					.attr("x", function(d) { return xscale(d.x); })
					// .attr("y", function(d) { console.log(yscale(d.y)); return yscale(d.y);});
					// .attr("width", function(d) { console.log(xscale(d.value)); return xscale(d.value)})
					// .attr("x", function(d) { console.log(xscale(d.x)); return xscale(d.x); });

};

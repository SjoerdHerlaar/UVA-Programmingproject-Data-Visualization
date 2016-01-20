function retrievedata (data, year){
  var data_list = []
  var details = d3.entries(data[year])
  for (var i = 0; i < 24; i++){
    //console.log(details[i]["key"])
    if (details[i]["key"] == "Totaal finaal verbruik"){console.log('i: ', i); continue};
    if (details[i]["key"] == "Totaal") {continue};
    var market = {
      name : details[i]["key"],
			value : parseFloat(details[i]["value"]),
    }
    data_list.push(market);
  }
  console.log(data_list)
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
  .value(function(d) { console.log('value: ', value); return d.value})

d3.json("consumption.json", drawBarchart);

function drawBarchart(data){

var details = retrievedata(data, 2014)

var svg = d3.select("#Consumptiondonut")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

var arc = svg.selectAll(".arc")
    .data(function(d){console.log('data: ', data); return pie(data)})
  .enter().append("g")
    .attr("class", "arc");

arc.append("path")
  .attr("d", arc)
  .style("fill", function(d) { return color(d.data.name)});
};

d3.json("consumption.json", type, function(error, data){
	if (error) return console.warn(error);

consumption = data
console.log(consumption)
console.log(data)
}

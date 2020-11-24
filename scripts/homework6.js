var leftSvg;
var rightSvg;
var matchData;

document.addEventListener('DOMContentLoaded', function () {

	mapSvg = d3.select('#left');
	yearSvg = d3.select('#right');
	Promise.all([d3.csv('data/results.csv')
		])
		.then(function (values) {
			matchData = values[0];
			drawMap()
		})

});


function drawMap() {
    var win  = 0
    var loss  = 0
    var draw  = 0

    var width = 300
    var height = 300
    var margin = 10

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

    matchData.forEach(function (d) {
        if(d.HomeTeam == 'Liverpool')
         {
             if (d.FTR == 'A')
             loss = loss+1;
             else if (d.FTR == 'H')
             win = win +1;
             else  if (d.FTR == 'D')
             draw = draw +1;
         }
    })
console.log(win)
console.log(draw)
console.log(loss)
var total = win+draw+loss;
var formatDecimal = d3.format(".1f")
var finalobj1 = {'Unbeaten':win+draw, 'Loss':loss}
var finalobj2 = {'Win':win, 'Draw':draw, 'Loss':loss}
var color = d3.scaleOrdinal()
  .domain(finalobj1)
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

  var color2 = d3.scaleOrdinal()
  .domain(finalobj2)
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

  var tooltip = d3.select("body")
		.append("div")
		.style("position", "absolute")
		.style("padding", "5px")
		.style("background-color", "white")
		.style("visibility", "hidden")
		.style("text-align", "center")
		.style("color", "black")
		.style("border", "solid")
		.style("border-width", "2px")
		.style("border-radius", "5px")

    var pie = d3.pie()
  .value(function(d) {return d.value; })
  var pie2 = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(finalobj1))
var data_ready2 = pie2(d3.entries(finalobj2))
leftSvg = d3.select("#left");
rightSvg = d3.select("#right");
leftSvg
  .selectAll('g.slice')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(100)         // This is the size of the donut hole
    .outerRadius(radius)
  )
  .attr("transform", "translate(" + (width/2 + 100)+ "," + height/2 + ")")
  .style('fill', d => {
    let val = d.data.key;
    if (val.includes('Unbeaten'))
        return '#87df55';
    return '#fd5e5e';
})
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)
  .on('mouseover', function (d, i) {
    tooltip.style("width", function () {})
    tooltip.style("top", d3.event.pageY + 'px')
        .style("left", d3.event.pageX + 'px')

    tooltip.style("visibility", "visible")
    .html("Result:" + d.data.key +"<br>" + "Percentage:"+ formatDecimal(d.data.value/total*100))

    d3.select(this).transition()

        .style('stroke-width', '6');

})
.on('mouseout', function (d, i) {
    tooltip.style("visibility", "hidden");
    d3.select(this).transition()
        .style('stroke-width', '2px');
});
leftSvg.append("text")
.attr("text-anchor", "middle")
.attr("x", 250 )
.attr("y", 315)
.style("font-size", "16px")
.style("font-family", "sans-serif")
.style("fill", "black")
.style("font-weight","5000")
.text("Unbeaten vs. Losses");

  rightSvg
  .selectAll('g.slice')
  .data(data_ready2)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(100)         // This is the size of the donut hole
    .outerRadius(radius)
  )
  .attr("transform", "translate(" + (width/2+ 100) + "," + height/2 + ")")
  .style('fill', d => {
      let val = d.data.key;
    if (val.includes("Win"))
        return '#87df55';
    else if (val.includes("Loss"))
        return '#fd5e5e';
    return '#ffff84';
})
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)
  .on('mouseover', function (d, i) {
    tooltip.style("width", function () {})
    tooltip.style("top", d3.event.pageY + 'px')
        .style("left", d3.event.pageX + 'px')

    tooltip.style("visibility", "visible")
    .html("Result:" + d.data.key +"<br>" + "Percentage:"+ formatDecimal(d.data.value/total*100))

    d3.select(this).transition()

        .style('stroke-width', '6');

})
.on('mouseout', function (d, i) {
    tooltip.style("visibility", "hidden");
    d3.select(this).transition()
        .style('stroke-width', '2px');
});
rightSvg.append("text")
.attr("text-anchor", "middle")
.attr("x", 250 )
.attr("y", 315)
.style("font-size", "16px")
.style("font-family", "sans-serif")
.style("fill", "black")
.style("font-weight","5000")
.text("Win vs. Draw vs. Losses")
};
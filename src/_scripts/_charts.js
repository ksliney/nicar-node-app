import * as d3 from "d3"
import annualTotals from "../_data/annual_totals";


var createChart = (el, fieldname) => {

var container = d3.select(el)
var margin = {top: 20, right: 20, bottom: 20, left: 40}
var containerWidth = container.node().offsetWidth
var containerHeight = containerWidth * 0.66
var chartWidth = containerWidth - margin.right - margin.left
var chartHeight = containerHeight - margin.top - margin.bottom

//make our chart stretch to the width of the container, could be iphone or desktop
//add an svg to the container, that is the size of the container
var svg = container
  .append("svg")
  .attr("width", containerWidth)
  .attr("height", containerHeight)
  
var g = svg
  .append("g")
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

//backticks, means dollar sign syntax, which means template literal in javascript

//for each in the list, just return the list
//x axis is time, chronologically
var xDomain = annualTotals.map(d => d.year)
var yMax = d3.max(annualTotals.map(d => d[fieldname]))
var yDomain = [ 0, yMax];

var xScale = d3
  .scaleBand()
  .domain(xDomain)
  .range([0, chartWidth])
  .padding(0.1)

var yScale = d3
  .scaleLinear()
  .domain(yDomain)
  .range([chartHeight, 0])

var xAxis = d3
  .axisBottom(xScale)
  .tickValues([2000, 2005, 2010, 2015, 2017])


var yAxis = d3
  .axisLeft(yScale)
  .tickSize(-chartWidth)
  .ticks(4)

g.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0,${chartHeight})`)
  .call(xAxis)


g.append("g")
  .attr("class", "y axis")
  .call(yAxis)

  var bars = g.append("g").attr("class", "bars")
  console.log(annualTotals)


  bars
    .selectAll('.bar')
    .data(annualTotals)
    .enter()
    .append('rect')
    .attr('class', 'bar')
  //convert the eyar to a pixel value
    .attr('x', d => xScale(d.year))
    .attr('y', d => yScale(d[fieldname]))
    .attr('width', xScale.bandwidth())
    .attr('height', d => chartHeight - yScale(d[fieldname]))
}

createChart('#county-homicides', 'homicides_total');
createChart("#harvard-park-homicides", "homicides_harvard_park");


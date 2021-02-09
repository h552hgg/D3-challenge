
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// =================================
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// =================================
d3.csv("data.csv").then(function (healthData) {

    // console.log(healthData)

    healthData.forEach(function (data) {
        data.state = +data.abbr;
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        data.age = +data.age;


    });

    // =================================

    var xLinearScale = d3.scaleLinear()
        .domain([22, d3.max(healthData, d => [d.poverty])])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.healthcare)])
        .range([height, 0]);
    var yLinearScale1 = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.age)])
        .range([height, 0]);

    // =================================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    var rightAxis = d3.axisRight(yLinearScale1);



    // =================================  
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);


    chartGroup.append("g")
        .call(leftAxis);
    // addition axis
    chartGroup.append("g").attr("transform", `translate(${width}, 0)`).call(rightAxis)
    // =================================


    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "16")
        .attr("fill", "darkgrey")
        .attr("opacity", ".8")

    chartGroup
        .selectAll('g circle text')
        .data(healthData)
        .enter()
        .append('text')
        .attr("font-size", 10)
        .text(function (d) {
            return d.abbr
        })
        .attr('dx', d => xLinearScale(0.09 + d.poverty))
        .attr('dy', d => yLinearScale(d.healthcare - 0.25))


    // // =================================




    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left - 1)
        .attr("x", 0 - (height / 1.5))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare(%)");
    //// Add age axis label
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", width - (margin.right - 60))
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Age");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");

}).catch(function (error) {
    console.log(error);
});










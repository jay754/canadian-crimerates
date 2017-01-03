/*

Main.js

*/

$(function(){
  /*

  https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
  for the bar graph code

  i was too lazy to make my own

  */

  /* For the Bar Chart */

  function drawChart(){
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
              .range([0, width])
              .padding(0.1);
    var y = d3.scaleLinear()
              .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("text-anchor", "middle")
          .style("font-size", "16px")
          .style("text-decoration", "underline")
          .text("Value vs Date Graph")
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    // get the data
    d3.csv("2015/data.csv", function(error, data) {
      if (error) throw error;

      // format the data
      data.forEach(function(d) {
        d.Homicides = +d.Homicides;
      });

      // Scale the range of the data in the domains
      x.domain(data.map(function(d) { return d.Province; }));
      y.domain([0, d3.max(data, function(d) { return d.Homicides; })]);

      // append the rectangles for the bar chart
      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.Province); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d.Homicides); })
          .attr("height", function(d) { return height - y(d.Homicides); });

      // add the x Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // add the y Axis
      svg.append("g")
          .call(d3.axisLeft(y));

    });
  }

  /* For the pie Chart */

  function getCrimeData(callback){
    $.ajax({
      url: "2015/crime_stats_canada.json",
      type: "GET",
      dataType: "json",
      success: function(data) {
        callback(data);
      },
    });
  }

  function drawPiegraph(){
    getCrimeData(function(results){
      var data = results[4];
      var content = [];

      for(var key in data){
        var value = data[key];
        if(key !== "Title" && key !== "Canada"){
          content.push({
            "label":key,
            "value":value
          });
        }
      }

      var pie = new d3pie("pieChart", {
        "size": {
          "canvasWidth": 900,
          "canvasHeight": 600,
        },
        "data": {
          "sortOrder": "label-desc",

          "content": content
        },
        "labels": {
          "outer": {
            "format": "label-percentage1",
            "pieDistance": 10
          },
          "inner": {
            "hideWhenLessThanPercentage": 100
          },
          "mainLabel": {
            "fontSize": 11
          },
          "percentage": {
            "color": "#000000",
            "fontSize": 15,
            "decimalPlaces": 2
          },
          "value": {
            "color": "#cccc43",
            "fontSize": 11
          },
          "lines": {
            "enabled": true,
            "color": "#777777"
          },
          "truncation": {
            "enabled": true
          }
        },
        "effects": {
          "pullOutSegmentOnClick": {
            "effect": "linear",
            "speed": 400,
            "size": 8
          }
        },
        "misc": {
          "colors": {
            "segmentStroke": "#000000"
          }
        }
      });
    });
  }

  drawChart();
  // drawPiegraph();
});

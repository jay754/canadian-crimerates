/*

Main.js

*/

$(function(){

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

  drawPiegraph();
});

var d = d3
function createChart(id, data, field, options){
  var color = options.color != undefined ? options.color : '#6298ef'
  var textColor = options.textColor != undefined ? options.textColor : 'white'
  var margin = options.margin != undefined ? option.margin : '5'

  var comparator =  function (a,b){ return b[field] - a[field]}
  var max = d3.max(data, function(d){return d[field]});

  d3.select(id).selectAll("div.h-bar")
        .data(data)
      .enter().append("div")
      .attr("class", "h-bar")
      .append("span");


  d3.select(id).selectAll("div.h-bar")
        .data(data)
      .attr("class", "h-bar")
      .style("background-color", color)
      .style("margin",margin+'px')
      .style("color",textColor)
      .style("width", function(d){
          return (d[field] /max)*100+"%";
      })
      .select("span")
          .text(function(d){
            return d.Film;
          });

  if(comparator)
    d3.select("body")
        .selectAll("div.h-bar")
        .sort(comparator);
}

window.onload = function(){

  d3.json("movies.json", function(error,json){
      for (var i in json){
        json[i].lucro = json[i].Worldwide_Gross_M - json[i].Budget_M
      }
      createChart("#bil",json,'Worldwide_Gross_M' , {})
      createChart("#orca",json, 'Budget_M', {color: '#e60000'})
      createChart("#luc", json, 'lucro', {color:'black'})
  })

}

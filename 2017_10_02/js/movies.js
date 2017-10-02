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
          return 'calc('+(d[field] /max)*100+'% - 12px - '+(margin*2)+'px)';
      })
      .select("span")
          .text(function(d){
            return d.Film;
          });

  if(comparator)
    d3.select(id)
        .selectAll("div.h-bar")
        .sort(comparator);
}

function choseField(id){
  if (id == '#bil'){return 'Worldwide_Gross_M'}
  if (id == '#orca'){return 'Budget_M'}
  if (id == '#luc'){return 'lucro'}
}

function getOptions(id){
  if (id == '#bil'){return {color:'#6298ef'}}
  if (id == '#orca'){return {color: '#e60000'}}
  if (id == '#luc'){return  {color:'#6b9b69'}} 
}

function getTitle(id){
  if (id == '#bil'){return 'Melhoes Bilheterias'}
  if (id == '#orca'){return 'Melhores Orçamentos'}
  if (id == '#luc'){return  'Melhores Lucros'}  
}

function showChart(id){
  var html = ""

  html += '<h3>'+getTitle(id)+'<h3>'  

  d3.json("movies.json", function(error,json){
      for (var i in json){
        json[i].lucro = json[i].Worldwide_Gross_M - json[i].Budget_M
      }     
      document.getElementById(id.replace('#','')).innerHTML = html
      createChart(id,json, choseField(id), getOptions(id))
      //createChart("#orca",json, 'Budget_M', {color: '#e60000'})
      //createChart("#luc", json, 'lucro', {color:'black'})
  })
}

window.onload = function(){

  

}

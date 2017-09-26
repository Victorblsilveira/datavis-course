var max = 0;

function render(data, comparator,chart){
  console.log(chart)
  d3.select(chart).selectAll("div.h-bar")
        .data(data)
      .enter().append("div")
      .attr("class", "h-bar")
      .append("span");


  d3.select(chart).selectAll("div.h-bar")
        .data(data)
      .attr("class", "h-bar blue")
      .style("width", function(d){
          return (d.Worldwide_Gross_M /max)*100+"%";
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

function compare(a,b){
  return b.Worldwide_Gross_M - a.Worldwide_Gross_M
}


function compare_2(a,b){
  return b.Budget_M - a.Budget_M
}

function compare_3(a,b){
  return (b.Worldwide_Gross_M + b.Budget_M) - (a.Budget_M +a.Worldwide_Gross_M )
}


function calcMax(field, json){
  for (var i in json){
      console.log(json[i][field])
      max = json[i].field> max ? json[i].field : max
  }

}
document.onload(function(){

  d3.json("movies.json", function(error,json){
      calcMax("Worldwide_Gross_M",json)
      //render(json,compare,"#chart")
      render(json,compare_2,"#chart2")
      //render(json,compare_3,"#chart3")
  })

})

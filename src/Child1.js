import React, {Component} from "react";
import * as d3 from 'd3';
class Child1 extends Component{
  constructor(props){
    super(props);
    this.state={
      drop:"A"
    };
  }
  componentDidMount(){
    console.log(this.props.data1);
  }
  componentDidUpdate(){
    var ben=this.state.drop;
    var data=this.props.data1.filter(item => item.category === ben);
    console.log(data)

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 10, bottom: 30, left: 20 },
        w = 500 - margin.left - margin.right,
        h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child1_svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .select(".g_1")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    var x_data = data.map(item=>item.x)
    //var x_data = data.map(item=>item.x)
    const x_scale = d3.scaleLinear().domain([0, d3.max(x_data)]).range([margin.left, w]);
    
    container.selectAll(".x_axis_g").data([0]).join('g').attr("class", 'x_axis_g')
    .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

    // Add Y axis
    var y_data = data.map(item=>item.y)
    
    const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);
    container.selectAll(".y_axis_g").data([0]).join('g').attr("class", 'x_axis_g')
    .attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(y_scale));

    container.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", function(d){
            return x_scale(d.x);
        })
        .attr("cy", function(d){
            return y_scale(d.y);
        })
        .attr("r", 3)
        .style("fill", "#69b3a2");

    container.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", 260)
        .attr("y", 290)
        .text("X");
    container.append("text")
        .attr("class", "7 label")
        .attr("text-anchor", "end")
        .attr("x", -12)
        .attr("y", 100)
        .text("Y");
    var tooltip = d3.select("body")
        .selectAll(".tooltip_div")
        .data([0])  // binds a single element to the tooltip
        .join("div")  // joins the data to a div element
        .attr("class", "tooltip_div")  // adds a CSS class for styling
        .style("position", "absolute")  // uses absolute positioning
        .style("visibility", "hidden");  // starts as hidden
        d3.select(".parent").selectAll("circle").data(data).join("circle").attr('class','circle')
        .on("mouseover",(event,d)=>{
          tooltip.html("x:".concat(d.x.toString().concat(",","y:".concat(d.y)))).style("visibility", "visible").style("background", "white").style("bordercolor", "black")
        })
        .on("mousemove", (event) =>{
          tooltip.style("top", event.pageY - 10 + "px")  // positions the tooltip slightly above the cursor
          .style("left", event.pageX + 10 + "px")  // positions the tooltip to the right of the cursor
        })
        .on("mouseout", (event) =>{
          tooltip.style("visibility", "hidden")
        })
    
  }
  
  render(){
    return (
      <div>
          <select onChange={(event)=>this.setState({drop:event.target.value})}>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        <svg className="child1_svg"> 
          
            <g className="g_1"></g>
        </svg>
      </div>
    );
  }
}
export default Child1;
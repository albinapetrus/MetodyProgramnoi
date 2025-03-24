let width = 650;
let height = 650;
let scale = 25; 

document.addEventListener("DOMContentLoaded", function() {
    let { svg } = add(); 
    drawGrid(svg);
    drawAxes(svg);
    drawLabels(svg);
    updateSVGPosition(svg);
});

function add() {
    let svg;
    const svg1 = d3.select("#graphContainer").select("svg");

    if (svg1.empty()) {
        svg = d3.select("#graphContainer").append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px dotted #942e2e");
    } else {
        svg = svg1; 
    }

    return { svg, width, height };
}

function updateSVGPosition(svg) {
    const container = document.getElementById('graphContainer');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const offsetX = (containerWidth - width) / 2;
    const offsetY = (containerHeight - height) / 2;

    svg.style("transform", `translate(${offsetX}px, ${offsetY}px)`);
}

function drawGrid(svg) {
    const step = scale;

    for (let x = step; x < width; x += step) {
        svg.append("line")
            .attr("x1", x)
            .attr("y1", 0)
            .attr("x2", x)
            .attr("y2", height)
            .attr("stroke", "#ddd")
            .attr("stroke-width", 1);
    }

    for (let y = step; y < height; y += step) {
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", y)
            .attr("x2", width)
            .attr("y2", y)
            .attr("stroke", "#ddd")
            .attr("stroke-width", 1);
    }
}

function drawAxes(svg) {
    const centerX = width / 2;
    const centerY = height / 2;

    svg.append("line")
        .attr("x1", 0)
        .attr("y1", centerY)
        .attr("x2", width)
        .attr("y2", centerY)
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    svg.append("line")
        .attr("x1", centerX)
        .attr("y1", 0)
        .attr("x2", centerX)
        .attr("y2", height)
        .attr("stroke", "black")
        .attr("stroke-width", 1);
}

function drawLabels(svg) {
    const centerX = width / 2;
    const centerY = height / 2;
    const step = scale;
    for (let x = step*2; x < width / 2; x += step*2) {
        svg.append("text")
            .attr("x", centerX + x)
            .attr("y", centerY + 15)
            .attr("font-size", "14px")
            .attr("fill", "black")
            .text(x / scale);
        svg.append("text")
            .attr("x", centerX - x)
            .attr("y", centerY + 15)
            .attr("font-size", "14px")
            .attr("fill", "black")
            .text(-x / scale);
    }

    for (let y = step*2; y < height / 2; y += step*2) {
        svg.append("text")
            .attr("x", centerX + 5)
            .attr("y", centerY + y)
            .attr("font-size", "14px")
            .attr("fill", "black")
            .text(-y / scale);
        svg.append("text")
            .attr("x", centerX + 5)
            .attr("y", centerY - y)
            .attr("font-size", "14px")
            .attr("fill", "black")
            .text(y / scale);
    }
}


function clearGraph() {
    d3.select("#graphContainer").selectAll("svg").remove();

    let { svg } = add(); 
    drawGrid(svg);  
    drawAxes(svg);  
    drawLabels(svg); 
}

function validateForm() {
    let inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.style.border = "2px solid red";
        } else {
            input.style.border = "2px solid green";
        }
    });
}

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
            .text(x );
        svg.append("text")
            .attr("x", centerX - x)
            .attr("y", centerY + 15)
            .attr("font-size", "14px")
            .attr("fill", "black")
            .text(-x );
    }

    for (let y = step*2; y < height / 2; y += step*2) {
        svg.append("text")
            .attr("x", centerX + 5)
            .attr("y", centerY + y)
            .attr("font-size", "14px")
            .attr("fill", "black")
            .text(-y );
        svg.append("text")
            .attr("x", centerX + 5)
            .attr("y", centerY - y)
            .attr("font-size", "14px")
            .attr("fill", "black")
            .text(y);
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
function calculate1(){
    let range;
    let time;
    let ang = parseFloat(document.getElementById("ang").value);
    let y0 = parseFloat(document.getElementById("y0").value);
    let v0 = parseFloat(document.getElementById("v0").value);
    let angleInRadians = ang * Math.PI / 180;
    let g = 9.81;
    if(ang==0){
        time = Math.sqrt((2 * y0) / g);
    }
    else{
     time = (2*v0*Math.sin(angleInRadians))/g;
    }
    let maxPoint= ((v0*v0*Math.sin(angleInRadians)*Math.sin(angleInRadians))/(2*g));
    if(ang==0){
range = v0*time;
    }else{
    range = (v0 * v0 * Math.sin(2 * angleInRadians)) / g;
    }
let maxPointPix = maxPoint+y0;
if(range<0){
    let newRange = -range;
    document.getElementById("outputtext").innerHTML = "Час польоту: " + time +" с "+ "<br>"+"Найвища точка: "  + " м." + maxPointPix +  "<br>"+ "Дальність польоту: " + newRange + " м.";
}
else{

    document.getElementById("outputtext").innerHTML = "Час польоту: " + time +" с "+ "<br>"+ "Найвища точка: "   + maxPointPix + " м." +  "<br>"+ "Дальність польоту: " + range + " м.";
}
}

function plotTrajectory() {
    // Отримання SVG
    let { svg, height, width } = add();
    
    let inputs = document.querySelectorAll("input");
    let isValid = true;
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            isValid = false;
        }
    });

    if (!isValid) {
        alert("Будь ласка, введіть правильні значення для всіх полів.");
        return;
    }

    let x0 = parseFloat(document.getElementById("x0").value);
    let y0 = parseFloat(document.getElementById("y0").value);
    let ang = parseFloat(document.getElementById("ang").value);
    let v0 = parseFloat(document.getElementById("v0").value);
    let color = document.getElementById("gr").value;

    let angleInRadians = ang * Math.PI / 180;
    let timeStep = 0.1;
    let maxTime = 1000;
    let g = 9.81;

    // Масив для збереження точок траєкторії
    let points = [];
    
    for (let t = 0; t <= maxTime; t += timeStep) {
        let x = x0 + v0 * Math.cos(angleInRadians) * t;
        let y = y0 + v0 * Math.sin(angleInRadians) * t - 0.5 * g * t * t;

        if (y < 0) break; // Зупинка, якщо точка на землі
        
        points.push([x, height/2 +  y]);
    }

    // Створення лінії на основі точок
    svg.selectAll("null") //selectAll-вибирає всі елементи
    .data(points) //метод прив'язує дані
    .enter().append("circle") //enter-створює нові елементи для тих, в кого нема елемента в Dom
    .attr("cx", d => d[0] + width / 2)  // Переміщуємо точки на ось X
    .attr("cy", d => height - d[1])  // Інвертуємо координати для осі Y
    .attr("r", 3)
    .attr("fill", color);
}

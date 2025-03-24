let canvas, ctx, width, height, centerX, centerY, step;

document.addEventListener("DOMContentLoaded", function() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
    centerX = width / 2;
    centerY = height / 2;
    step = 25; // Крок сітки

    drawGrid();
    drawAxes();
    drawLabels();
});

function drawGrid() {
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;
    for (let x = step; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    for (let y = step; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

function drawAxes() {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    
    // Горизонтальна вісь
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    
    // Вертикальна вісь
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();
}

function drawLabels() {
    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    
    // Позначки на осях
    for (let x = step*2; x < width / 2; x += step*2) {
        ctx.fillText(x , centerX + x, centerY + 15);
        ctx.fillText(-x , centerX - x, centerY + 15);
    }
    for (let y = step*2; y < height / 2; y += step*2) {
       
        ctx.fillText(-y , centerX + 5, centerY + y);
        ctx.fillText(y , centerX + 5, centerY - y);
        }
    
}

function plotTrajectory() {
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
    let canvas = document.getElementById("myCanvas"); 
let ctx = canvas.getContext("2d");
    let x0 = parseFloat(document.getElementById("x0").value);
    let y0 = parseFloat(document.getElementById("y0").value);
    let ang = parseFloat(document.getElementById("ang").value);
    let v0 = parseFloat(document.getElementById("v0").value);
    let color = document.getElementById("gr").value;

    let angleInRadians = ang * Math.PI / 180;
    let timeStep = 0.1;
    let maxTime = 1000;
    let x = x0;
    let y = y0;
    let g = 9.81;

    ctx.beginPath();
    ctx.moveTo(centerX + x, centerY - y);
    ctx.fillStyle = color;

    for (let t = 0; t <= maxTime; t += timeStep) {
        x = x0 + v0 * Math.cos(angleInRadians) * t ;
        y = y0 + v0 * Math.sin(angleInRadians) * t - 0.5 * g * t * t;
        if (centerY - y > centerY) {
            break; // Зупиняємо малювання, коли точка йде нижче осі X
        }
    

        ctx.beginPath();
        ctx.arc(centerX + x, centerY - y, 2, 0, Math.PI * 2);
        ctx.fill();

    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, width, height); 
    drawGrid();
    drawAxes();
    drawLabels();
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
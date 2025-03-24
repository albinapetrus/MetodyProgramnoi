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
        ctx.fillText(x / step, centerX + x, centerY + 15);
        ctx.fillText(-x / step, centerX - x, centerY + 15);
    }
    for (let y = step*2; y < height / 2; y += step*2) {
        ctx.fillText(-y / step, centerX + 5, centerY + y);
        ctx.fillText(y / step, centerX + 5, centerY - y);
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
let width = 650;
let height = 650;
let scale = 25; // Масштаб для точок

document.addEventListener("DOMContentLoaded", function() {
    let { svg } = add(); // Створюємо або вибираємо існуючий SVG
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
        svg = svg1; // Використовуємо існуючий SVG
    }

    return { svg, width, height };
}

function updateSVGPosition(svg) {
    const container = document.getElementById('graphContainer');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Визначаємо відступи для центрування SVG в контейнері
    const offsetX = (containerWidth - width) / 2;
    const offsetY = (containerHeight - height) / 2;

    svg.style("transform", `translate(${offsetX}px, ${offsetY}px)`);
}

function drawGrid(svg) {
    const step = scale;

    // Горизонтальні лінії
    for (let x = step; x < width; x += step) {
        svg.append("line")
            .attr("x1", x)
            .attr("y1", 0)
            .attr("x2", x)
            .attr("y2", height)
            .attr("stroke", "#ddd")
            .attr("stroke-width", 1);
    }

    // Вертикальні лінії
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

    // Горизонтальна вісь
    svg.append("line")
        .attr("x1", 0)
        .attr("y1", centerY)
        .attr("x2", width)
        .attr("y2", centerY)
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    // Вертикальна вісь
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

    // Позначки на осях
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

function plotTrajectory() {
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
    let x0 = parseFloat(document.getElementById("x0").value) * scale; // Перемножуємо на масштаб
    let y0 = parseFloat(document.getElementById("y0").value) * scale; // Перемножуємо на масштаб
    let ang = parseFloat(document.getElementById("ang").value);
    let v0 = parseFloat(document.getElementById("v0").value);
    let a = parseFloat(document.getElementById("pr").value);
    let color = document.getElementById("gr").value;

    let angleInRadians = ang * Math.PI / 180;

    // Параметри часу
    let timeStep = 1;
    let maxTime = 1000;

    let points = [];

    // Моделюємо траєкторію
    for (let t = 0; t <= maxTime; t += timeStep) {
        let x = x0 + v0 * Math.cos(angleInRadians) * t + 0.5 * a * Math.cos(angleInRadians) * t * t;
        let y = y0 + v0 * Math.sin(angleInRadians) * t + 0.5 * a * Math.sin(angleInRadians) * t * t;

        points.push([x, height/2 +  y]); // push-додавання елементів до кінця масиву
    }

    // Створюємо круги для кожної точки траєкторії
    svg.selectAll("null") //selectAll-вибирає всі елементи
        .data(points) //метод прив'язує дані
        .enter().append("circle") //enter-створює нові елементи для тих, в кого нема елемента в Dom
        .attr("cx", d => d[0] + width / 2)  // Переміщуємо точки на ось X
        .attr("cy", d => height - d[1])  // Інвертуємо координати для осі Y
        .attr("r", 3)
        .attr("fill", color);
}

function clearGraph() {
    // Очищаємо всі SVG елементи (включаючи точки та графік)
    d3.select("#graphContainer").selectAll("svg").remove();

    // Перемалюємо SVG, осі та клітинки
    let { svg } = add(); // Створюємо або вибираємо існуючий SVG
    drawGrid(svg);  // Малюємо клітинки
    drawAxes(svg);  // Малюємо осі
    drawLabels(svg); // Малюємо мітки
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

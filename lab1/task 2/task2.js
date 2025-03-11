/*function add(){
    let svg = d3.select("#graphContainer").append("svg")//d3-глобальна змінна, select-повертає елемент по id, append-додавання нового елементу
    .attr("width", width) //attr-метод d3 для встановлення атрибутів
    .attr("height", height)
    .style("border", "1px solid #942e2e");//метод для встановлення стилю
    return svg;
}*/
function add(){
    let width = 650;
    let height = 650;
let svg;
    const svg1 = d3.select("#graphContainer").select("svg");
    if (svg1.empty()) {
        svg = d3.select("#graphContainer").append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px dotted #942e2e");
           
    }
    else {
        svg = svg1; // Використовуємо існуючий SVG
    }
    return {svg, height, width};
}
function plotTrajectory() {
    let { svg, height, width } = add();


    let x0 = parseFloat(document.getElementById("x0").value);
    let y0 = parseFloat(document.getElementById("y0").value);
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

       

        points.push([x, height - y]); // push-додавання елементів до кінця масиву
    }

    // Створюємо круги для кожної точки траєкторії
    svg.selectAll("null") //selectAll-вибирає всі елементи
        .data(points)//метод привязує дані
        .enter().append("circle")//enter-створює нові елементи для тих в кого нема елемента в Dom
        .attr("cx", d => d[0])
        .attr("cy", d => d[1])
        .attr("r", 3)
        .attr("fill", color);
}

function clearGraph() {
    d3.select("#graphContainer").selectAll("svg").remove();//remove()-видалення елементів з графіка чи діаграми
}

const items = [
    { weight: 9, value: 9 },
    { weight: 9, value: 3 },
    { weight: 9, value: 15 },
    { weight: 7, value: 14 },
    { weight: 8, value: 8 },
    { weight: 9, value: 5 }
];

const backpackWeight = 23;
const n = items.length;

function solution() {
    let dp = Array.from({ length: n + 1 }, () => Array(backpackWeight + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= backpackWeight; w++) {
            const item = items[i - 1];

            if (item.weight <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - item.weight] + item.value);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    let tableHTML = "<table >";

    tableHTML += "<tr><th>Кількість предметів, яка розглядається</th>";
    for (let w = 0; w <= backpackWeight; w++) {
        tableHTML += `<th>${w}</th>`;
    }
    tableHTML += "</tr>";

    for (let i = 1; i <= n; i++) {
        const item = items[i - 1];
        tableHTML += `<tr><th>id в масиві: ${i-1} (вага ${item.weight}, цінність ${item.value})</th>`;
        for (let w = 0; w <= backpackWeight; w++) {
            tableHTML += `<td>${dp[i][w]}</td>`;
        }
        tableHTML += "</tr>";
    }

    tableHTML += "</table>";

    document.getElementById('table').innerHTML = tableHTML;

    document.getElementById('info').innerHTML = `
        <p><strong>Максимальна цінність:</strong> ${dp[n][backpackWeight]}</p>
       
    `;
    let w = backpackWeight;
    let selectedItems = [];
    let totalWeight = 0;
    for (let i = n; i > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedItems.push(items[i - 1]);
            totalWeight += items[i - 1].weight;
            w -= items[i - 1].weight;
        }
    }

    let selectedHTML = "<h3>Вибрані предмети:</h3><div>";
    selectedItems.reverse().forEach((item, index) => {
        selectedHTML += `<p>Предмет #${index + 1}: Вага: ${item.weight}, Цінність: ${item.value}</p>`;
    });
    selectedHTML += `<p><strong>Загальна вага вибраних предметів:</strong> ${totalWeight}</p>`;
    selectedHTML += `<p><strong>Вага рюкзака:</strong> ${backpackWeight}</p>`;
    selectedHTML += "</div>";
    
    document.getElementById('selected').innerHTML = selectedHTML;
    
    document.getElementById('info').innerHTML = `
        <p><strong>Максимальна цінність:</strong> ${dp[n][backpackWeight]}</p>
    `;}
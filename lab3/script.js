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
    const tableContainer = document.getElementById('table');
    let tableHTML = "<table >";
    tableHTML += "<tr><th>Вага, яка розглядається/ Предмет</th>";
    for (let w = 0; w <= backpackWeight; w++) {
        tableHTML += `<th>${w}</th>`;
    }
    tableHTML += "</tr>";
    for (let i = 0; i <= n; i++) {
        const item = i > 0 ? items[i - 1] : { weight: 0, value: 0 };
        tableHTML += `<tr><th>${i === 0 ? '' : `(Id:${i-1}, Вага:${item.weight}, Цінність:${item.value})`}</th>`;
        for (let w = 0; w <= backpackWeight; w++) {
            tableHTML += `<td id="cell-${i}-${w}">${dp[i][w]}</td>`;
        }
        tableHTML += "</tr>";
    }
    tableHTML += "</table>";
    tableContainer.innerHTML = tableHTML;

    function animateTableCell(row, col, newValue, oldValue) {
        const cell = document.getElementById(`cell-${row}-${col}`);
        if (cell) {
            cell.classList.add('updating');
            setTimeout(() => {
                cell.textContent = newValue;
                cell.classList.remove('updating');
                if (newValue > oldValue) {
                    cell.classList.add('increase');
                    setTimeout(() => cell.classList.remove('increase'), 800);
                } else if (newValue < oldValue) {
                    cell.classList.add('decrease');
                    setTimeout(() => cell.classList.remove('decrease'), 800);
                }
            }, 300); 
        }
    }

    async function fillDPTable() {
        let previousDP = Array.from({ length: n + 1 }, () => Array(backpackWeight + 1).fill(0));
        for (let i = 1; i <= n; i++) {
            for (let w = 1; w <= backpackWeight; w++) {
                const item = items[i - 1];
                const oldValue = dp[i][w];
                if (item.weight <= w) {
                    dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - item.weight] + item.value);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
                animateTableCell(i, w, dp[i][w], oldValue);
                await new Promise(resolve => setTimeout(resolve, 100)); 
            }
        }
        displayResults(dp);
    }

    function displayResults(finalDP) {
        let w = backpackWeight;
        let selectedItems = [];
        let totalWeight = 0;
        for (let i = n; i > 0; i--) {
            if (finalDP[i][w] !== finalDP[i - 1][w]) {
                selectedItems.push(items[i - 1]);
                totalWeight += items[i - 1].weight;
                w -= items[i - 1].weight;
            }
        }

        let selectedHTML = "<div class='selected'><h3>Вибрані предмети:</h3>";
        selectedItems.reverse().forEach((item, index) => {
            selectedHTML += `<p>Предмет #${index + 1}: Вага: ${item.weight}, Цінність: ${item.value}</p>`;
        });
        selectedHTML += `<p><strong>Загальна вага:</strong> ${totalWeight}</p>`;
        selectedHTML += `<p><strong>Вага рюкзака:</strong> ${backpackWeight}</p>`;
        selectedHTML += "</div>";

        document.getElementById('selected').innerHTML = selectedHTML;
        document.getElementById('info').innerHTML = `
            <div class='selected1'>
                <p><strong>Максимальна цінність:</strong> ${finalDP[n][backpackWeight]}</p>
            </div>
        `;
    }

    fillDPTable();
}

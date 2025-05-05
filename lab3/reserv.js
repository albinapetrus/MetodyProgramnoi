const items = [
    { weight: 2, value: 3 },
    { weight: 3, value: 4 },
    { weight: 4, value: 5 },
    { weight: 5, value: 8 }
  ];
  
  const maxWeight = 10; // максимальна вага рюкзака
  const n = items.length;
  
  // Створення таблиці dp
  let dp = Array.from({ length: n + 1 }, () => Array(maxWeight + 1).fill(0));
  
  // Заповнення таблиці dp
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= maxWeight; w++) {
      const item = items[i - 1]; // поточний предмет
      if (item.weight <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - item.weight] + item.value);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  
  // Виведення максимального значення цінності
  console.log("Максимальна цінність:", dp[n][maxWeight]);
  
  // Відновлення переліку предметів, що входять у оптимальне рішення
  let w = maxWeight;
  let selectedItems = [];
  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedItems.push(i - 1); // додаємо індекс предмета, який обраний
      w -= items[i - 1].weight;
    }
  }
  
  // Виведення вибраних предметів
  console.log("Вибрані предмети:", selectedItems.reverse());
  
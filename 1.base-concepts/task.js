"use strict";

function solveEquation(a, b, c) {
    
    const discriminant = b ** 2 - 4 * a * c;
    
    
    if (discriminant < 0) {
        return [];
    }
    
    
    if (discriminant === 0) {
        const root = -b / (2 * a);
        return [root];
    }
    
    
    const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return [root1, root2];
}


console.log(solveEquation(1, -3, 2)); // [2, 1]
console.log(solveEquation(1, 2, 1));  // [-1]
console.log(solveEquation(1, 0, -1)); // [1, -1]
console.log(solveEquation(1, 0, 1));  // []

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  // Преобразуем процентную ставку из диапазона от 0 до 100 в диапазон от 0 до 1 и из годовой ставки — в месячную
  const monthlyRate = (percent / 100) / 12;

  // Рассчитываем тело кредита
  const principal = amount - contribution;

  // Если тело кредита меньше или равно 0, возвращаем 0
  if (principal <= 0) {
      return 0;
  }

  // Рассчитываем ежемесячный платеж по формуле
  const monthlyPayment = principal * (monthlyRate + (monthlyRate / (Math.pow(1 + monthlyRate, countMonths) - 1)));

  // Рассчитываем общую сумму, которую придется заплатить клиенту
  const totalPayment = monthlyPayment * countMonths;

  // Округляем результат до двух значений после запятой
  return Number(totalPayment.toFixed(2));
}

// Примеры использования:
console.log(calculateTotalMortgage(10, 0, 50000, 12)); // 52749.53
console.log(calculateTotalMortgage(10, 1000, 50000, 12)); // 51694.54
console.log(calculateTotalMortgage(10, 0, 20000, 24)); // 22149.56
console.log(calculateTotalMortgage(10, 1000, 20000, 24)); // 21042.09
console.log(calculateTotalMortgage(10, 20000, 20000, 24)); // 0
console.log(calculateTotalMortgage(10, 0, 10000, 36)); // 11616.19
console.log(calculateTotalMortgage(15, 0, 10000, 36)); // 12479.52
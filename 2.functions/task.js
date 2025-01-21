function getArrayParams(...arr) {
  // Инициализируем переменные
  let min = Infinity;
  let max = -Infinity;
  let sum = 0;

  // Проходим по массиву
  for (let num of arr) {
      // Обновляем минимум и максимум
      if (num < min) {
          min = num;
      }
      if (num > max) {
          max = num;
      }
      // Суммируем элементы
      sum += num;
  }

  // Вычисляем среднее значение и округляем до двух знаков после запятой
  let avg = (sum / arr.length).toFixed(2);
  
  // Возвращаем объект с результатами
  return {
      min: min,
      max: max,
      avg: Number(avg) // Преобразуем строку в число
  };
}

// Примеры использования
console.log(getArrayParams(-99, 99, 10)); // { min: -99, max: 99, avg: 3.33 }
console.log(getArrayParams(1, 2, 3, -100, 10)); // { min: -100, max: 10, avg: -16.80 }
console.log(getArrayParams(5)); // { min: 5, max: 5, avg: 5 }




// Функция для суммирования элементов Задача 2
function summElementsWorker(...arr) {
  if (arr.length === 0) return 0; // Проверка на наличие элементов
  return arr.reduce((sum, num) => sum + num, 0);
}

// Функция для вычисления разницы между максимальным и минимальным элементами
function differenceMaxMinWorker(...arr) {
  if (arr.length === 0) return 0; // Проверка на наличие элементов
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  return max - min;
}

// Функция для вычисления разницы сумм чётных и нечётных элементов
function differenceEvenOddWorker(...arr) {
  if (arr.length === 0) return 0; // Проверка на наличие элементов
  let sumEvenElement = 0;
  let sumOddElement = 0;

  for (let num of arr) {
      if (num % 2 === 0) {
          sumEvenElement += num;
      } else {
          sumOddElement += num;
      }
  }

  return sumEvenElement - sumOddElement;
}

// Функция для вычисления среднего значения чётных элементов
function averageEvenElementsWorker(...arr) {
  if (arr.length === 0) return 0; // Проверка на наличие элементов
  let sumEvenElement = 0;
  let countEvenElement = 0;

  for (let num of arr) {
      if (num % 2 === 0) {
          sumEvenElement += num;
          countEvenElement++;
      }
  }

  return countEvenElement === 0 ? 0 : sumEvenElement / countEvenElement; // Проверка на деление на ноль
}

// Примеры использования
console.log(summElementsWorker()); // 0
console.log(summElementsWorker(10, 10, 11, 20, 10)); // 61

console.log(differenceMaxMinWorker()); // 0
console.log(differenceMaxMinWorker(10, 10, 11, 20, 10)); // 10

console.log(differenceEvenOddWorker(94, 51, 57, 41, 47, 66, 58, 10, 38, 17)); // 53
console.log(differenceEvenOddWorker(15, 97, 85, 64, 67, 10, 69, 40, 15, 35)); // -269

console.log(averageEvenElementsWorker(1, 2, 3, 4, 5, 6, 7, 8, 9)); // 5
console.log(averageEvenElementsWorker(15, 97, 85, 64, 67, 10, 69, 40, 15, 35)); // 38



//Задача 3

function makeWork(arrOfArr, func) {
  let maxWorkerResult = -Infinity; // Инициализация переменной максимума

  for (let arr of arrOfArr) {
      const result = func(...arr); 
      if (result > maxWorkerResult) { 
          maxWorkerResult = result; 
      }
  }

  return maxWorkerResult; // Возврат максимального значения
}


const arr = [
  [10, 10, 11, 20, 10],
  [67, 10, 2, 39, 88],
  [72, 75, 51, 87, 43],
  [30, 41, 55, 96, 62]
];

console.log(makeWork(arr, summElementsWorker)); 
console.log(makeWork(arr, differenceMaxMinWorker)); 
console.log(makeWork(arr, differenceEvenOddWorker)); 
console.log(makeWork(arr, averageEvenElementsWorker)); 
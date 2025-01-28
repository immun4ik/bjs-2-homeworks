function parseCount(value) {
    const parsedValue = Number.parseFloat(value); 

    
    if (isNaN(parsedValue)) {
        throw new Error("Невалидное значение");
    }

    return parsedValue; 
}

// Функция для валидации числа
function validateCount(value) {
    try {
        return parseCount(value); 
    } catch (error) {
        return error; 
    }
}

// Примеры использования:
try {
    console.log(parseCount("123.45")); 
    console.log(parseCount("abc")); 
} catch (error) {
    console.error(error.message);
}

console.log(validateCount("123.45")); 
console.log(validateCount("abc")); 

class Triangle {
    constructor(a, b, c) {
        // Проверка существования треугольника
        if (a + b <= c || a + c <= b || b + c <= a) {
            throw new Error("Треугольник с такими сторонами не существует");
        }
        
        this.a = a;
        this.b = b;
        this.c = c;
    }

    // Геттер для периметра
    get perimeter() {
        return this.a + this.b + this.c;
    }

    // Геттер для площади
    get area() {
        const s = this.perimeter / 2; 
        // Формула Герона для площади
        const area = Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
        return parseFloat(area.toFixed(3)); 
    }
}

// Функция для получения треугольника
function getTriangle(a, b, c) {
    try {
        return new Triangle(a, b, c);
    } catch (error) {
        return {
            get area() {
                return "Ошибка! Треугольник не существует";
            },
            get perimeter() {
                return "Ошибка! Треугольник не существует";
            }
        };
    }
}

// Примеры использования
const triangle1 = getTriangle(3, 4, 5);
console.log(triangle1.perimeter); // 12
console.log(triangle1.area); // 6.000

const triangle2 = getTriangle(1, 2, 3);
console.log(triangle2.perimeter); 
console.log(triangle2.area);
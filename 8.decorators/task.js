//Задача № 1
function cachingDecoratorNew(func) {
    let cache = [];

    function wrapper(...args) {
        const hash = md5(JSON.stringify(args)); 
        let objectInCache = cache.find(item => item.hash === hash); 

        if (objectInCache) { 
            console.log("Из кеша: " + objectInCache.value); 
            return "Из кеша: " + objectInCache.value;
        }

        let result = func(...args);
        cache.push({ hash: hash, value: result }); 

        if (cache.length > 5) { 
            cache.shift(); 
        }

        console.log("Вычисляем: " + result); 
        return "Вычисляем: " + result;  
    }
    return wrapper;
}

// Пример использования
const addAndMultiply = (a, b, c) => (a + b) * c;
const upgraded = cachingDecoratorNew(addAndMultiply);

console.log(upgraded(1, 2, 3)); // вычисляем: 9
console.log(upgraded(1, 2, 3)); // из кеша: 9
console.log(upgraded(2, 2, 3)); // вычисляем: 12
console.log(upgraded(3, 2, 3)); // вычисляем: 15
console.log(upgraded(4, 2, 3)); // вычисляем: 18
console.log(upgraded(5, 2, 3)); // вычисляем: 21
console.log(upgraded(6, 2, 3)); // вычисляем: 24 (при этом кеш для 1, 2, 3 уничтожается)
console.log(upgraded(1, 2, 3)); // вычисляем: 9 (снова вычисляем, кеша нет)


//Задача 2
function debounceDecoratorNew(func, delay) {
    let timeoutId;
    let count = 0; 
    let allCount = 0; 

    function wrapper(...args) {
        allCount++; 
        if (timeoutId) {
            clearTimeout(timeoutId); 
        }

        // Если это первый вызов, выполняем функцию синхронно
        if (allCount === 1) {
            func(...args); 
            count++; 
        }

        // Устанавливаем таймаут для последующих вызовов
        timeoutId = setTimeout(() => {
            func(...args); 
            count++; 
        }, delay);
    }

    // Добавляем свойства count и allCount к обертке
    Object.defineProperty(wrapper, 'count', {
        get: () => count
    });

    Object.defineProperty(wrapper, 'allCount', {
        get: () => allCount
    });

    return wrapper;
}

// Пример использования
const functionToDecorate = () => console.log("Функция вызвана");
const decoratedFunction = debounceDecoratorNew(functionToDecorate, 100);

// Тестирование
decoratedFunction(1); 
console.log(decoratedFunction.count);

setTimeout(() => {
    decoratedFunction(2); 
}, 50);

setTimeout(() => {
    console.log(decoratedFunction.count); 
}, 150);

setTimeout(() => {
    decoratedFunction(3); 
}, 200);


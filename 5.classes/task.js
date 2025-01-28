// Базовый класс печатного издания
class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this._state = 100; // Состояние по умолчанию
        this.type = null; // Тип по умолчанию
    }

    // Метод для улучшения состояния
    fix() {
        this._state = Math.min(this._state * 1.5, 100); // Увеличиваем состояние, не превышая 100
    }

    // Геттер для состояния
    get state() {
        return this._state;
    }

    // Сеттер для состояния
    set state(newState) {
        if (newState < 0) {
            this._state = 0;
        } else if (newState > 100) {
            this._state = 100;
        } else {
            this._state = newState;
        }
    }
}

// Класс для журналов
class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = 'magazine'; // Устанавливаем тип
    }
}

// Класс для книг
class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author; // Имя автора
        this.type = 'book'; // Устанавливаем тип
    }
}

// Класс для романов
class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'novel'; // Устанавливаем тип
    }
}

// Класс для фантастических книг
class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'fantastic'; // Устанавливаем тип
    }
}

// Класс для детективов
class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'detective'; // Устанавливаем тип
    }
}

// Класс библиотеки
class Library {
    constructor(name) {
        this.name = name;
        this.books = []; // Хранилище книг
    }

    // Метод для добавления книги в библиотеку
    addBook(book) {
        if (book.state > 30) { // Проверка состояния книги
            this.books.push(book);
        }
    }

    // Метод для поиска книги по имени
    giveBookByName(name) {
        return this.books.find(book => book.name === name) || null; // Возвращаем книгу или null
    }

    // Метод для поиска книги по критериям
    findBookBy(type, value) {
        return this.books.find(book => book[type] === value) || null; // Возвращаем книгу или null
    }
}

// Пример использования

const sherlock = new PrintEditionItem(
    "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
    2019,
    1008
);

console.log(sherlock.releaseDate); // 2019
console.log(sherlock.state); // 100
sherlock.fix();
console.log(sherlock.state); // 100

const picknick = new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168
);

console.log(picknick.author); // "Аркадий и Борис Стругацкие"
picknick.state = 10;
console.log(picknick.state); // 10
picknick.fix();
console.log(picknick.state); // 15

const library = new Library("Районная библиотека");
library.addBook(sherlock); // Не добавится, так как состояние 100 > 30
library.addBook(picknick); // Добавится

const foundBookByName = library.giveBookByName("Пикник на обочине");
console.log(foundBookByName); // Найденная книга по имени

const foundBookByAuthor = library.findBookBy('author', "Аркадий и Борис Стругацкие");
console.log(foundBookByAuthor); // Найденная книга по автору
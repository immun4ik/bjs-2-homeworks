class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this.state = 100; 
        this.type = null; 
    }

    // Метод для улучшения состояния
    fix() {
        this.state = Math.min(100, this.state * 1.5); 
    }

    // Сеттер для состояния
    set state(value) {
        if (value < 0) {
            this._state = 0; 
        } else if (value > 100) {
            this._state = 100; 
        } else {
            this._state = value; 
        }
    }

    // Геттер для состояния
    get state() {
        return this._state;
    }
}

// Класс журналов
class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = "magazine"; 
    }
}

// Класс книг
class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author; 
        this.type = "book"; 
    }
}

// Класс романов
class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "novel"; 
    }
}

// Класс фантастики
class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "fantastic"; 
    }
}

// Класс детективов
class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "detective"; 
    }
}

// Пример использования
const sherlock = new PrintEditionItem(
    "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
    2019,
    1008
);

console.log(sherlock.releaseDate); 
console.log(sherlock.state); 
sherlock.fix();
console.log(sherlock.state); 

const picknick = new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168
);

console.log(picknick.author); 
picknick.state = 10;
console.log(picknick.state); 
picknick.fix();
console.log(picknick.state); 

class Library {
    constructor(name) {
        this.name = name; 
        this.books = []; 
    }

    // Метод для добавления книги в библиотеку
    addBook(book) {
        if (book.state > 30) { 
            this.books.push(book); 
        }
    }

    // Метод для поиска книги по заданному критерию
    findBookBy(type, value) {
        return this.books.find(book => book[type] === value) || null; 
    }

    // Метод для выдачи книги по названию
    giveBookByName(bookName) {
        const bookIndex = this.books.findIndex(book => book.name === bookName); 
        if (bookIndex !== -1) {
            return this.books.splice(bookIndex, 1)[0]; 
        }
        return null; 
    }
}

// Пример использования
const library = new Library("Библиотека имени Ленина");

library.addBook(
    new DetectiveBook(
        "Артур Конан Дойл",
        "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
        2019,
        1008
    )
);
library.addBook(
    new FantasticBook(
        "Аркадий и Борис Стругацкие",
        "Пикник на обочине",
        1972,
        168
    )
);
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));

console.log(library.findBookBy("name", "Властелин колец")); 
console.log(library.findBookBy("releaseDate", 1924).name); 

console.log("Количество книг до выдачи: " + library.books.length); 
const borrowedBook = library.giveBookByName("Машина времени");
console.log("Количество книг после выдачи: " + library.books.length); 

// Повреждаем книгу (уменьшаем состояние)
borrowedBook.state = 20;
console.log(borrowedBook.state); 

// Восстанавливаем книгу
borrowedBook.fix();
console.log(borrowedBook.state); 

// Пытаемся добавить восстановленную книгу обратно в библиотеку
library.addBook(borrowedBook);
console.log("Количество книг после попытки вернуть восстановленную книгу: " + library.books.length); 
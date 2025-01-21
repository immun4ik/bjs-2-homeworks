// Функция-конструктор для создания студента
function Student(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.marks = []; // Изначально массив оценок пуст
}


Student.prototype.setSubject = function(subjectName) {
    this.subject = subjectName; // Устанавливаем предмет
};


Student.prototype.addMarks = function(...marksToAdd) {
    if (this.marks) { // Проверка на существование массива оценок
        this.marks.push(...marksToAdd); // Добавляем оценки в массив
    }
};


Student.prototype.getAverage = function() {
    if (!this.marks || this.marks.length === 0) { // Проверка на наличие оценок
        return 0;
    }
    const sum = this.marks.reduce((acc, mark) => acc + mark, 0); // Суммируем оценки
    return sum / this.marks.length; // Возвращаем среднее значение
};

// Метод для исключения студента
Student.prototype.exclude = function(reason) {
    delete this.subject; // Удаляем предмет
    delete this.marks; // Удаляем оценки
    this.excluded = reason; // Устанавливаем причину исключения
};

// Примеры использования
const student1 = new Student("Иван", "мужской", 20);
student1.setSubject("Математика");
student1.addMarks(5, 4, 3);
console.log(student1.getAverage()); 

const student2 = new Student("Мария", "женский", 22);
student2.setSubject("Физика");
student2.addMarks(5, 5, 4);
console.log(student2.getAverage()); 

student1.exclude("Неуспеваемость");
console.log(student1); // Студент исключен, у него нет оценок и предмета
console.log(student1.getAverage()); 

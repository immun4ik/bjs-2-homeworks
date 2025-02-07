class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.intervalId = null;
    }

    addClock(time, callback) {
        if (!time || !callback) {
            throw new Error('Отсутствует обязательный аргумент');
        }
        const alarm = {
            time: time,
            callback: callback,
            canCall: true
        };
        this.alarmCollection.push(alarm);
    }

    removeClock(time) {
        this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== time);
    }

    clearAlarms() {
        this.alarmCollection = []; // Очищаем коллекцию будильников
        this.stop(); // Останавливаем интервал
    }

    getCurrentFormattedTime() {
        const date = new Date();
        return date.toTimeString().slice(0, 5); // Формат HH:MM
    }

    start() {
        if (this.intervalId) {
            return; // Интервал уже запущен
        }

        this.intervalId = setInterval(() => {
            const currentTime = this.getCurrentFormattedTime();
            this.alarmCollection.forEach(alarm => {
                if (alarm.time === currentTime && alarm.canCall) {
                    alarm.canCall = false; // Запрещаем повторный вызов
                    alarm.callback(); // Вызываем колбек
                    // Не вызываем resetAllCalls здесь, чтобы не сбрасывать canCall для других будильников
                }
            });
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null; // Устанавливаем intervalId в null
    }

    resetAllCalls() {
        this.alarmCollection.forEach(alarm => alarm.canCall = true);
    }
}
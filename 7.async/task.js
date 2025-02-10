class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.intervalId = null;
    }

    addClock(time, callback) {
        if (!time || !callback) {
            throw new Error('Отсутствует обязательный аргумент');
        }

        // Проверка на наличие будильника с таким же временем
        const existingAlarm = this.alarmCollection.find(alarm => alarm.time === time);
        if (existingAlarm) {
            console.warn('Уже присутствует звонок на это же время');
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
        this.alarmCollection = []; 
        this.stop(); 
    }

    getCurrentFormattedTime() {
        const date = new Date();
        return date.toTimeString().slice(0, 5); 
    }

    start() {
        if (this.intervalId) {
            return; 
        }

        this.intervalId = setInterval(() => {
            const currentTime = this.getCurrentFormattedTime();
            this.alarmCollection.forEach(alarm => {
                if (alarm.time === currentTime && alarm.canCall) {
                    alarm.canCall = false; 
                    alarm.callback(); 

                }
            });
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null; 
    }

    resetAllCalls() {
        this.alarmCollection.forEach(alarm => alarm.canCall = true);
    }
}
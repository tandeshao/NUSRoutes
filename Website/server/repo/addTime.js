const addTime = (time, duration) => {
    const hours = Math.floor(time/100) * 100;
    const mins = ((time/100) % 1) * 100;
    if ((mins + duration)/60 <= 1) {
        return Math.floor(time + duration);
    } else {
        return addTime(hours + 100, (((mins + duration)/60)- 1) * 60);
    }
}

module.exports = addTime;


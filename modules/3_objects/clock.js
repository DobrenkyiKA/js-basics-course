class Clock {

  run() {
    this.timer = setInterval(
        () => this.logCurrentTime(),
        1000);
  }

  stop() {
    clearInterval(this.timer);
    console.log(`timer stops`);
  }

  logCurrentTime() {
    console.log(this.convertDateToTime(new Date()));
  }
  convertDateToTime(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    let seconds = date.getSeconds();
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${hours}:${minutes}:${seconds}`;
  }
}

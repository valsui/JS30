class Clock {
    constructor(clock) {
        //assume that clock is document.querySelector
        this.clock = clock;
        this.hands = {
            sec: clock.querySelector('.second-hand'),
            min: clock.querySelector('.min-hand'),
            hour: clock.querySelector('.hour-hand')
        }
        this.time = new Date();
        this.id;
    }

    init() {
        this.id = setInterval(() => this.updateTime(new Date()), 1000);
    }

    stop(id) {
        clearInterval(this.id);
    }

    updateTime(time) {
        this.setSeconds(time);
        this.setMinutes(time);
        this.setHour(time);
        this.time = time;
        console.log(this.time);
    }

    rotate(hand, deg) {
        this.removeTransition(deg, hand);
        hand.style.transform = `rotate(${deg}deg)`;
    }

    removeTransition(deg, element) {
        if (deg === 90) {
            element.style.transition = 'none';
        } else if (element.style.transition === 'none') {
            element.style.transition = 'all 0.05s';
        }
    }

    setSeconds(time) {
        const seconds = time.getSeconds();
        const secsDegrees = ((seconds / 60) * 360) + 90;
        this.rotate(this.hands.sec, secsDegrees);
    }

    setMinutes(time) {
        const minutes = time.getMinutes();
        const minDegrees = ((minutes / 60) * 360) + 90;
        this.rotate(this.hands.min, minDegrees);
    }

    setHour(time) {
        const hours = time.getHours();
        const hrDegrees = ((hours / 12) * 360) + 90;
        this.rotate(this.hands.hour, hrDegrees);
    }
}

const clock = new Clock(document.querySelector('.clock'));
clock.init();

// setTimeout(() => clock.stop(clock.id), 10000);
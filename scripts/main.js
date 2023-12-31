class Timer {
    elementPForTime;

    btnStart;
    btnRound;
    btnStop;
    btnClear;
    btnClearRounds;
    btnCleatLastRound;

    currentTime = 0;
    setIntervalFunc;

    divForRoundsParent;
    divForRounds;
    round;

    allRounds;
    counterOfRounds = 0;


    constructor(elementPForTimeParam, btnStartParam, btnRoundParam, btnStopParam, btnClearParam, divForRoundsParam, btnClearRoundsParam, btnClearLastRoundParam) {
        this.elementPForTime = document.querySelector(elementPForTimeParam);
        this.createTimeInP();
        this.btnStart = document.querySelector(btnStartParam).addEventListener("click", this.startTime.bind(this));
        this.btnRound = document.querySelector(btnRoundParam).addEventListener("click", this.addRound.bind(this));
        this.btnStop = document.querySelector(btnStopParam).addEventListener("click", this.stopTime.bind(this));
        this.btnClear = document.querySelector(btnClearParam).addEventListener("click", this.clearTime.bind(this));
        this.btnClearRounds = document.querySelector(btnClearRoundsParam).addEventListener("click", this.clearRounds.bind(this));
        this.btnCleatLastRound = document.querySelector(btnClearLastRoundParam).addEventListener("click", this.clearLastRound.bind(this));
        this.divForRounds = document.querySelector(divForRoundsParam);

    }

    createTimeInP() {
        this.elementPForTime.style.color = "white";
        this.elementPForTime.textContent = "00:00:00";
    }

    startTime() {
        clearInterval(this.setIntervalFunc);
        this.setIntervalFunc = setInterval(() => {
            this.currentTime = this.currentTime + 1;
            this.elementPForTime.textContent = this.generateTextFromTime(this.currentTime);
        }, 1000);
    }


    stopTime(event) {
        clearInterval(this.setIntervalFunc);
    }

    clearTime() {
        clearInterval(this.setIntervalFunc);
        this.currentTime = 0;
        this.elementPForTime.textContent = "00:00:00";
    }

    addRound() {
        this.counterOfRounds++;
        this.divForRoundsParent = document.querySelector(".rounds");
        this.divForRoundsParent.style.display = "flex";
        this.divForRounds.style.display = "flex";
        this.round = document.createElement("p");
        this.round.innerHTML = `${this.counterOfRounds} round: ${this.generateTextFromTime(this.currentTime)}`;
        this.round.classList.add("roundStyle");
        this.divForRounds.append(this.round);
    }

    clearRounds() {
        this.allRounds = document.querySelectorAll(".roundStyle");
        this.allRounds.forEach(round => {
            round.remove()
        });
        this.counterOfRounds = 0;
        this.divForRoundsParent.style.display = "none";
    }

    clearLastRound() {
        let allRounds = document.querySelector(".fieldForRound");
        if (allRounds.children.length === 1) {
            this.counterOfRounds = 0;
            this.divForRoundsParent.style.display = "none";
        }
        allRounds.lastElementChild.remove();
        this.counterOfRounds--;
    }

    generateTextFromTime(time) {
        let hour = (time - time % 3600) / 3600
        let minute = ((time - time % 60) / 60) - (hour * 60)
        let sekund = time - ((hour * 3600) + (minute * 60))
        if (hour < 10) hour = '0' + hour
        if (minute < 10) minute = '0' + minute
        if (sekund < 10) sekund = '0' + sekund

        return `${hour}:${minute}:${sekund}`
    }
}

let timer = new Timer(".time", ".btnStart", ".btnRound", ".btnStop", ".btnClear", ".fieldForRound", ".btnClearRounds", ".btnClearLastRound");


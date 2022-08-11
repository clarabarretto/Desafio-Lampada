const lamp = document.querySelector("#Lamp")

let contador = 0;
let time;
let waitingTime;
let lampType = 'off';
let timeInterval;
let timeIntervalBreak;
let allowOn = true;

const setLampOff = () => {
    lampType = 'off';
    lamp.classList.remove('LampOn');
    lamp.classList.add('LampOff');
    blockLamp();
};

const setLampOn = () => {
    lampType = 'on';
    lamp.classList.remove('LampOff');
    lamp.classList.add('LampOn');
};

const breakLamp = () => {
    lampType = 'broken';
    lamp.classList.remove('LampOn');
    lamp.classList.add('BrokenLamp');
};

const goingToBreak = () => {
    waitingTime = 10;
    clearInterval(timeInterval);
    timeIntervalBreak = setInterval(() => {
        if(waitingTime > 5 && lampType === 'off'){
            setLampOn();
            return;
        };
        if(waitingTime === 0 && lampType ==='on'){
            breakLamp();
            clearInterval(timeIntervalBreak);
            return;
        };
        console.log("esperando quebrar",waitingTime);
        waitingTime--;
    },1000);
};
const totalTimer = () => { 
    time = 15;
    timeInterval = setInterval(() => {
        if (!allowOn || contador === 5) {
            goingToBreak();
            return;
        };
        if(lampType === 'on' && time === 0){
            setLampOff();
            clearInterval(timeInterval);
            contador++;
            return ;
        } ;
        console.log("esperando para apagar",time);
        time--;
    },1000);
};

const blockLamp = () => {
    allowOn = false;
    console.log(allowOn, 'allowOn');

    setTimeout(() => {
        allowOn = true;
        console.log(allowOn, 'allowOn');
    },5000);
};

document.addEventListener('mouseover', (e) => {
    const el = e.target;

    if (lampType === 'broken') return
    
    if(el.classList.contains('LampOff')){
        setLampOn();
        totalTimer();
        return       
    };
    if (el.classList.contains('LampOn')) {
        time = 15;
        return
    };  
});
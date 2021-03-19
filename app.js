const textOut = document.getElementById('text');
const led = document.getElementById('led');
const output = document.getElementById('output');
const ok = document.getElementById('ok');
const start = document.getElementById('start');
const end = document.getElementById('end');
let out;
let text;
let count = 0;
let j = 0;
let timeout = 50;
let spans;
let timer, timer0, timer1; // Timers for setTimeout
const hurryArr = ['Давай, не трусь', 'Долго мне ещё ждать? Думаешь, у меня своих дел нет?', 'Как знаешь.']; // Array for waiting massage
let hurry;
const interval = 70;

// Creating random string for waiting massage

function randomText() {
    r = Math.floor(Math.random() * hurryArr.length);
    hurry = hurryArr[r];
    console.log(hurry + hurryArr.length + r);
}

// Typing-text functions

function initText() {
    let textBox = document.getElementById('text');
    let newHTML = '';
    for (r = 0; r < text.length; r++) (newHTML += '<span>'+text[r]+'</span>')
    textBox.innerHTML = newHTML;
    spans = textBox.querySelectorAll('span');
    count = 0;
    j = 0;
}

function typingText() {
    output.classList.remove('free');
    spans[count].classList.add('visible');
    spans[count].classList.add('cursor');
    if (count < text.length - 1) {
        spans[count].classList.remove('cursor');
        count++;
    } else {
        clearInterval(timer);
        output.classList.add('free');
    }
}

let newOut = function() {
    out = String(out);
    out += ' ';
    text = out.split('');
    initText();
    timer = setInterval(typingText, interval);
    console.log(timer + ' ' + interval);
}

// Power on
start.onclick = function() {
    if (!output.classList.contains('on')) {
        led.classList.add('on');
        output.classList.add('on');
        output.classList.remove('free');
        out = 'Я хочу сыграть с тобой в одну игру... Готов?';
        newOut();
        timer1 = setInterval(() => {
            randomText();
            out = hurry;
            newOut();
        }, 10000);
    } else if (output.classList.contains('free')) {
        out = 'Чего ты жмёшь? Я уже включился. ОК жми';
        newOut();
    }
}

// Reactions to click buttons


// Beginning of the game

ok.onclick = function() {
    if (output.classList.contains('on') && output.classList.contains('free')) {
        output.classList.remove('free');
        if (!output.classList.contains('ready')) {
            clearTimeout(timer0);
            clearTimeout(timer1);
            out = 'Загадай натуральное число от 1 до 100 и нажми ОК.';
            newOut();
            output.classList.add('ready');
        } else {
            out = 'Твоё число больше или меньше 50?';
            newOut();
        }
    }
}

const truth = document.getElementById('true');
const less = document.getElementById('less');
const more = document.getElementById('more');
let i = 1;
let m = 0;
let nPrev = 0;
let n = 50
let data = [];
let data1 = [];
for (let k = 1; k <= 100; ++k) data.push(k);
let nPrePrev;
data1 = data;

less.onclick = function() {
    if (output.classList.contains('ready') && output.classList.contains('on') && output.classList.contains('free')) {
        ++i;
        nPrePrev = n;
        n -= Math.ceil(Math.abs(nPrev - n) / 2);
        data = data.slice(0, data.indexOf(nPrePrev));
        out = String('А как насчет ' + n + '?');
        newOut();
        nPrev = nPrePrev;
        if (data.length == 0) {
            n = -1;
            out = 'Я узнал, что ты пиздишь, c ' + i + ' попытки.';
            newOut();
        }
    } else if (output.classList.contains('ready') && output.classList.contains('free')) {
        out = 'Так сложно догадаться, что надо нажать? Жми ОК...';
        newOut();
    }
}

more.onclick = function() {
    if (output.classList.contains('ready') && output.classList.contains('on') && output.classList.contains('free')) {
        ++i;
        nPrePrev = n;
        n += Math.ceil(Math.abs(nPrev - n) / 2);
        data = data.slice(data.indexOf(nPrePrev) + 1, 100);
        out = String('А как насчет ' + n + '?');
        newOut();
        nPrev = nPrePrev;
        if (data.length == 0) {
            n = -1;
            out = 'Я узнал, что ты пиздишь, c ' + i + ' попытки.';
            newOut();
        }
    } else if (output.classList.contains('ready') && output.classList.contains('free')) {
        out = 'Так сложно догадаться, что надо нажать? Жми ОК...';
        newOut();
    }
}

truth.onclick = function() {
    if (output.classList.contains('ready') && output.classList.contains('on') && output.classList.contains('free')) {
        if (n != -1) {
            out = String('Я угадал твоё число c ' + i + ' попытки.');
            newOut();
            timer0 = setTimeout(() => {
                end.click();
            }, 5000);
        } else {
            out = String('Всего доброго.');
            newOut();
            timer0 = setTimeout(() => {
                end.click();
            }, 1500);
        }
    } else if (output.classList.contains('ready') && output.classList.contains('free')) {
        out = 'Так сложно догадаться, что надо нажать? Жми ОК...';
        newOut();
    }
}

// End of the game

end.onclick = function() {
    led.classList.remove('on');
    output.classList.remove('on');
    output.classList.remove('ready');
    textOut.textContent = '';
    clearTimeout(timer0);
    clearTimeout(timer1);
    clearInterval(timer);
    i = 1;
    m = 0;
    nPrev = 0;
    nPrePrev = 0;
    n = 50;
    data = [];
    for (let k = 1; k <= 100; ++k) data.push(k);
    data1 = data;
}

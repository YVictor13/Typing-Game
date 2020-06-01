// 设置时间限制
let TIME_LIMIT = 60;

// 定义quote被使用
let quotes_array = [
    "Push yourself, because no one else is going to do it for you.",
    "Failure is the condiment that gives success its flavor.",
    "Wake up with determination. Go to bed with satisfaction.",
    "It's going to be hard, but hard does not mean impossible.",
    "Learning never exhausts the mind.",
    "The only way to do great work is to love what you do."
];

// 选择所需要的元素进行命名
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let curr_quote = "";
let quoteNo = 0;
let timer = null;


function updateQuote() {
    quote_text.textContent = null;
    current_quote = quotes_array[quoteNo];
    current_quote.slice('').forEach(char => {
        const charSpan = document.createElement("span");
        charSpan.innerText = char;
        quote_text.appendChild(charSpan);
    });

    if (quoteNo < quotes_array.Learning - 1) {
        quoteNo++;
    } else {
        quoteNo = 0;
    }
}

function processCurrentText() {

    curr_input = input_area.value;
    curr_input_array = curr_input.split('');

    characterTyped++;

    errors = 0;
    quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
        let typedChar = curr_input_array[index];
        if (typedChar == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');
        } else if (typedChar === char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');
        } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');
            errors++;
        }
    });
    // 更新当前输入错误的数量
    error_text.textContent = total_errors + errors;
    // 计算当前的准确率
    // characterTyped为当前训练字符串的总字符数
    let correctCharacters = (characterTyped - (total_errors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100)

    accuracy_text.textContent = Math.round(accuracyVal);

    if (curr_input.length === current_quote.length) {
        updateQuote();
        total_errors += errors;
        input_area.value = "";
    }

}

function startGame() {
    // 重置所有的数据
    resetValues();
    // 更新文本
    updateQuote();
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);

}

function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;

    input_area.value = "";
    quote_text.textContent = "点击下面区域开始游戏";
    accuracy_text.textContent = 100;
    timer_text.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restart_btn.style.disabled = "none";
    cpm_group.style.disabled = "none";
    wpm_group.style.disabled = "none";
}


function updateTimer() {
    if (timeLeft > 0) {
        // 减少剩余时间
        timeLeft--;
        // 增加使用时间
        timeElapsed++
        timer_text.textContent = timeLeft + "s";
    } else {
        finishGame();
    }
}

function finishGame() {
    clearInterval(timer);
    input_area.disabled = true;

    quote_text.textContent = "点击下面区域重新开始游戏";

    restart_btn.style.disabled = "block";
    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;

    cpm_group.style.disabled = "block";
    wpm_group.style.disabled = "block";


}
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

// 设置系统中需要的一些全局变量
// 一次游戏所需时间
let timeLeft = TIME_LIMIT;
// 游戏时使用的时间
let timeElapsed = 0;
let total_errors = 0;
// 当前的错误次数
let errors = 0;
// 当前的准确率
let accuracy = 0;
// 键入字符总数
let characterTyped = 0;
// 未开始时quote中的文本
let current_quote = "";
// 计数quotes_array数组中的Index
let quoteNo = 0;
// 计时器
let timer = null;


function updateQuote() {
    // 首先将显示文本设置为null
    quote_text.textContent = null;
    // 重新获取显示文本
    current_quote = quotes_array[quoteNo];
    // 为获取的文本，进行‘’分隔,并将每个字符设置一个span元素
    current_quote.split('').forEach(char => {
        const charSpan = document.createElement("span");
        charSpan.innerText = char;
        // 并将相应的字符插入到显示文本中
        quote_text.appendChild(charSpan);
    });

    if (quoteNo < quotes_array.length - 1) {
        quoteNo++;
    } else {
        quoteNo = 0;
    }
}

function processCurrentText() {

    let curr_input = input_area.value;
    let curr_input_array = curr_input.split('');
    // 增加键入的字符总数
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
            // 增加错误数
            errors++;
        }
    });
    // 更新当前输入错误的数量
    error_text.textContent = total_errors + errors;
    // 计算当前的准确率
    // characterTyped为当前训练字符串的总字符数
    let correctCharacters = (characterTyped - (total_errors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);

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
    updateQuote();  // 更新文本
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
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
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
    // 隐藏启动按钮
    input_area.disabled = true;
    quote_text.textContent = "点击重新启动开始新游戏";


    restart_btn.style.display = "block";

    // calculate cpm and wpm
    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

    // update cpm and wpm text
    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;

    // display the cpm and wpm
    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
}
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

    if (curr_input.length == current_quote.length){
        updateQuote();
        total_errors+=errors;
        input_area.value="";
    }

}






# 网页版打字游戏
## 一、项目介绍
>打字游戏主要是为了训练以及测试当前使用者在规定时间内打字的速度。

>这里通过使用javascript来实现打字游戏。并通过计算每分钟字符数（CMP）、每分钟字数（WPM）和键入过程中将相应地标记输入错误的字符

## 二、设计
### 2.1、HTML进行布局 
>标头部分：显示当前键入会话的统计信息。包括剩余时间的显示，错误数量，准确性，以及WPM和CPM

>引用部分：显示必须在输入区域中键入的当前文本

>输入区域：包含必须在其中键入的当前文本

>重新启动按钮：重新启动按钮，在测试任务结束后，才会显示这个按钮，点击它后，可以从新进入打字训练游戏

### 2.2、HTML文件
```HTML
<!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>简单打字游戏</title>
       <!--    页面样式引入-->
       <link rel="stylesheet" href="style.css">
   </head>
   <body>
   <div class="container">
       <div class="heading">
           简单打字游戏
       </div>
       <!--        头部部分，显示WPM（每分钟字数）、CPM（每分钟字符数）,以及错误数、剩余时间、准确性-->
       <div class="header">
           <!--        WPM-->
           <div class="wpm">
               <div class="header_text">WPM</div>
               <div class="curr_wpm">100</div>
           </div>
           <!--CPM-->
           <div class="cpm">
               <div class="header_text">CPM</div>
               <div class="curr_cpm">100</div>
           </div>
           <!--        错误数-->
           <div class="errors">
               <div class="header_text">Errors</div>
               <div class="curr_errors">0</div>
           </div>
           <!--        当前剩余时间-->
           <div class="timer">
               <div class="header_text">Time</div>
               <div class="curr_time">60s</div>
           </div>
           <!--        准确性-->
           <div class="accuracy">
               <div class="header_text">% Accuracy</div>
               <div class="curr_accuracy">100</div>
           </div>
   
       </div>
   
       <!--    显示当前键入的文本-->
       <div class="quote">
           点击下面区域开始游戏
       </div>
       <!--    显示当前输入的文本，以及作为打字区域-->
       <textarea class="input_area" placeholder="在这里开始打字..." oninput="processCurrentText()"
                 onfocus="startGame()"></textarea>
       <button class="restart_btn" onclick="startGame()">重新开始</button>
   </div>
   
   <!--引入JS文件-->
   <script src="game.js"></script>
   </body>
   </html>
```
### 2.3、CSS样式设置
```CSS
/*设置整体样式*/
   /*文本、图片等等都居中显示*/
   body {
       background-color: #fe9801;
       color: black;
       text-align: center;
   }
   
   /*设置整个页面的样式：使用flex来对该div实现其内部的div都为居中，按照行进行排列*/
   .container {
       display: flex;
       flex-direction: column;
       align-items: center;
   }
   
   /*设置头部样式*/
   /*保证该div与下一个div相距离20px,并且设置字体大小为3rem,字体颜色为黑色*/
   .heading {
       margin-bottom: 20px;
       font-size: 3rem;
       color: black;
   }
   
   /*设置头部部分的div都以flex进行分布*/
   /*同时设置各个div为居中对齐*/
   .header {
       display: flex;
       align-items: center;
   }
   
   /*因为CPM、WPM、精确度和剩余时间都是一样的展示，所以这里的样式设置都是一样的*/
   .timer, .errors, .accuracy, .cpm, .wpm {
       background-color: #ccda46;
       height: 60px;
       width: 70px;
       margin: 8px;
       padding: 12px;
       border-radius: 20%;
       box-shadow: black 5px 8px 5px;
   }
   
   
   .cpm, .wpm {
       display: none;
   }
   
   .header-text {
       /*将文本文字转化为大写*/
       text-transform: uppercase;
       font-size: 0.6rem;
       font-weight: 600;
   }
   
   .curr_time, .curr_errors, .curr_accuracy, .curr_cpm, .curr_wpm {
       font-size: 2.75rem;
   }
   
   .quote {
       background-color: #ccda46;
       font-size: 1.5rem;
       margin: 10px;
       padding: 25px;
       box-shadow: black 5px 8px 5px;
   }
   
   .input_area {
       background-color: #f5f5c6;
       height: 80px;
       width: 40%;
       font-size: 1.5rem;
       font-width: 600;
       margin: 15px;
       padding: 20px;
       border: 0;
       box-shadow: black 5px 8px 5px;
   }
   
   .restart_btn {
       display: none;
       background-color: #326765;
       font-size: 1.5rem;
       padding: 10px;
       border: 0;
       box-shadow:black 5px 8px 5px;
   }
   
   .incorrect_char{
       color:red;
       text-decoration: underline;
   }
   
   .correct_char{
       color:darkgreen;
   }
```

### 2.4、业务逻辑设置
>选择所有元素并定义 <br>
使用querySelector()方法选择HTML布局中的必须元素。并为它们分配变量，<br>
>以便可以轻松访问和修改它们。开头还将定义在整个程序中将要访问的其他变量。
```javascript
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
```
### 2.5、准备显示的文本
>updateQuote()定义了一个处理以下内容的函数：

>1、获取文本：引号已用作必须输入文本游戏。每个引用都是从预定义数组中一个接一个地获取的。变量会跟踪当前的报价索引，并在每次请求新的报价时对其进行递增。
>2、将字符拆分为元素：文本中的每个字符都分为一系列<span>元素。这使得可以根据用户是否正确键入了每个字符来分别更改其颜色。这些元素被附加到变量中quote_text。
```javascript

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
```
### 2.6、由用户获取当前输入的文本
>processCurrentText()定义了一个函数，只要用户在输入框中输入或更改任何内容，<br>就会调用该函数。因此，它与oninput输入框的事件处理程序一起使用。此函数处理以下事情：

>1、获取输入框的当前值输入区域的value属性用于获取用户输入的当前文本。这被拆分为一个字符数组以与报价文本进行比较。这存储在中curr_input_array。
>2、为引用文本的字符着色，根据所输入引用的字符是否正确，将其显示为“红色”或“绿色”。这是通过选择我们之前创建的报价的span元素并循环遍历它们来完成的。然后，元素将根据是否与键入的文本匹配来应用上面创建的类。
>3、计算错误和准确性：每次用户在输入过程中输入错误时，errors变量都会递增。这用于通过将正确键入的字符数除以用户键入的字符总数来计算精度值
>4、移至下一个引号：当输入文本的长度与引号文本长度匹配时，将updateQuote()调用该函数，该函数将更改引号并清除输入区域。总错误数也将更新以用于下一个报价。
```javascript
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
```

### 2.7、开始游戏功能
>startGame()定义了一个函数，当用户将焦点放在输入框上时将调用该函数。因此，它与confocus输入框的事件处理程序一起使用。
>处理的事情：
>1、重置所有值：再开始新游戏之前，所有值都将重置为其默认值。我们创建一个函数：restValues()来处理此问题。
>2、更新文本：准备新的文本并通过调用该updateQuote()函数来显示它
>3、创建一个新计时器：计时器会跟踪剩余的秒数并将其显示给用户，它是使用setInterval()重复调用
>uodatetimer（）下面定义的函数的方法创建的。在创建计时器之前，使用清除先前的计时器实例clearInter().

```javascript
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
```


### 2.8、更新计时器
>updateTimer()定义一个函数，该函数将美妙调用一次跟踪时间。次函数处理以下的事情：
>1、更新时间值会更新：所有跟踪时间的变量。该timeLeft值减小，该timeElapsed值增大，并且计时器文本更新为当前剩余时间。
>2、完成游戏：达到时间限制时将触发此部分。它调用finishGame()下面定义的函数，从而完成游戏

```javascript

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
```

### 2.9、重整游戏
>finishGame()定义一个功能，当必须完成游戏时将调用该功能：
>1、删除计时器：删除之前创建的计时器实例
>2、显示重新启动游戏的文本和按钮：显示给用户的引用文本将更改为表示游戏结束的文本。通过将显示属性设置为“阻止,还可以显示”重新启动“按钮
>3、计算当前会话的CPM和WPM：
>（1）、每分钟字符数（CMP）通过将键入的字符总数除以经过的时间，然后将结果乘以60来计算，四舍五入以防止小数点过多。
>（2）、每分钟数字（WPM）的计算方法是将CPM除以5，然后将结果乘以60,5表示每个字的平均字符数。四舍五入防止出现小数点。

```javascript
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
```
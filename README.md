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
   <script scr="game.js"></script>
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



```
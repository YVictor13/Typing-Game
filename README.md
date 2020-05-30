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
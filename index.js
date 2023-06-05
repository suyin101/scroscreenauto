// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=123pan.com
// @grant        none
// ==/UserScript==

var scrollBar = document.documentElement;
var scrollInterval; // 滚动的定时器
var scrollButton; // 滚动按钮
var stopButton; // 停止按钮

// 创建滚动按钮和停止按钮
function createButtons() {
    scrollButton = document.createElement('button');
    scrollButton.textContent = '开始滚动';
    scrollButton.style.position = 'fixed';
    scrollButton.style.top = '100px';
    scrollButton.style.left = '10px';
    scrollButton.addEventListener('click', startScrolling);
    document.body.appendChild(scrollButton);

    stopButton = document.createElement('button');
    stopButton.textContent = '停止滚动';
    stopButton.style.position = 'fixed';
    stopButton.style.top = '200px';
    stopButton.style.left = '10px';
    stopButton.addEventListener('click', stopScrolling);
    document.body.appendChild(stopButton);
}

//设置滚动button的样式


// 开始滚动
function startScrolling() {
    var speed = parseInt(prompt('请输入滚动速度（像素/秒）：'));
    if (!isNaN(speed)) {
        scrollDown(speed);
    }
}

// 停止滚动
function stopScrolling() {
    clearInterval(scrollInterval);
}

// 监听滚动事件
scrollBar.addEventListener('scroll', function () {
    // 当滚动时执行的操作
    console.log('滚动条位置：', scrollBar.scrollTop);
});

// 滚动页面
function scrollDown(speed) {
    var currentPosition = scrollBar.scrollTop; // 当前滚动位置
    var targetPosition = scrollBar.scrollHeight; // 目标滚动位置
    var scrollStep = speed / 60; // 每帧滚动距离

    scrollInterval = setInterval(function () {
        if (currentPosition < targetPosition) {
            currentPosition += scrollStep;
            if (currentPosition >= targetPosition) {
                currentPosition = targetPosition;
                clearInterval(scrollInterval); // 清除滚动定时器
            }
            scrollBar.scrollTop = currentPosition;
        } else {
            clearInterval(scrollInterval); // 清除滚动定时器
        }
    }, 1000 / 60);
}
// 监听键盘事件
document.addEventListener('keydown', function (event) {
    if (event.altKey && event.key === 'z') {
        startScrolling();
    } else if (event.altKey && event.key === 'x') {
        stopScrolling();
    }
});

// 在页面加载完成后调用创建按钮函数
window.addEventListener('load', function () {
    createButtons();
});

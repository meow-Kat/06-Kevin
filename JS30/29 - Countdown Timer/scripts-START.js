{
    // 設一個計時器
    let endTime = document.querySelector('.display__end-time')
    let timeLeft = document.querySelector('.display__time-left')

    let buttons = document.querySelectorAll('.timer__controls > button')
    let Timer = function Timer(sec) {
        console.log(sec);
        clearInterval(Timer) // 把timer清除

        const now = Date.now() // 也可以這樣寫 new Date().getTime()
        const end = now + sec * 1000 // 毫秒要*1000
        // 倒數計時
        Timer = setInterval(function () {
            // 要拿動態的數字
            const secLeft = Math.floor((end - Date.now()) / 1000)
            //0的時候停止
            if (secLeft >= 0) {
                // 無條件捨棄
                const displayMin = Math.floor(sec / 60)
                const displaySec = secLeft % 60
                timeLeft.innerText = `${displayMin}:${displaySec}`
            }else{
                clearInterval(Timer)
            }
            // 60FPS 16毫秒更新一次
        }, 16);

        // 顯示最後時間
        const endDate = new Date(end)
        let hour = endDate.getHours()
        let min = endDate.getMinutes()
        // innerHTML風險高 innerText textContent新功能
        endTime.innerText = `Back at ${hour}:${min}`
    }

    // function setAnimationFrame(params) {
        
    // }

    buttons.forEach(button => {
        button.addEventListener('click', setTimer)
    })
    function setTimer() {
        // dataset 預設是文字要轉數字
        const sec = parseInt(this.dataset.time)
        Timer(sec);
    }
    document.querySelector('#custom').addEventListener('submit', function (e) {
        e.preventDefault() // 阻擋
        // console.log(this.minutes.value); // 可以看input輸入內容
        const value = parseInt(this.minutes.value)
        if (value) {
            console.log(value * 60); // 如果是value 才要 * 60 變秒
        }
    })
}

// 
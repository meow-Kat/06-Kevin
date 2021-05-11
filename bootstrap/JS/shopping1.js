    //未完成
    
    // STEP 1: 透過 querySelector 選擇到 HTML 中的「箭頭」元素
    const upElement = document.querySelector('.add')
    const downElement = document.querySelector('.remove')

    // STEP 2: 透過 querySelector 選擇到 HTML 中的「數字」元素
    var numberElement = document.querySelector('.num-count')
    var my_order_price = downElement.querySelector('.my-order-price')

    const currentNumber = Number(numberElement.value);
    
    


    //明天要把陣列放進去 用for


    // STEP 3: 監聽 click 事件，並執行對應的行為  e是window.event
    upElement.addEventListener('click', e => {
        // STEP 4: 取得當前網頁上的數字
        const currentNumber = Number(numberElement.value)

        // 取得數字變化
        console.log(e);
        // STEP 5: 將數字增加後帶回網頁上 textContent
        numberElement.value = currentNumber + 1;
    
    });

    downElement.addEventListener('click', e => {
    const currentNumber = Number(numberElement.value)
    numberElement.value = currentNumber - 1
    if ( numberElement.value < 1 ) {
        numberElement.value = currentNumber 
    }
    
    });
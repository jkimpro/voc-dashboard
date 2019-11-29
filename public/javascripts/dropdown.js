let dateConditionArr = ['접수일', '주문일'];
let srConditionArr = ['SR대분류', 'SR중분류', 'SR소분류'];
let codeArr = ['상품코드', '접수코드', '주문코드', '상품명'];

let dropDownChange = (option, num) =>{
    if(option ===0){
        let origin = document.getElementById('dateConditionDropdown');
        origin.innerText ="";
        origin.innerText = dateConditionArr[num];
    }
    else if(option ===1){
        let origin = document.getElementById('conditionDropdown');
        origin.innerText ="";
        origin.innerText = srConditionArr[num];
        
    }
    else{
        let origin = document.getElementById('codeDropdown');
        origin.innerText ="";
        origin.innerText = codeArr[num];
   
    }
}


let colCount =0;
let getDate = ()=>{

    let today = new Date();   
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    
    let result = String(year) + String(month) + String(date)

    return result;
}
let dateRange = [getDate(),getDate()];


$(function() {
    $('input[name="dates"]').daterangepicker({
        opens: 'left',
        locale:{
        format:'YYYY/MM/DD'
        }
    }, function(start, end, label) {
        dateRange[0] = start.format('YYYYMMDD');
        dateRange[1] = end.format('YYYYMMDD');
        console.log('setting the date' + start.format('YYYYMMDD') + 'to' + end.format('YYYYMMDD'));
    });
});

let getData = (dateConditionDropdown,dates,conditionDropdown,prdCondition,codeDropdown,code) =>{

}

let setTableData = (data) =>{

}
let serachData = () =>{

    let dateConditionDropdown = document.getElementById('dateConditionDropdown').innerText;
    let dates = dateRange;

    let conditionDropdown = document.getElementById('conditionDropdown').innerText;
    let prdCondition = document.getElementById('prdCondition').value;
    
    let codeDropdown =  document.getElementById('codeDropdown').innerText;
    let code = document.getElementById('code').value;


    console.log(dateConditionDropdown);
    console.log(dates);

    console.log(conditionDropdown);
    console.log(prdCondition);
    
    console.log(codeDropdown);
    console.log(code);

    let data = getData(dateConditionDropdown,dates,conditionDropdown,prdCondition,codeDropdown,code);
    setTableData(data);
}


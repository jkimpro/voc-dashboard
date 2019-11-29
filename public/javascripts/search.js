let colCount =0;

let getData = () =>{

}

let serachData = () =>{

    let dateConditionDropDown = document.getElementById('dateConditionDropDown').innerText;
    let dates =  document.getElementById('dates').innerHTML;
    
    let conditionDropdown = document.getElementById('conditionDropdown').innerText;
    let prdCondition = document.getElementById('prdCondition').innerText;
    
    let codeDropdown =  document.getElementById('codeDropdown').innerText;
    let code = document.getElementById('code').innerText;

    console.log(dateConditionDropDown);
    console.log(dates);
    console.log(prdconditionDropdown);
    console.log(prdCondition);
    
    console.log(codeDropdown);
    console.log(code);


    let data = getData(dateCondition, dateRange,condition,codeOption);

    setTableData(data);
}


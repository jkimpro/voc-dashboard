let mockTable = new Array();
$.getJSON('/mockTable.json', (data)=>{
    mockTable = data;
});



let colCount =1;
let modalTableRowCount =0;

let getDate = ()=>{
    let today = new Date();   
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    let result = String(year) + String(month) + String(date);
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


let getOnlyDate =(date) =>{
    let result = date.substring(0,8);
    result = result.substring(0,4) + "/" + result.substring(4,6) + "/" +result.substring(6,8);
    return result;
}
let getOnlyTime = (date) =>{
    let result = date.substring(8,14);
    result = result.substring(0,2) + ":" + result.substring(2,4) + ":" +result.substring(4,6);
    return result;
}




let getContentsFormat = (contents) =>{
    console.log("contents: " + contents);
    let result = ``;
    let output = contents.split('@').map((element)=>{
        let temp = element;
        temp = `@${element}<br>`;
        return temp;
    });

    for(let i =1; i<output.length; i++){
        result +=output[i];
    }
    return result; 
}


let isConditionExist= (originCond, compCond) => {
    //조건 소거 logic 별도 개발 필요

    return true;
}


let getTableData = (dateOption,dates,conditionDropdown,prdCondition,codeDropdown,code) =>{
    let result = new Array();
    if(dateOption === '접수일'){
        mockTable.map((element) =>{
            let compDate = parseInt(element.input_date.substring(0,8));
            if(compDate>= parseInt(dates[0])
                && compDate <= parseInt(dates[1])){
                 result.push(element);
            }
        });
    }
    else{
        mockTable.map((element) =>{
            let compDate = parseInt(element.order_date.substring(0,8));
            if(compDate>= parseInt(dates[0])
                && compDate <= parseInt(dates[1])){
                result.push(element);
            }
        });
    }

    for(let i =0; i<result.length; i++){
        if(isConditionExist(prdCondition, result[i].sr_option)
           && parseInt(code) === result[i].prd_code){
            continue;
        }
        else{
            result.splice(i, 1);
            i--;
        }
    }
    return result;
}


let setTable = (data) =>{
    let tableBody = document.getElementById('tableBody');
    if(colCount !==0){
        tableBody.innerHTML = ``;
        colCount=0; 
    }
    data.map((element) =>{
        let temp = document.createElement('tr');
        temp.className=`tdBasicStyle`;
        temp.setAttribute( 'data-toggle', 'modal');
        temp.setAttribute( 'data-target', '#exampleModalCenter');
        colCount+=1;
        temp.innerHTML = `
            <th scope="row"></th>
            <td class="noSubTd">${colCount}</td>
            <td>${getOnlyDate(element.input_date)}<br>
                ${getOnlyTime(element.input_date)}</td>
            <td>${getOnlyDate(element.order_date)}<br>
                ${getOnlyTime(element.order_date)}</td>
            <td>${element.prd_name}</td>
            <td>${element.attribute}</td>
            <td class="tdTopicFont">${element.topic}</td>
            <td class="tdKeywordFont">${element.keyword}</td>
            <td class="noSubTd">${element.sr_count}</td>
            <td>${getContentsFormat(element.sr_contents)}</td>
            <td>${element.sr_option}</td>
            <td></td>
        `
        tableBody.appendChild(temp);
    });    
}
let setResultBar = (data) =>{
    let resultBarTitle = document.getElementById('resultData'); 
    let resultBarCount = document.getElementById('resultCount');
    
    resultBarTitle.innerHTML = ``;
    resultBarCount.innerHTML = ``;

    resultBarTitle.innerHTML = "&nbsp; \'" + `${data[0].prd_code} ${data[0].prd_name}`+ "\' &nbsp;";
    resultBarCount.innerHTML = "&nbsp; " + `${colCount}건`;
}
let searchData = () =>{
    console.log(mockTable);
    let dateConditionDropdown = document.getElementById('dateConditionDropdown').innerText;
    let dates = dateRange;

    let conditionDropdown = document.getElementById('conditionDropdown').innerText;
    let prdCondition = document.getElementById('prdCondition').value;
    
    let codeDropdown =  document.getElementById('codeDropdown').innerText;
    let code = document.getElementById('code').value;

    
    let data = getTableData(dateConditionDropdown,dates,conditionDropdown,prdCondition,codeDropdown,code);
    setTable(data);
    setResultBar(data);
}


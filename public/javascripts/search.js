let mockTable = new Array();
let srTable = new Array();

let topicArr = ['배송관련', '상품관련', '교환/반품/AS관련', '방송이용관련', '상품품질관련', '고객제안', '미등록'];
let topicCount = [
    0,0,0,0,0,0,0
];
let colCount =1;
let modalTableRowCount =0;


$.getJSON('/mockTable.json', (data)=>{
    mockTable = data;
    console.log(mockTable);
});
$.getJSON('/srTable.json', (data)=>{
    srTable = data;
    console.log(srTable);
});



let getDate = ()=>{
    let today = new Date();   
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    let result = String(year) + String(month) + String("0" +date);
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
    if(date==='-' || date=== null){
        return date;
    }

    let result = date.substring(0,8);
    result = result.substring(0,4) + "/" + result.substring(4,6) + "/" +result.substring(6,8);
    return result;
}
let getOnlyTime = (date) =>{
    if(date==='-' || date=== null){
        return "";
    }
    let result = date.substring(8,14);
    result = result.substring(0,2) + ":" + result.substring(2,4) + ":" +result.substring(4,6);
    return result;
}


let getContentsFormat = (contents) =>{
    let result = ``;

    if(contents.indexOf('@') === -1){
        return contents;
    }

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
    //별도의 분류 체계없이 바로 true return 하는 것으로 설정해둠
    return true;
}


let getTableData = (dateOption,dates,conditionDropdown,prdCondition,codeDropdown,code) =>{
    let result = new Array();
    if(dateOption === '접수일'){    //필수 데이터
        mockTable.map((element) =>{
            let compDate = parseInt(element.input_date.substring(0,8));
            if(compDate >= parseInt(dates[0]) && compDate <= parseInt(dates[1])){
                result.push(element);
            }
        });
    }
    else{
        mockTable.map((element) =>{
            let compDate = parseInt(element.order_date.substring(0,8));
            if(compDate >= parseInt(dates[0]) && compDate <= parseInt(dates[1])){
                result.push(element);
            }
        });
    }
 
    if(code === "" || code === null){ return result;}

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

///테이블 및 Modal 세팅 부분-==============================================================
let setTable = (data) =>{
    let tableBody = document.getElementById('tableBody');
    if(colCount !==0){
        tableBody.innerHTML = ``;
        colCount=0; 
        topicCount.forEach(element=>{
            element =0;
        });
    }
    data.map((element) =>{
        colCount+=1;
        
        let targetModalId = 'exampleModalCenter'+String(colCount);
        let modalTableBody = 'modalTableBody'+ String(colCount);

        let inputModalId = '#' + targetModalId;
        let temp = document.createElement('tr');
        temp.className=`tdBasicStyle`;
        temp.setAttribute( 'data-toggle', 'modal');
        temp.setAttribute( 'data-target', inputModalId);
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
        temp.id= ("tableRow" + String(colCount));
        tableBody.appendChild(temp);
        if(topicArr.indexOf(element.topic)!== -1){
            topicCount[topicArr.indexOf(element.topic)] +=1;
        }
        

        ///sr활동 이력 관련된것=================================================================================================
        let bodyId = document.getElementById('body');
        let tmpModal = document.createElement('div');
        let count =1;
        tmpModal.className=`modal fade`;
        tmpModal.id = targetModalId;
        tmpModal.setAttribute( 'tabindex', '-1');
        tmpModal.setAttribute( 'role', 'dialog');
        tmpModal.setAttribute( 'aria-labelledby', 'exampleModalCenterTitle');
        tmpModal.setAttribute( 'aria-hidden', 'true');
        tmpModal.innerHTML =`
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header d-flex align-items-center modalHeader">
                            SR활동이력
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <img src="images/modalClose.png"/>
                        </button>
                    </div>
                    <div class="modal-body modalBody scrollbar scrollbar-primary">
                        <div class="row tableUpperBar">
                        <div class="col-md-6 resultFont resultModalFont">
                                활동 이력 건수: <span class="resultMarkFont resultModalFont"> ${srTable.length}건 </span> 
                        </div>
                        <div class="col-md-6 justify-content-end resultRightModalFont" display="inherit">
                                주문번호: <span class="modalMargin" id="orderNum"> ${element.order_num} </span>
                                SR번호: <span id="srNum"> ${'S225419509'} </span>
                        </div>
                        </div>
                        <table class="table">
                            <thead>
                                <tr class="noFont"> 
                                    <th scope="col" class="modalDefaultCell modalNo">No.</th>
                                    <th scope="col" class="modalDefaultCell modalInputDate">접수일시</th>
                                    <th scope="col" class="modalDefaultCell modalActive">활동유형</th>
                                    <th scope="col" class="modalDefaultCell modalContents">내용</th>
                                </tr>
                            </thead> 
                            <tbody id="${modalTableBody}"> 
                            </tbody>
                        </table>        
                    </div>
                </div>
            </div>
        `
        bodyId.appendChild(tmpModal);
        srTable.map((rowData) =>{
            let modalTable = document.getElementById(modalTableBody);
            let tmpRow = document.createElement('tr');
            tmpRow.className=`tdBasicStyle`;
            tmpRow.innerHTML =`
            <td class="noSubTd">${count}</td>
                <td>${getOnlyDate(rowData.sr_input_date)}<br>
                ${getOnlyTime(rowData.sr_input_date)}</td>
                <td class="modalCellDetailFont">${rowData.sr_active_cat}</td>
                <td class="modalCellDetailFont">${getContentsFormat(rowData.sr_contents)}</td>
            `
            modalTable.appendChild(tmpRow);
            count++;
        });
    });    
    
    for(let i=0; i<topicArr.length; i++){
        let tempString = "topic" +String(i);
        let tempId = document.getElementById(tempString);

        tempId.innerText ="";
        tempId.innerText = String(topicCount[i]);
    }
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


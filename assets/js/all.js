pickDate();

// 日曆選擇
function pickDate(){
	$( ".datePicker" ).datepicker({
  	dayNamesMin: [ "日", "一", "二", "三", "四", "五", "六"  ],
  	minDate: 0, maxDate: "+3M +10D",
  	dateFormat: "yy-mm-dd",
  	onClose: checkDate
  });
}


const inputName = document.getElementById('inputName');
const inputTel = document.getElementById('inputTel');
const dateFrom = document.querySelector('.dateFrom');
const dateTo = document.querySelector('.dateTo');
const closeModal = document.querySelector('.closeModal');


inputName.addEventListener('focusout',isBlank,false);
inputTel.addEventListener('focusout',isBlank,false);
closeModal.addEventListener('click',clearAll,false);


// 解鎖 確認預約按鈕
function unlockBtn(){
	if(dateFrom.value !="" && dateTo.value !="" && inputName.value !='' && inputTel.value !=''){
		$('#reserveBtn').attr("disabled", false);
	}
}

// 檢查預約住宿的姓名電話
function isBlank(e){
	const inputId = e.target.id;
	const inputValue = e.target.value;
	const booleanValue = Boolean(inputValue === '');
	const str = inputId + booleanValue;
	const jsNameError = document.querySelector('.jsNameError');
	const jsTelError = document.querySelector('.jsTelError');
	switch(str){
		case 'inputNametrue':
			jsNameError.textContent = '請輸入姓名!';
			break;
		case 'inputTeltrue':
			jsTelError.textContent = '請輸入電話!';
			break;
		case 'inputNamefalse':
			jsNameError.textContent = '';
			break;
		case 'inputTelfalse':
			jsTelError.textContent = '';
			break;
	}	
	unlockBtn();
}

// 檢查入住退房日期
function checkDate(){
	const dateFromValue = dateFrom.value;
	const dateToValue = dateTo.value;
	const jsDateError = document.querySelector('.jsDateError');
	const reserveBtn = document.getElementById('reserveBtn');
	jsDateError.textContent = "";
	if(dateFromValue =="" || dateToValue ==""){
		jsDateError.textContent = "入住日期或退房日期不可為空白!";
		return;
	}else if (dateToValue <= dateFromValue){
		jsDateError.textContent = "退房日期不可以早於入住日期!";
		return;
	}
	// 顯示總天數
	totalDate(dateFromValue,dateToValue);
	unlockBtn();

}

// 計算住宿總天數
function totalDate(dateFromValue,dateToValue){
	const dateStart = new Date(dateFromValue);
	const dateEnd = new Date(dateToValue);
	const days = parseInt(Math.abs(dateStart - dateEnd) / 1000 / 60 / 60 / 24);
	const jsdays = document.querySelector('.jsdays');
	jsdays.textContent = days + ' 晚';
	// 顯示總價格
	totalPrice(days);
}

// 計算總價格
function totalPrice(days){
	const singlePrice = 1230;
	const totalPrice = days*singlePrice;
	const jsTotalPrice = document.querySelector('.jsTotalPrice');
	jsTotalPrice.textContent = '= NT.' + totalPrice;
}

// 清除已填的資料
function clearAll(){
	inputName.value = '';
	inputTel.value = '';
	dateFrom.value = '';
	dateTo.value = '';
}

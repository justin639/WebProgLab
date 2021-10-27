let authPage = document.getElementById('authPage');
let welcomePage = document.getElementById('welcomePage');
let accountInfoPage = document.getElementById('accountInfoPage');
let withdrawPage = document.getElementById('withdrawPage');
let depositPage = document.getElementById('depositPage');
let transferPage = document.getElementById('transferPage');
let confirmPage = document.getElementById('confirmPage');
let donePage = document.getElementById('donePage');


let inputStr = document.getElementById('inputNum');
let inputDeposit = document.getElementById('inputDeposit');
let inputTransfer = document.getElementById('inputTransfer');
let inputWithdraw = document.getElementById('inputWithdraw');
let accountData = [
    {num: '0000000000000000', pin: '0000'},
    {num: '1111111111111111', pin: '0001'},
    {num: '1111111111111110', pin: '0002'}];
let accountLog = [
    [{
        time: 'Sun Oct 17 2021 16:42:21 GMT+0900 (한국 표준시)',
        in: 0,
        out: 0,
        balance: 1820
    }, {
        time: 'Mon Oct 18 2021 18:33:14 GMT+0900 (한국 표준시)',
        in: 180,
        out: 0,
        balance: 2000
    }],
    [{
        time: 'Sat Oct 16 2021 21:23:58 GMT+0900 (한국 표준시)',
        in: 0,
        out: 0,
        balance: 2000
    }],
    [{
        time: 'Tue Nov 21 2021 09:23:31 GMT+0900 (한국 표준시)',
        in: 0,
        out: 0,
        balance: 1500
    }]
]
let statePIN = false;
let pageState = -1; // 0: withdraw | 1:deposit | 2:transfer
let currentUID = -1; // uid -1 means no UID available
let count = 5;
let tempFundOut = 0;
let tempFundIn = 0;
let fromUID = -1;
let toUID = -1;
let log = [{
    time: 'some time',
    in: 0,
    out: 0,
    balance: 0
}]

// functions for auth Page
function changeState(uid) {
    if (statePIN) {
        document.getElementById('initTitle').hidden = true;
        document.getElementById('inputInst').innerText = 'Please enter your PIN:'
        inputStr.placeholder = 'Enter PIN';
        currentUID = uid;
        console.log("Enter PIN");
    } else {
        document.getElementById('initTitle').hidden = false;
        document.getElementById('inputInst').innerText = 'Enter your 16 digit account number or insert your card below:'
        inputStr.placeholder = 'Enter Account Number';
        currentUID = uid;
        console.log("Go back to main page.");
    }
}

function clickNum(number) {
    inputStr.value += number;
}

function deleteNum() {
    inputStr.value = inputStr.value.substring(0, inputStr.value.length - 1);
}

function authAccount() {
    if (inputStr.value.length < 16) {
        alert("Account Number is less than 16 - digit.");
    } else if (inputStr.value.length > 16) {
        alert("Account Number is more than 16 - digit.");
    } else {
        let account = inputStr.value;
        // find matching user number
        let i;
        for (i = 0; i < accountData.length; i++) {
            console.log('Card Number : ' + account);
            if (accountData[i].num === account) {
                statePIN = true;
                changeState(i);
                break;
            }
        }
        if (i === accountData.length) {
            alert("That account number does not exist!");
        }
    }
    inputStr.value = "";
}

function authPIN() {
    if (inputStr.value === accountData[currentUID].pin) {
        // open welcome page
        console.log("Account auth successful");
        initInfo();
        authPage.style.display = 'none';
        welcomePage.hidden = false;
    } else {
        count--;
        if (count === 0) {
            alert("You don't have any attempts left. Going back to main page.");
            statePIN = false;
            count = 5;
            changeState(-1)
        } else {
            alert("Incorrect PIN. You have " + count + " attempts left.");
        }
    }
    inputStr.value = "";
}

function returnAuth(index) {
    resetInfo();
    authPage.style.display = 'flex';
    if (index === 0) {
        welcomePage.hidden = true;
    } else if (index === 1) {
        donePage.hidden = true;
    }

    statePIN = false;
    changeState(-1)
}

function resetInfo() {
    let logTable = document.getElementById('logTable');
    for (let i = 2; i < logTable.children.length;) {
        logTable.removeChild(logTable.children[i]);
    }
}

function initInfo() {
    console.log('initializing account log...')
    let temp = document.getElementById('tempLog');
    let logTable = document.getElementById('logTable');
    for (let i = 0; i < accountLog[currentUID].length; i++) {
        let clone = document.importNode(temp.content, true);
        if (i % 2 === 1) {
            clone.children[0].style.backgroundColor = '#eeeeef'
        }
        clone.children[0].children[0].innerText = `${accountLog[currentUID][i].time}`;
        clone.children[0].children[1].innerText = `${accountLog[currentUID][i].out}`;
        clone.children[0].children[2].innerText = `${accountLog[currentUID][i].in}`;
        clone.children[0].children[3].innerText = `${accountLog[currentUID][i].balance}`;
        logTable.appendChild(clone);
    }
    console.log('initialize done.')
}

function showPage(index) {
    welcomePage.hidden = true
    if (index === 0) {
        showInfo();
    } else if (index === 1) {
        showWithdraw();
    } else if (index === 2) {
        showDeposit();
    } else if (index === 3) {
        showTransfer();
    }
}

// functions for welcome Page & info page
function showInfo() {
    document.getElementById('currentBlc').innerText = `Current Balance:$${accountLog[currentUID][accountLog[currentUID].length - 1].balance}`;
    accountInfoPage.hidden = false;
}

function backWelcome(index) {
    if (index === 0) {
        accountInfoPage.hidden = true;
    } else if (index === 1) {
        inputWithdraw.innerText = '0';
        withdrawPage.hidden = true;
    } else if (index === 2) {
        document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(236, 245, 255)'
        inputDeposit.style.color = 'grey';
        inputDeposit.innerText = '$0000.00'
        depositPage.hidden = true;
    } else if (index === 3) {
        document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(236, 245, 255)'
        transferPage.hidden = true;
    } else if (index === 4) {
        donePage.hidden = true;
    }
    pageState = -1;
    welcomePage.hidden = false;
}

// end info page

// functions for withdraw Page
function showWithdraw() {
    pageState = 0;
    withdrawPage.hidden = false;
}

function addWithdraw(withdraw) {
    let tempWithdraw = parseInt(inputWithdraw.innerText) + withdraw;
    if (tempWithdraw < 0) {
        tempWithdraw = 0;
    } else if (tempWithdraw > 300) {
        tempWithdraw = 300;
        alert("$300 is the limit to withdraw from the ATM");
    }
    else if(tempWithdraw > accountLog[currentUID][accountLog[currentUID].length-1].balance){
        tempWithdraw = accountLog[currentUID][accountLog[currentUID].length-1].balance;
        alert("Can't withdraw more than current running balance");
    }
    inputWithdraw.innerText = `${tempWithdraw}`;
}

function confirmWithdraw(input) {
    if (input === 0) {
        alert("You have to withdraw at least $1");
        return;
    }else if(input > accountLog[currentUID][accountLog[currentUID].length-1].balance){
        alert("Can't withdraw more than current running balance");
        return;
    }
    tempFundOut = input;
    document.getElementById('result').innerText = '$' + input + '?';
    document.getElementById('confirmQuestion').innerText = 'Withdraw'
    inputWithdraw.innerText = '0';
    withdrawPage.hidden = true;
    confirmPage.hidden = false;
}

// end withdraw page

// functions for deposit Page
function showDeposit() {
    pageState = 1;
    depositPage.hidden = false;
    document.getElementsByTagName('body')[0].style.backgroundColor = 'white'
}

function clickCal(number) {
    let currentPage;
    if (pageState === 1) {
        currentPage = inputDeposit;
    } else if (pageState === 2) {
        currentPage = inputTransfer;
    }
    if (currentPage.innerText === '$0000.00') {
        currentPage.style.color = 'black';
        if (number === '.') {
            currentPage.innerText = '0';
        } else {
            currentPage.innerText = '';
        }
    } else if (currentPage.innerText.indexOf('.') !== -1)
        if (currentPage.innerText.split('.')[1].length === 2) {
            alert('Only 2 decimal place can be inputted');
            return;
        } else if (number === '.') {
            alert('Already decimal, cannot add any more decimal point');
            return;
        }
    currentPage.innerText += number;
}

function deleteCal() {
    let currentPage;
    if (pageState === 1) {
        currentPage = inputDeposit;
    } else if (pageState === 2) {
        currentPage = inputTransfer;
    }
    if (currentPage.innerText.length === 1) {
        currentPage.style.color = 'grey';
        currentPage.innerText = '$0000.00'
    } else if (currentPage.innerText === '$0000.00') {
        return;
    } else {
        currentPage.innerText = currentPage.innerText.substring(0, currentPage.innerText.length - 1);
    }
}

function confirmDeposit(input) {
    if (input === 0.00 || isNaN(input)) {
        alert("You have to deposit at least $0.01");
        return;
    }
    tempFundIn = input;
    document.getElementById('result').innerText = '$' + input + '?';
    document.getElementById('confirmQuestion').innerText = 'Are you sure you want to deposit the amount specified?'
    inputDeposit.style.color = 'grey';
    inputDeposit.innerText = '$0000.00';
    depositPage.hidden = true;
    confirmPage.hidden = false;
}

// end deposit page

// functions for transfer Page
function showTransfer() {
    pageState = 2;
    setTransfer();
    transferPage.hidden = false;
    document.getElementsByTagName('body')[0].style.backgroundColor = 'white'
}

function setTransfer() {
    let fromEl = document.getElementById('from');
    let toEl = document.getElementById('to');

    for (let i = 0; i < accountData.length; i++) {
        let temp = document.createElement('option');
        temp.value = `${i}`;
        temp.innerText = accountData[i].num;
        if (i === currentUID) {
            fromEl.appendChild(temp);
        } else {
            toEl.appendChild(temp);
        }
    }
}

function confirmTransfer(input) {
    if (input === 0.00 || isNaN(input)) {
        alert("You have to transfer at least $0.01");
        return;
    } else if (input > accountLog[currentUID][accountLog[currentUID].length - 1].balance) {
        alert("You can't transfer more than running balance")
        inputTransfer.style.color = 'grey';
        inputTransfer.innerText = '$0000.00';
        return;
    }

    let fromEl = document.getElementById('from');
    let toEl = document.getElementById('to');
    for(let i =0; i<fromEl.children.length;i++){
        if(fromEl.children[i].selected){
            fromUID = fromEl.children[i].value;
        }
    }
    if(fromUID === ''){
        alert("You haven't selected from account");
        return;
    }
    for(let i =0; i<toEl.children.length;i++){
        if(toEl.children[i].selected){
            toUID = toEl.children[i].value;
        }
    }
    if(toUID === ''){
        alert("You haven't selected to account");
        return;
    }

    tempFundOut = input;
    document.getElementById('result').innerText = `$${input}\nFrom ${accountData[fromUID].num}\nTo ${accountData[toUID].num}`;
    document.getElementById('confirmQuestion').innerText = 'Transfer?'
    inputTransfer.style.color = 'grey';
    inputTransfer.innerText = '$0000.00';
    transferPage.hidden = true;
    confirmPage.hidden = false;
}

// end transfer page
function backRecentPage() {
    if (pageState === 0) {
        withdrawPage.hidden = false;
    } else if (pageState === 1) {
        document.getElementsByTagName('body')[0].style.backgroundColor = 'white'
        depositPage.hidden = false;
    } else if (pageState === 2) {
        document.getElementsByTagName('body')[0].style.backgroundColor = 'white'
        transferPage.hidden = false;
    }
    confirmPage.hidden = true;
    donePage.hidden = true;
}

function taskDone() {
    addLog(tempFundIn, tempFundOut)
    tempFundIn = 0;
    tempFundOut = 0;
    confirmPage.hidden = true;
    console.log(pageState);
    if (pageState === 0) {
        document.getElementById('taskMessage').innerText = 'Money has been withdrawn';
        document.getElementById('redoTaskBtn').innerText = 'Perform Another Withdraw';
        donePage.hidden = false;
    } else if (pageState === 1) {
        document.getElementById('inputMoneyPage').hidden = false;
    } else if (pageState === 2) {
        document.getElementById('taskMessage').innerText = 'Money has been transferred';
        document.getElementById('redoTaskBtn').innerText = 'Perform Another Transaction';
        donePage.hidden = false;
    }
}

function inputMoneyDone() {
    document.getElementById('taskMessage').innerText = 'Money has been deposited';
    document.getElementById('redoTaskBtn').innerText = 'Deposit Again';
    document.getElementById('inputMoneyPage').hidden = true;
    donePage.hidden = false;
}

function addLog(fundIn, fundOut) {
    let temp = document.getElementById('tempLog');
    let logTable = document.getElementById('logTable');
    let clone = document.importNode(temp.content, true);
    let runBalance = accountLog[currentUID][accountLog[currentUID].length - 1].balance - fundOut + fundIn;

    log.time = new Date();
    log.in = fundIn;
    log.out = fundOut;
    log.balance = runBalance;
    accountLog[currentUID].push(log);

    if (logTable.children.length % 2 === 1) {
        clone.children[0].style.backgroundColor = '#eeeeef';
    }
    clone.children[0].children[0].innerText = `${log.time}`;
    clone.children[0].children[1].innerText = `${log.out}`;
    clone.children[0].children[2].innerText = `${log.in}`;
    clone.children[0].children[3].innerText = `${log.balance}`;
    logTable.appendChild(clone);

    if(pageState === 2){
        runBalance = accountLog[toUID][accountLog[toUID].length - 1].balance + fundOut - fundIn;
        log.in = fundOut;
        log.out = fundIn;
        log.balance = runBalance;
        accountLog[toUID].push(log);
    }
}


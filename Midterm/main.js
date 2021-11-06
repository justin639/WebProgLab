// initializing all the pages
let authPage = document.getElementById('authPage');
let welcomePage = document.getElementById('welcomePage');
let accountInfoPage = document.getElementById('accountInfoPage');
let withdrawPage = document.getElementById('withdrawPage');
let depositPage = document.getElementById('depositPage');
let transferPage = document.getElementById('transferPage');
let confirmPage = document.getElementById('confirmPage');
let donePage = document.getElementById('donePage');

// initializing all the inputs
let inputStr = document.getElementById('inputNum');
let inputDeposit = document.getElementById('inputDeposit');
let inputTransfer = document.getElementById('inputTransfer');
let inputWithdraw = document.getElementById('inputWithdraw');

// account initial data & log hard coded
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

// initialize state and data
let statePIN = false; // bool data for checking card number auth
let pageState = -1; // 0: withdraw | 1:deposit | 2:transfer
let currentUID = -1; // uid -1 means no UID available
let count = 5; // PIN auth count
let tempFundOut = 0;
let tempFundIn = 0;
let fromUID = -1; // save which UID transfer is sent from
let toUID = -1; // save which UID transfer is sent to
// initialize Object for account log
let log = [{
    time: 'some time',
    in: 0,
    out: 0,
    balance: 0
}]

// functions for Auth Page ================================
// function for changing Card Number Auth to PIN Auth
function changeState(uid) {
    // if statePIN is true change to PIN Auth
    if (statePIN) {
        document.getElementById('initTitle').hidden = true;
        document.getElementById('inputInst').innerText = 'Please enter your PIN:'
        inputStr.placeholder = 'Enter PIN';
        currentUID = uid;
        console.log("Enter PIN");
    }
    // else change back to Card Number Auth
    else {
        document.getElementById('initTitle').hidden = false;
        document.getElementById('inputInst').innerText = 'Enter your 16 digit account number or insert your card below:'
        inputStr.placeholder = 'Enter Account Number';
        currentUID = uid;
        console.log("Go back to main page.");
    }
} // end changeState

// function for text input
function clickNum(number) {
    inputStr.value += number;
} // end changeState

// function for text deletion
function deleteNum() {
    inputStr.value = inputStr.value.substring(0, inputStr.value.length - 1);
} // end deleteNum

// function for Card Number Auth
function authAccount() {
    // check for input Number digits
    if (inputStr.value.length < 16) {
        alert("Account Number is less than 16-digit.");
    } else if (inputStr.value.length > 16) {
        alert("Account Number is more than 16-digit.");
    }
    // digit condition passed
    else {
        let account = inputStr.value;
        // find matching UID for all users
        let i;
        for (i = 0; i < accountData.length; i++) {
            console.log('Card Number : ' + account);
            // UID match found --> change to PIN Auth
            if (accountData[i].num === account) {
                statePIN = true;
                // change to PIN Auth
                changeState(i);
                break;
            }
        }
        // No Match found
        if (i === accountData.length) {
            alert("That account number does not exist!");
        }
    }
    // reset input number(Card Number)
    inputStr.value = "";
} // end authAccount

// function for PIN Auth
function authPIN() {
    // using UID found from authAccount(), match PIN in given Count
    // if PIN match --> open Welcome/Home Page
    if (inputStr.value === accountData[currentUID].pin) {
        console.log("Account auth successful");
        // initializing account info table
        initInfo();
        // open Welcome/Home Page
        authPage.style.display = 'none';
        welcomePage.hidden = false;
    } else {
        count--;
        // if no more Count --> change to Card Number Auth
        if (count === 0) {
            alert("You don't have any attempts left. Going back to main page.");
            // reset state & Count
            statePIN = false;
            count = 5;
            // change to Card Number Auth
            changeState(-1)
        } else {
            alert("Incorrect PIN. You have " + count + " attempts left.");
        }
    }
    // reset input number(PIN)
    inputStr.value = "";
} // end authPIN

// function for Welcome/Home & Done Page --> Auth Page
function returnAuth(index) {
    // reset All the account Info
    resetInfo();
    // open Auth Page
    authPage.style.display = 'flex';
    // from index 0: Welcome/Home Page | 1: Done Page
    if (index === 0) {
        welcomePage.hidden = true;
    } else if (index === 1) {
        resetOption();
        donePage.hidden = true;
    }
    // reset state & Count
    statePIN = false;
    count = 5;
    // change to Card Number Auth
    changeState(-1)
} // end returnAuth

// function for resetting account Info
function resetInfo() {
    // reset account Log table
    let logTable = document.getElementById('logTable');
    for (let i = 2; i < logTable.children.length;) {
        logTable.removeChild(logTable.children[i]);
    }
} // end resetInfo

// function for initializing account Info Table
function initInfo() {
    console.log('initializing account log...')
    // get <template id = "tempLog">...</template> and create & append
    let temp = document.getElementById('tempLog');
    let logTable = document.getElementById('logTable');
    for (let i = 0; i < accountLog[currentUID].length; i++) {
        let clone = document.importNode(temp.content, true);
        // table's background color differs
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
} // end initInfo
// end Auth page ==========================================

// functions for welcome Page =============================
// function for moving to another page from Welcome/Home Page
function showPage(index) {
    // index 0: Info Page | 1: Withdraw Page | 2: Deposit Page| 3: Transfer Page
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
} // end showPage

// function for moving to Welcome/Home Page from other Pages
function backWelcome(index) {
    // index 0: Info Page | 1: Withdraw Page | 2: Deposit Page| 3: Transfer Page | 4: Done Page
    if (index === 0) {
        accountInfoPage.hidden = true;
    } else if (index === 1) {
        // reset Input
        inputWithdraw.innerText = '0';
        withdrawPage.hidden = true;
    } else if (index === 2) {
        // background-color change
        document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(236, 245, 255)'
        // reset Input
        inputDeposit.style.color = 'grey';
        inputDeposit.innerText = '$0000.00'
        depositPage.hidden = true;
    } else if (index === 3) {
        // background-color change
        document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(236, 245, 255)'
        // reset Input
        resetOption();
        inputTransfer.style.color = 'grey';
        inputTransfer.innerText = '$0000.00'
        transferPage.hidden = true;
    } else if (index === 4) {
        resetOption();
        donePage.hidden = true;
    }
    // reset PageState
    pageState = -1;
    welcomePage.hidden = false;
} // end backWelcome
// end Welcome/Home Page ==================================

// function for Info Page =================================
// function for showing Info Page
function showInfo() {
    document.getElementById('currentBlc').innerText = `Current Balance:$${accountLog[currentUID][accountLog[currentUID].length - 1].balance}`;
    accountInfoPage.hidden = false;
} // end showInfo
// end Info page ==========================================

// functions for Withdraw/Home Page =======================
//     (PageState = 0)
// function for showing Withdraw/Home Page
function showWithdraw() {
    // set Page State
    pageState = 0;
    withdrawPage.hidden = false;
} // end showWithdraw

// function for adding withdraw with arrow buttons
function addWithdraw(withdraw) {
    let tempWithdraw = parseInt(inputWithdraw.innerText) + withdraw;
    // withdraw can't be negative
    if (tempWithdraw < 0) {
        tempWithdraw = 0;
    }
    // withdraw limit $300
    else if (tempWithdraw > 300) {
        tempWithdraw = 300;
        alert("$300 is the limit to withdraw from the ATM");
    }
    // withdraw can't be more than current running balance
    else if (tempWithdraw > accountLog[currentUID][accountLog[currentUID].length - 1].balance) {
        tempWithdraw = accountLog[currentUID][accountLog[currentUID].length - 1].balance;
        alert("Can't withdraw more than current running balance");
    }
    inputWithdraw.innerText = `${tempWithdraw}`;
} // end addWithdraw

// function for confirming Withdraw & showing Confirm Page
function confirmWithdraw(input) {
    // withdraw has to be over $0
    if (input === 0) {
        alert("You have to withdraw at least $1");
        return;
    }
    // Can't withdraw more than current running balance
    else if (input > accountLog[currentUID][accountLog[currentUID].length - 1].balance) {
        alert("Can't withdraw more than current running balance");
        return;
    }
    // set fundOut & initialize Confirm Page
    tempFundOut = input;
    document.getElementById('result').innerText = '$' + input + '?';
    document.getElementById('confirmQuestion').innerText = 'Withdraw'
    // reset input
    inputWithdraw.innerText = '0';
    withdrawPage.hidden = true;
    confirmPage.hidden = false;
} // end confirmWithdraw
// end Withdraw Page ======================================

// functions for Deposit & Transfer Page ==================
//     (PageState = 1 : Deposit)
//     (PageState = 2 : Transfer)
// function for showing Deposit Page
function showDeposit() {
    pageState = 1;
    depositPage.hidden = false;
    document.getElementsByTagName('body')[0].style.backgroundColor = 'white'
} // end showDeposit

// function for clicking calculator
function clickCal(number) {
    // set current Page based on pageState
    let currentPage;
    if (pageState === 1) {
        currentPage = inputDeposit;
    } else if (pageState === 2) {
        currentPage = inputTransfer;
    } // end page set
    // for first input
    if (currentPage.innerText === '$0000.00') {
        currentPage.style.color = 'black';
        // if first input is '.' add 0 auto
        if (number === '.') {
            currentPage.innerText = '0';
        } else {
            currentPage.innerText = '';
        }
    }
    // conditions for decimal place
    else if (currentPage.innerText.indexOf('.') !== -1){
        // Only 2 decimal place can be inputted
        if (currentPage.innerText.split('.')[1].length === 2) {
            alert('Only 2 decimal place can be inputted');
            return;
        }
        // Already decimal, cannot add any more decimal point
        else if (number === '.') {
            alert('Already decimal, cannot add any more decimal point');
            return;
        }
    }
    currentPage.innerText += number;
} // end clickCal

// function for deleting calculator input
function deleteCal() {
    // set current Page based on pageState
    let currentPage;
    if (pageState === 1) {
        currentPage = inputDeposit;
    } else if (pageState === 2) {
        currentPage = inputTransfer;
    }  // end page set
    // for 1-digit, reset input
    if (currentPage.innerText.length === 1) {
        currentPage.style.color = 'grey';
        currentPage.innerText = '$0000.00'
    }
    // no input
    else if (currentPage.innerText === '$0000.00') {
        return;
    } else {
        currentPage.innerText = currentPage.innerText.substring(0, currentPage.innerText.length - 1);
    }
} // end deleteCal

// function for confirming Deposit & showing Confirm Page
function confirmDeposit(input) {
    // deposit has to be over $0
    if (input === 0.00 || isNaN(input)) {
        alert("You have to deposit at least $0.01");
        return;
    }
    // set fundOut & initialize Confirm Page
    tempFundIn = input;
    document.getElementById('result').innerText = '$' + input + '?';
    document.getElementById('confirmQuestion').innerText = 'Are you sure you want to deposit the amount specified?'
    // reset input
    inputDeposit.style.color = 'grey';
    inputDeposit.innerText = '$0000.00';
    depositPage.hidden = true;
    confirmPage.hidden = false;
} // end confirmDeposit

// function for showing Transfer Page
function showTransfer() {
    pageState = 2;
    setTransfer();
    transferPage.hidden = false;
    document.getElementsByTagName('body')[0].style.backgroundColor = 'white'
} // end showTransfer

// function for initializing Transfer Page
function setTransfer() {
    // initialize from & to UIDs
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
} // end setTransfer

// function for confirming Deposit & showing Confirm Page
function confirmTransfer(input) {
    // You have to transfer at least $0.01
    if (input === 0.00 || isNaN(input)) {
        alert("You have to transfer at least $0.01");
        return;
    }
    // You can't transfer more than running balance
    else if (input > accountLog[currentUID][accountLog[currentUID].length - 1].balance) {
        alert("You can't transfer more than running balance")
        // reset input
        inputTransfer.style.color = 'grey';
        inputTransfer.innerText = '$0000.00';
        return;
    }
    // get from & to UIDs
    let fromEl = document.getElementById('from');
    let toEl = document.getElementById('to');
    for (let i = 0; i < fromEl.children.length; i++) {
        if (fromEl.children[i].selected) {
            fromUID = fromEl.children[i].value;
            fromEl.children[i].selected = false;
        }
    }
    // no from UID
    if (fromUID === '') {
        alert("You haven't selected from account");
        return;
    }
    for (let i = 0; i < toEl.children.length; i++) {
        if (toEl.children[i].selected) {
            toUID = toEl.children[i].value;
            toEl.children[i].selected = false;
        }
    }
    // no to UID
    if (toUID === '') {
        alert("You haven't selected to account");
        return;
    }
    tempFundOut = input;
    document.getElementById('result').innerText = `$${input}\nFrom ${accountData[fromUID].num}\nTo ${accountData[toUID].num}`;
    document.getElementById('confirmQuestion').innerText = 'Transfer?'
    // reset input
    inputTransfer.style.color = 'grey';
    inputTransfer.innerText = '$0000.00';
    transferPage.hidden = true;
    confirmPage.hidden = false;
} // end confirmTransfer

// end transfer page
// functions for all other Pages

function resetOption(){
    let fromEl = document.getElementById('from');
    let toEl = document.getElementById('to');
    for(let i =1; i<fromEl.children.length; i){
        fromEl.removeChild(fromEl.children[i]);
    }
    for(let i =1; i<toEl.children.length; i){
        toEl.removeChild(toEl.children[i]);
    }
}

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
} // end backRecentPage

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
} // end taskDone

function inputMoneyDone() {
    document.getElementById('taskMessage').innerText = 'Money has been deposited';
    document.getElementById('redoTaskBtn').innerText = 'Deposit Again';
    document.getElementById('inputMoneyPage').hidden = true;
    donePage.hidden = false;
} // end inputMoneyDone

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

    if (pageState === 2) {
        runBalance = accountLog[toUID][accountLog[toUID].length - 1].balance + fundOut - fundIn;
        log.in = fundOut;
        log.out = fundIn;
        log.balance = runBalance;
        accountLog[toUID].push(log);
    }
} // end addLog


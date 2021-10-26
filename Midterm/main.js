let authPage = document.getElementById('authPage');
let welcomePage = document.getElementById('welcomePage');
let accountInfoPage = document.getElementById('accountInfoPage');
let withdrawPage = document.getElementById('withdrawPage');
let depositPage = document.getElementById('depositPage');
let transferPage = document.getElementById('transferPage');


let inputStr = document.getElementById('inputNum');
let withdrawInput = document.getElementById('withdrawInput');
let accountData = [
    {num: '0000000000000000', pin: '0000'},
    {num: '1111111111111111', pin: '0001'},
    {num: '1111111111111110', pin: '0002'}];
let accountLog = [
    [{
        time: 'Sun Oct 17 2021 16:42:21 GMT+0900 (Korean Standard Time)',
        in: 0,
        out: 0,
        balance: 1820
    }, {
        time: 'Mon Oct 18 2021 18:33:14 GMT+0900 (Korean Standard Time)',
        in: 0,
        out: 180,
        balance: 2000
    }],
    [{
        time: 'Sat Oct 16 2021 21:23:58 GMT+0900 (Korean Standard Time)',
        in: 0,
        out: 0,
        balance: 2000
    }],
    [{
        time: 'Tue Nov 21 2021 09:23:31 GMT+0900 (Korean Standard Time)',
        in: 0,
        out: 0,
        balance: 1500
    }]
]
let statePIN = false;
let currentUID = 0;
//let currentUID = -1; // uid -1 means no UID available
let count = 5;
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
            console.log(accountData[i].num + ' : ' + account);
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

function returnAuth() {
    resetInfo();
    authPage.style.display = 'flex';
    welcomePage.hidden = true;
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
        if(i%2==1){
            clone.children[0].style.backgroundColor = '#eeeeef'
        }
        clone.children[0].children[0].innerText = `${accountLog[currentUID][i].time}`;
        clone.children[0].children[1].innerText = `${accountLog[currentUID][i].in}`;
        clone.children[0].children[2].innerText = `${accountLog[currentUID][i].out}`;
        clone.children[0].children[3].innerText = `${accountLog[currentUID][i].balance}`;
        logTable.appendChild(clone);
    }
    console.log('initialize done.')
}

// functions for welcome Page & info page
function showInfo() {
    document.getElementById('currentBlc').innerText = `Current Balance:$${accountLog[currentUID][accountLog[currentUID].length - 1].balance}`;
    welcomePage.hidden = true;
    accountInfoPage.hidden = false;
}

function backWelcome(index) {
    if(index == 0){
        accountInfoPage.hidden = true;
    }
    else if(index == 1){
        withdrawPage.hidden = true;
    }
    else if(index ==2){
        depositPage.hidden = true;
    }
    else if(index ==3){
        transferPage.hidden = true;
    }
    welcomePage.hidden = false;
}
// end info page

// functions for withdraw Page
function showWithdraw() {
    welcomePage.hidden = true;
    withdrawPage.hidden = false;
}

function addWithdraw(withdraw){
    let tempWithdraw = parseInt(withdrawInput.innerText) + withdraw;
    if(tempWithdraw < 0){
        tempWithdraw =0;
    }
    else if(tempWithdraw > 300){
        tempWithdraw=300;
        alert("$300 is the limit to withdraw from the ATM");
    }
    withdrawInput.innerText = `${tempWithdraw}`;
}

function addLog(fundIn, fundOut, runBalance) {
    let temp = document.getElementById('tempLog');
    let logTable = document.getElementById('logTable');
    let clone = document.importNode(temp.content, true);

    log.time = new Date();
    log.in = fundIn;
    log.out = fundOut;
    log.balance = runBalance;
    accountLog[currentUID].push(log);

    clone.children[0].children[0].innerText = `${log.time}`;
    clone.children[0].children[1].innerText = `${log.in}`;
    clone.children[0].children[2].innerText = `${log.out}`;
    clone.children[0].children[3].innerText = `${log.balance}`;
    logTable.appendChild(clone);
}
// end withdraw page

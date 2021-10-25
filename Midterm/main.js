let inputStr = document.getElementById('inputNum');
let accountData = [{num: '0000000000000000', pin: '0000'}, {num: '1111111111111111', pin: '0001'}, {num: '1111111111111110', pin: '0002'}];
let statePIN = false;
let currentUID = -1; // uid -1 means no UID available
let count = 5;

function changeState(uid) {
    if (statePIN) {
        document.getElementById('initTitle').hidden = true;
        document.getElementById('inputInst').innerText = 'Please enter your PIN:'
        inputStr.placeholder = 'Enter PIN';
        currentUID = uid;
        console.log("Account auth successful");
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
    console.log(inputStr.value);
}

function deleteNum() {
    inputStr.value = inputStr.value.substring(0, inputStr.value.length - 1);
    console.log(inputStr.value);
}

function authAccount() {
    if (inputStr.value.length < 16) {
        alert("Account Number is less than 16 - digit.");
    } else if (inputStr.value.length > 16) {
        alert("Account Number is more than 16 - digit.");
    } else {
        let account = inputStr.value;
        // find matching user number
        for (let i = 0; i < accountData.length; i++) {
            console.log(accountData[i].num + ' : ' + account);
            if (accountData[i].num === account) {
                statePIN = true;
                changeState(i);
                account = i;
                break;
            }
        }
        if (account === inputStr.value.length) {
            alert("That account number does not exist!");
        }
    }
    inputStr.value = "";
}

function authPIN() {
    if(inputStr.value === accountData[currentUID].pin){
        // open welcome page
        window.location.href = 'welcomePage.html'
    }
    else{
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
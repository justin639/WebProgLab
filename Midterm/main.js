let inputStr = document.getElementById('inputNum');
let accountNum = [1111111111111111, 1111111111111110];
let statePIN = false;

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
        alert("Account Number is less than 16-digit.");
        inputStr.value = "";
    } else if (inputStr.value.length > 16) {
        alert("Account Number is more than 16-digit.");
        inputStr.value = "";
    } else {
        let account = parseInt(inputStr.value);
        for (let i = 0; i < accountNum.length; i++) {
            console.log(accountNum[i] + ' : '+ account);
            if (accountNum[i] === account) {
                //enter PIN submit
                statePIN =true;
                document.getElementById('initTitle').hidden = true;
                document.getElementById('inputInst').innerText='Please enter your PIN:'
                inputStr.placeholder = 'Enter PIN';
                account=i;
                console.log("Account auth successful");
                break;
            }
        }
        if(account === inputStr.value.length){
            alert("That account number does not exist!");
        }
        inputStr.value = "";
    }
}
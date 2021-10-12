let inputText = document.getElementById('userInput');
let enterButton = document.getElementById('enter');
let removeButton = document.getElementById('remove');

let ul = document.querySelector('ul');
let item =document.getElementsByTagName('li');



function createItemList(){
    if(inputText.value.length>0) {
        let newLi = document.createElement('li');
        let textnode = document.createTextNode(inputText.value);
        newLi.appendChild(textnode);


        function removeLi(){
            newLi.classList.add("delete");
        }

        let closeBtn = document.createElement('button');
        closeBtn.onclick = removeLi;
        closeBtn.appendChild(document.createTextNode('X'));
        newLi.appendChild(closeBtn);

        ul.appendChild(newLi);
        inputText.value = "";


    }
    else{
        alert("No input!");
    }


}

enterButton.addEventListener('click',createItemList);

"use strict"
var calcButtons = document.querySelectorAll(".calcButton");
var calcInputField = document.getElementById("calcInputField");
var input = [0];
var keys = [];
calcInputField.innerHTML = input[0];

for (let i = 0; i < calcButtons.length; i++) {
    keys.push(calcButtons[i].value)
}
keys.push(",");

window.addEventListener("keydown", (event) => {
    console.log(event.key);

    if (event.key == "." || event.key == ",") {
        keys.push(".");
        calcInputField.innerHTML += ".";
    }
    else if (!isNaN(event.key)) {

        if (input[0] != 0) {
            input.push(event.key);
            calcInputField.innerHTML += event.key;
        }
        else{
            input[0] = event.key;
            calcInputField.innerHTML = event.key;
        }
    }
    else if (event.key == "+" || event.key == "-" || event.key == "*" || event.key == "/") {
        keys.push(event.key);
        calcInputField.innerHTML += event.key;
    }
    else if (event.key.toLocaleLowerCase() == "c") {
        Reset();
    }
    else if (event.key == "Enter") {
        Calculate();
    }
    else if (event.key == "Delete" || event.key == "Backspace") {
        Delete();
    }
    else {
        console.log(event.key);
    }

});

window.addEventListener("keyup", () => {

});

calcButtons.forEach(item => {
    item.addEventListener('click', () => {
        var tempValue = item.value;

        if (tempValue == "=") {
            Calculate();
        }
        else if (tempValue == "C") {
            Reset();
        }
        else if(tempValue == "DEL"){
            Delete();
        }
        else {
            if (input[0] == 0) {
                input[0] = item.value;
                calcInputField.innerHTML = tempValue;
            }
            else {
                input.push(item.value);
                calcInputField.innerHTML += tempValue;
            }
            
        }
    });
});
//Beräknar arrayen
function Calculate() {
    calcInputField.innerHTML = eval(input.join(""));
    input = [calcInputField.innerHTML];
}

function Reset() {
    input = [0];
    calcInputField.innerHTML = input[0];
}

function Delete(){

    input.splice(-1);
    calcInputField.innerHTML = "";
    for (let i = 0; i < input.length; i++) {
        calcInputField.innerHTML += input[i];
    }
    if (input.length == 0) {
        input.push("0");
        calcInputField.innerHTML = 0;
    }
    
}

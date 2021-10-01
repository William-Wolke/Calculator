"use strict"
//Initierar knappar och inputfield samt input
var calcButtons = document.querySelectorAll(".calcButton");
var calcInputField = document.getElementById("calcInputField");
var input = [0];
calcInputField.innerHTML = input[0];
//Tangentbord trycks
window.addEventListener("keydown", (event) => {
    //Ändrar style
    ChangeStyle(event.key, 1);
    //Man ska kunna skriva , eller . och alltid få rätt syntax "."
    if (event.key == "." || event.key == ",") {
        input.push(".");
        calcInputField.innerHTML += ".";
    }
    //Om input är ett nummer
    else if (!isNaN(event.key)) {

        if (input[0] == 0) {
            InitNumber(event.key);
        }
        else {
            AddNumber(event.key);
        }
    }
    //Om input är en operator
    else if (event.key == "+" || event.key == "-" || event.key == "*" || event.key == "/") {
        AddNumber(event.key);
    }
    //C för clear
    else if (event.key.toLocaleLowerCase() == "c") {
        Reset();
    }
    //Enter för att beräkna
    else if (event.key == "Enter") {
        Calculate();
    }
    //Ta bort sista siffran 
    else if (event.key == "Delete" || event.key == "Backspace") {
        Delete();
    }
});
//Tangent otrycks
window.addEventListener("keyup", (event) => {
    ChangeStyle(event.key, 0);
});
//Knappar
calcButtons.forEach(item => {
    item.addEventListener('click', () => {

        if (item.value == "=") {
            Calculate();
        }
        else if (item.value == "C") {
            Reset();
        }
        else if (item.value == "DEL") {
            Delete();
        }
        else {
            if (input[0] == 0) {
                InitNumber(item.value);
            }
            else {
                AddNumber(item.value);
            }

        }
    });
});
//Beräknar arrayen
function Calculate() {


    calcInputField.innerHTML = eval(input.join(""));
    input = [calcInputField.innerHTML];

}
//Initierar en beräkning med det första talet
function InitNumber(s) {
    input[0] = s;
    calcInputField.innerHTML = s;
}

function AddNumber(s) {
    if (input.length <= 31) {
        input.push(s);
    calcInputField.innerHTML += s;
    }
}

function Reset() {
    input = [0];
    calcInputField.innerHTML = input[0];
}

function Delete() {

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

function CorrectInput(input) {

}

function ChangeStyle(input, keypress) {

    if (input == ",") {
        input = ".";
    }
    else if (input == "Enter"){
        input = "="
    }
    else if (input == "c") {
        input = "C"
    }
    else if (input == "Delete" || input == "Backspace") {
        input = "DEL";
    }

    calcButtons.forEach(item => {
        if (input == item.value) {
            if (keypress == 1) {
                item.style.backgroundColor = "lightblue";
            }
            else {
                item.style.backgroundColor = "";
            }
            
        }
    });
}

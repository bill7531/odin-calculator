let num1 = null
let num2 = null
let tempNum = ""
let result = null
let userOperation = ""
let phase = "initial"

function reset(){
    num1 = null
    num2 = null
    tempNum = ""
    result = null
    userOperation = ""
    phase = "initial"
    display.textContent = 0
    accessory.textContent = ""
}

function concateNum(num){
    if (num === "."){
        if (tempNum.includes(".")){
            return
        }
        if (tempNum === "" || tempNum === "0"){
            tempNum = "0."
            return
        }
    }
    if (tempNum === "0"){
        tempNum = num
        return
    }
    if (tempNum === "-0" && num === "0"){
        return
    }
    if (tempNum.length < 16){
        tempNum += num
    }
    else{
        tempNum = tempNum.slice(0, -1) + num
    }
}

function parseNumber(){
    return parseFloat(tempNum)
}

function add(a, b){
    return a + b
}

function minus(a, b){
    return a - b
}

function multiply(a, b){
    return a * b
}

function divide(a, b){
    if (b == 0){
        return "infinite"
    }
    return a / b
}

function power(a, b){
    return a ** b
}


function equal(operation){
    switch(operation){
        case "add":
            return add(num1, num2)
            break
        case "minus":
            return minus(num1, num2)
            break   
        case "multiply":
            return multiply(num1, num2)
            break
        case "divide":
            return divide(num1, num2)
            break
        case "power":
            return power(num1, num2)
            break
        
    }
    
}

function inputNumber(num){
    if (phase == "result"){
        phase = "initial"
        reset()
    }
    else if (phase == "second-awaiting-number"){
        phase = "second"
    }
    else if (phase == "chain-awaiting-number"){
        phase = "chain"
    }

    concateNum(num)
    accessory.textContent = ""
    display.textContent = tempNum
}

function inputOperation(button, num){
    if (phase =="second"){
        num2 = parseNumber()
        num1 = equal(userOperation)
        display.textContent = num1
        tempNum = ""
        phase = "chain-awaiting-number"  
    }   

    else if (phase == "initial"){
        if (tempNum == "")
            num1 = 0
        else
            num1 = parseNumber()
        tempNum = ""
        phase = "second-awaiting-number"
    }
    else if (phase == "result"){
        num1 = result
        phase = "chain-awaiting-number"
    }
    else if (phase == "chain"){
        num2 = parseNumber()
        num1 = equal(userOperation)
        display.textContent = num1
        tempNum = ""
        phase = "chain-awaiting-number"
    }

    userOperation = button
    accessory.textContent = num
}

function inputEqual(){
    if (phase == "second" || phase == "chain" ){
        num2 = parseNumber()
        result = equal(userOperation)
        display.textContent = result
        tempNum = ""
        phase = "result"
    } 

    else if (phase == "result"){
        num1 = result
        result = equal(userOperation)
        display.textContent = result
        tempNum = ""
        // num1 = null
        // num2 = null
    }
    else if (phase == "initial"){
        phase = "result"
        result = parseNumber() || 0
        tempNum = ""
    }

    accessory.textContent = "="
    // num1 = null
    // num2 = null
    
}

function inputSign(){
    if (phase == "result"){
        result = -result
        display.textContent = result
    }
    else{
        if (tempNum.at(0) == "-"){
            tempNum = tempNum.slice(1)
        }
        else
            tempNum = "-" + tempNum
        display.textContent = tempNum
    }
}

function inputBackspace(){
    if (phase == "result"){
        console.log(result)
        if (String(result).length <= 1){
            result = 0
            display.textContent= 0
                    
    }
        else{
            result = parseFloat(String(result).slice(0, -1))
            display.textContent = result

        }
            
    }
    else{
        if (tempNum.length <= 1){
            tempNum = ""
            display.textContent = 0
        }
            
        else{
            tempNum = tempNum.slice(0, -1)
            display.textContent = tempNum
        }
            
    }
}

function parseScreenInput(e){
    const button = e.target.id
    const group = e.target.className
    const num = e.target.textContent
    callInputMethod(button, group, num)
}

function parseKeyboardInput(e){
    const key = e.key
    let validKey = false
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]
    const operators = ["^", "+", "-", "*", "/"]
    const operatorNames = ["power", "add", "minus", "multiply", "divide"]
    const utilities = ["Backspace", "Enter", "=", "+/-", "Escape"]
    const utilityNames = ["backspace", "equal", "equal", "sign", "clear"]
    if (numbers.includes(key)){
        callInputMethod("", "number", key)
    }
    else if (operators.includes(key)){     
        callInputMethod(operatorNames[operators.indexOf(key)], "operate", key)
    }
    else if (utilities.includes(key)){
        callInputMethod(utilityNames[utilities.indexOf(key)], "utility", key)
    }
}

function callInputMethod(button, group, num){
    
    
    switch (group){
        case "number":
            inputNumber(num)
            break            
        case "operate":
            inputOperation(button, num)           
            break
        case "utility":
            switch (button){
                case "clear":
                    reset()
                    break
                case "equal":
                    inputEqual()
                    break
                case "sign":
                    inputSign()
                    break
                case "backspace":
                    inputBackspace()
                    break
            }
        default:
            break
            
    }

}
const display = document.querySelector("div#display")
const control = document.getElementById("control")
const accessory = document.getElementById("accessory")
control.addEventListener("click", parseScreenInput)
document.addEventListener("keydown", (e)=>{
    if (e.key == "Enter"){
        e.preventDefault()
    }
    parseKeyboardInput(e)
})
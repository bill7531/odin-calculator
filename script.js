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
}

function concateNum(num){
    if (num === "."){
        if (tempNum.includes(".")){
            return
        }
        if (tempNum === ""){
            tempNum = "0."
            return
        }
    }
    if (tempNum === "0"){
        tempNum = num
        return
    }
    tempNum += num
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
            result = add(num1, num2)
            break
        case "minus":
            result = minus(num1, num2)
            break   
        case "multiply":
            result = multiply(num1, num2)
            break
        case "divide":
            result = divide(num1, num2)
            break
        case "power":
            result = power(num1, num2)
            break
    }
    return result
}

const display = document.querySelector("div#display")
const control = document.getElementById("control")
control.addEventListener("click", (e)=>{
    const button = e.target.id
    const group = e.target.className
    const num = e.target.textContent
    
    switch (group){
        case "number":
                concateNum(num)
                
                display.textContent = tempNum
                phase = "number"
                break            
        case "operate":
                
                display.textContent = "0"
                
                if (result !== null)
                    num1 = result
                //chaining
                else if (num1 !== null){
                    num2 = parseNumber()
                    tempNum = ""
                    num1 = equal(userOperation)
                    display.textContent = num1
                    num2 = null
                    result = null
                }
                else
                    num1 = parseNumber()
                
                userOperation = button
                tempNum = ""
                break
        case "utility":
            switch (button){
                case "clear":
                    reset()
                    break
                case "equal":
                    num2 = parseNumber()    
                    
                    if ((!isNaN(num1)) && (!isNaN(num2))){    
                        result = equal(userOperation)
                        display.textContent = result
                        num1 = null
                        num2 = null
                        tempNum = ""
                    }
   
            }
            
    }
        
        


})
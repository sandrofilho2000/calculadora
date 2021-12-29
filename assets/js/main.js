function typingNumbers(e, keyboard = false){

    if(keyboard == false){
        var numeric = e.currentTarget.querySelector("span").innerHTML.trim()
    }else{
        var numeric = e
    }
    if(document.querySelector('.calc span.number').innerHTML.replace(/[^A-Z]/gi, "").length){
        document.querySelector('.calc span.number').innerHTML = ''
        document.querySelector('.result span').innerHTML = ''
    }
    if(document.querySelector('.calc span.operator').innerHTML.trim() == ''){
        
        if(document.querySelector('.calc span.number').innerHTML.trim() == '0'){
            document.querySelector('.calc span.number').innerHTML = numeric
        }else{
            document.querySelector('.calc span.number').innerHTML += numeric
        }
    }else{
        
        document.querySelector('.result span').innerHTML += numeric
    }
}

function selectOperator(e, keyboard=false){
    
    if(keyboard==false){
        var operator = e.currentTarget.innerText
    }else{
        var operator = e
    }
    
    if(document.querySelector('.calc span.number').innerHTML.trim() != ''){
        if(operator == '+' || operator == '-' || operator == '*' || operator == '×' || operator == '÷' || operator == '/'){
            if(operator == '*'){
                operator = "×"
            }
            if(operator == '/'){
                operator = "÷"
            }
            
            document.querySelector('.calc span.operator').innerHTML = operator
        }else if(operator == "Backspace"){
            deletingNumbers(operator)
            
        }else if(operator == "Enter" || operator == "="){
            getResult(e)
        }else if(operator == "c"){
            clearCalculator(e)
        }
        
    }

}

function getResult(e){
    switch (document.querySelector('.calc span.operator').innerHTML.trim()){
        case '+':
            var num1 = Number(document.querySelector('.calc .number').innerText.trim())
            var num2 = Number(document.querySelector('.result span').innerHTML.trim())
            document.querySelector('.calc span.number').innerHTML = num1 + num2
            document.querySelector('.calc span.operator').innerHTML = ''
            document.querySelector('.result span').innerHTML = ''
            break
        case '-':
            var num1 = Number(document.querySelector('.calc .number').innerText.trim())
            var num2 = Number(document.querySelector('.result span').innerHTML.trim())
            document.querySelector('.calc span.number').innerHTML = num1 - num2
            document.querySelector('.calc span.operator').innerHTML = ''
            document.querySelector('.result span').innerHTML = ''
            break
        case '×':
            var num1 = Number(document.querySelector('.calc .number').innerText.trim())
            var num2 = Number(document.querySelector('.result span').innerHTML.trim())
            document.querySelector('.calc span.number').innerHTML = num1 * num2
            document.querySelector('.calc span.operator').innerHTML = ''
            document.querySelector('.result span').innerHTML = ''
            break
        case '÷':
            if(document.querySelector('.result span').innerHTML.trim() == '0' || document.querySelector('.calc .number').innerText.trim() == '0'){
                document.querySelector('.calc .number').innerHTML = "Não é possível realizar a divisão por zero"
                document.querySelector('.calc span.operator').innerHTML = ''
            }else if(document.querySelector('.result span').innerHTML.trim() != ''){ 
                var num1 = Number(document.querySelector('.calc .number').innerText.trim())
                var num2 = Number(document.querySelector('.result span').innerHTML.trim())
                document.querySelector('.calc span.number').innerHTML = num1 / num2
                document.querySelector('.calc span.operator').innerHTML = ''
                document.querySelector('.result span').innerHTML = ''
                break
            }
            
    }
}

function deletingNumbers(e){
    if(document.querySelector('.calc span.operator').innerHTML.trim() != ''){
        document.querySelector('.calc span.operator').innerHTML = ''
        document.querySelector('.result span').innerHTML = ''
    }else{
        if(document.querySelector('.calc span.number').innerHTML.length != 1){
            document.querySelector('.calc span.number').innerHTML = document.querySelector('.calc span.number').innerHTML.slice(0, -1)
        }else{
            document.querySelector('.calc span.number').innerHTML = 0
        }
    }
}

function clearCalculator(e){
    document.querySelector('.calc span.number').innerHTML = 0
    document.querySelector('.calc span.operator').innerHTML = ''
    document.querySelector('.result span').innerHTML = ''
}

//INSERTING NUMBERS
document.querySelectorAll('.numBtn:not(.op)').forEach((num)=>{
    num.addEventListener('click', (e)=>{
        typingNumbers(e)
    })  
})

//SELECTING OPERATORS
document.querySelectorAll('.opBtn:not(.clear, .delete, .negative, .sqroot)').forEach((num)=>{
    num.addEventListener('click', (e)=>{
        selectOperator(e)
    })  
})

//GETTING RESULTS
document.querySelector(".equalsBtn").addEventListener('click', (e)=>{
    getResult(e)
})

//CLEANING THE CALCULATOR
document.querySelector('.clear').addEventListener('click', (e)=>{
    clearCalculator(e)
})

//DELETING CHARACTERS
document.querySelector('.delete').addEventListener('click', (e)=>{
    deletingNumbers(e)
})

//REPLACING THE NUMBER SIGN
document.querySelector('.negative').addEventListener('click', (e)=>{
    if(document.querySelector('.calc span.operator').innerHTML.trim() != ''){
        document.querySelector('.result span').innerHTML = Number(document.querySelector('.result span').innerHTML.trim() * (-1))
    }else{
        document.querySelector('.calc span.number').innerHTML = Number(document.querySelector('.calc span.number').innerHTML.trim() * (-1))
    }
})

//GET SQUARE ROOT
document.querySelector('.sqroot').addEventListener('click', (e)=>{
    document.querySelector('.calc span.number').innerHTML = `√(${document.querySelector('.calc span.number').innerHTML})`
    var number = document.querySelector('.calc span.number').innerHTML.replaceAll('(', '')
    number = number.replaceAll(')', '')
    number = number.replaceAll('√', '')
    console.log(number)
    document.querySelector('.result span').innerHTML =  Math.sqrt(Number(number)); 
})


window.addEventListener('keyup', (e)=>{
    var key = e.key
    var keyboard = true
    if(isNaN(Number(key))){
        selectOperator(key, keyboard)
    }else{
        typingNumbers(key, keyboard)
    }
})
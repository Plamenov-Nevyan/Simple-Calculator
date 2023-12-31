
let numberBtns = document.getElementsByClassName('number-btn')
let operatorBtns = document.getElementsByClassName('operator-btn')
let floatBtn = document.getElementById('float')
let equalsBtn = document.getElementById('equals')
let numberBtnsArr = [...numberBtns]
let operatorBtnsArr = [...operatorBtns]
let operationsInput = document.getElementById('operation')
let errorMessage = document.querySelector('.error-message')
numberBtnsArr.forEach(btn => btn.addEventListener('click', (event) => addNumberToOperation(event)))
operatorBtnsArr.forEach(btn => btn.addEventListener('click', (event) => addOperator(event)))
floatBtn.addEventListener('click', (event) => addFloat(event))
equalsBtn.addEventListener('click', () => calculate())

function addNumberToOperation(event){
    errorMessage.textContent = ''
    errorMessage.style.display = 'none'
    if(operationsInput.value !== ''){
        operationsInput.value = operationsInput.value += event.target.id
    }else {
        operationsInput.value = event.target.id
    }
}

function addOperator(event){
 if(operationsInput.value === ''){
    errorMessage.textContent = 'Please enter a number before selecting operator.'
    errorMessage.style.display = 'block'
 }else{
    switch(event.target.id){
        case 'divide': operationsInput.value += ' / '; break
        case 'multiply': operationsInput.value += ' * '; break
        case 'substract': operationsInput.value += ' - '; break
        case 'add': operationsInput.value += ' + '; break
        case 'modular': operationsInput.value += ' % '; break
    }
 }
}

function addFloat(event){
    let currentOperation = operationsInput.value.trim()
    if(currentOperation ===  ''){
        errorMessage.textContent = 'Please enter a integer before transforming it into float number.'
        errorMessage.style.display = 'block'
        return
    }
    if(currentOperation.includes('/')){
        if(currentOperation.substring(currentOperation.indexOf('/') + 1) === ''){
            errorMessage.textContent = 'Please enter a integer as second number before transforming it into float number.'
            errorMessage.style.display = 'block'
            return
        }
    }else if(currentOperation.includes('*')){
        if(currentOperation.substring(currentOperation.indexOf('*') + 1) === ''){
            errorMessage.textContent = 'Please enter a integer as second number before transforming it into float number.'
            errorMessage.style.display = 'block'
            return
        }
    }else if(currentOperation.includes('-')){
        if(currentOperation.substring(currentOperation.indexOf('-') + 1) === ''){
            errorMessage.textContent = 'Please enter a integer as second number before transforming it into float number.'
            errorMessage.style.display = 'block'
            return
        }
    }else if(currentOperation.includes('+')){
        if(currentOperation.substring(currentOperation.indexOf('+') + 1) === ''){
            errorMessage.textContent = 'Please enter a integer as second number before transforming it into float number.'
            errorMessage.style.display = 'block'
            return
        }
    }else if(currentOperation.includes('%')){
        if(currentOperation.substring(currentOperation.indexOf('%') + 1) === ''){
            errorMessage.textContent = 'Please enter a integer as second number before transforming it into float number.'
            errorMessage.style.display = 'block'
            return
        }
    }

    operationsInput.value += '.'
}

async function calculate(){
    let operation = operationsInput.value.trim()
    let operationArr = operation.split(' ')
    operationArr.forEach((char, index) => {
        if(char.includes('.') && char.substring(char.indexOf('.') + 1) === ''){
            if(
                operationArr[index + 1] === '' ||
                operationArr[index + 1] === undefined ||
                operatorBtnsArr.some(btn => btn.textContent === operationArr[index + 1])
                ){
                errorMessage.textContent = 'Please finish entering your float number before calculation.'
                errorMessage.style.display = 'block' 
                return
            }
        }
    })    
  try {
    let response = await fetch('../backend/backend.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({num1 : operationArr[0], operator: operationArr[1], num2: operationArr[2]})
    })
    if(response.ok){
        console.log(response)
    }else{
        errorMessage.textContent = 'Error, couldn\'t send your operation to the backend, please try again.'
        errorMessage.style.display = 'block' 
    }
  }catch(err){
    errorMessage.textContent = `An error occured: ${err}`
    errorMessage.style.display = 'block' 
  }
}
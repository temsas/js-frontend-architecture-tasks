// BEGIN
const Calculated = () =>{
    let sum = 0
    let formCalculator = document.querySelector('.form-inline')
    let numberInput = formCalculator.querySelector('input[name="number"]')
    let reset = formCalculator.querySelector('button[type="button"]')
    let output = document.getElementById('result')

    const updateOutput = () =>{
        output.textContent = sum;
    }
    const funcReset = () =>{
        sum = 0
        updateOutput();
        formCalculator.reset()
        numberInput.focus()
    }
    const plusPlus = (event) =>{
        event.preventDefault()
        const inputValue = parseInt(numberInput.value)
        if(!isNaN(inputValue)) {
            sum += inputValue
            updateOutput()
        }
        formCalculator.reset()
        numberInput.focus()
    }
    formCalculator.addEventListener('submit', plusPlus)
    reset.addEventListener('click', funcReset)
    funcReset()

}
export default Calculated;
// END
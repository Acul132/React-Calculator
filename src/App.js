import './App.css';
import React, {useState} from 'react';
import {getButtonType, hasDecimal} from './SpecialFunctions'

function App() {
  return (
    <div className="App">
      <Calculator/>
    </div>
  );
}

function Calculator() {
  const [outputValue, setOutputValue] = useState("0")
  const [currentValue, setCurrentValue] = useState("0")
  const [prevOperator, setPrevOperator] = useState()
  const [shouldResetOutput, setShouldResetOutput] = useState(false)
  const [outputValueHasDecimal, setOutputValueHasDecimal] = useState(false)
  const [currentValueHasDecimal, setCurrentValueHasDecimal] = useState(false)
  const buttonOptions = ["C", "±", "%", "÷", "7", "8", "9", "x", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="]

  const buttonClicked = (value) => {
    const buttonType = getButtonType(value)

    switch(buttonType){
      case "special":
        handleSpecialButtonClick(value)
        break
      case "operand":
        handleOperandButtonClick(value)
        break
      case "number":
        handleNumberButtonClick(value)
        break
      default:
        console.log("Invalid button type.")
        break
    }
  }

  const handleSpecialButtonClick = value => {
    const numericValue = outputValueHasDecimal ? parseFloat(outputValue) : parseInt(outputValue)

    switch(value){
      case "C":
        setCurrentValue(0)
        setOutputValue("0")
        setOutputValueHasDecimal(false)
        setCurrentValueHasDecimal(false)
        break
      case "±":
        setOutputValue(numericValue*-1+"")
        break
      case "%":
        const result = numericValue*0.01
        setOutputValue(result+"")
        if(result < 1 && result > 0)
          setOutputValueHasDecimal(true)
        break
      default:
        console.log("Invalid special button character.")
        break
    }
  }

  const handleOperandButtonClick = currentOperator => {
    if(!prevOperator && currentOperator !== "="){
      setPrevOperator(currentOperator)
      setShouldResetOutput(true)
      return
    } else if (prevOperator){
      executeOperation(prevOperator)
      if(currentOperator === "=")
        setPrevOperator()
      else{
        setPrevOperator(currentOperator)
        setShouldResetOutput(true)
      }
    }
  }

  const executeOperation = (prevOperator) => {
    const currentNumericValue = currentValueHasDecimal ? parseFloat(currentValue) : parseInt(currentValue)
    const outputNumericValue = outputValueHasDecimal ? parseFloat(outputValue) : parseInt(outputValue)
    let result = 0;

    switch(prevOperator){
      case "÷":
        result = currentNumericValue/outputNumericValue
        break
      case "x":
        result = currentNumericValue*outputNumericValue
        break
      case "+":
        result = currentNumericValue+outputNumericValue
        break
      case "-":
        result = currentNumericValue-outputNumericValue
        break
      default:
        result = 0
        break
    }

    setOutputValue(result+"")
    if(hasDecimal(result))
      setOutputValueHasDecimal(true)
  }

  const handleNumberButtonClick = value => {
    if(shouldResetOutput){
      if(outputValueHasDecimal)
        setCurrentValueHasDecimal(true)
      setCurrentValue(outputValue)
      setOutputValue(value)
      setShouldResetOutput(false)
      return
    }

    if(value === "."){
      if(!outputValueHasDecimal){
        setOutputValue(outputValue + value)
        setOutputValueHasDecimal(true)
      }
      return
    }

    if(outputValue === "0")
      setOutputValue(value)
    else 
      setOutputValue(outputValue+value)
  }

  return (
    <div className="calculator-grid">
      <div className="calculator-output">{outputValue}</div>
      {buttonOptions.map(value => <CalculatorButton key={value} value={value} handleOnClick={buttonClicked}/>)}
    </div>
  )
}

function CalculatorButton({value, handleOnClick}) {
  function getButtonClass(value){
    let classString = getButtonType(value)

    if(value === "0")
      classString += " span-two"
      
    return classString
  }

  return <button className={"calculator-button calculator-button-"+getButtonClass(value)} onClick={() => handleOnClick(value)}>{value}</button>
}

export default App;

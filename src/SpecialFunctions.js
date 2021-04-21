export const isSpecialButton = (value) => {
    return ["C","±","%"].includes(value)
  }
  
export const isOperandButton = (value) => {
    return ["÷", "x", "-", "+", "="].includes(value)
}

export const isNumberButton = (value) => {
    return ["1","2","3","4","5","6","7","8","9","0","."].includes(value)
}

export const getButtonType = (value) => {
    if(isSpecialButton(value))
        return "special"
        else if (isOperandButton(value))
        return "operand"
        else
        return "number"
    }

export const hasDecimal = (value) => {
    return value % 1 !== 0
}
import calculatorButtons from "../globals/calculator-button-data"


function CalcButtons({display, setDisplay, result, setResult, operator, setOperator}) { 
  const handleNumber = (button) => {
    if (display === "0") {
      setDisplay("" + button.value)
    } else {
      setDisplay(display + button.value)
    }
  }

  const clearDisplay = () => {
    setDisplay("")
  }

  const clearResult = () => {
    setResult()
  }

  const clearOperator = () => {
    setOperator("")
  }
  
  const handleClear = (button) => {
    clearDisplay()

    if (button.value === "All Clear") {
      clearResult()
      clearOperator()
    }
  }

  const handleOperator = (button) => {
    let calculation;

    // Only do stuff if there is a display value
    if (display) {
      // If there is no existing result, set it to display 
      if (!result) {
        setResult(display);
      } else {
        // If there is an existing operator, use it to apply the current display value to the stored result
        if (operator) {
          switch (operator) {
            case "+": // Add
              calculation = parseFloat(result) + parseFloat(display)
              setResult(calculation)
              break;
      
            case "-": // Subtract
              calculation = parseFloat(result) - parseFloat(display);
              setResult(calculation)
              break;
        
            case "\u00f7": // Divide
              calculation = parseFloat(result) / parseFloat(display)
              setResult(calculation)
              break;
      
            case "\u00d7": // Multiply
              calculation = parseFloat(result) * parseFloat(display)
              setResult(calculation)
              break;
                    
            default:
              break;
          }
        }
      }
    }
    clearDisplay();
    setOperator(button.text);
  }

  const handleEqual = (button) => {
    setDisplay(result);
    clearResult();
    clearOperator();
  }

  const handleButtonClick = (button) => {
    switch (button.type) {
      case "number":
        handleNumber(button);
        break;
    
      case "clear":
        handleClear(button);
        break;
  
      case "operator":
        handleOperator(button);
        break;
  
      case "enter":
        handleEqual(button);
        break;
          
      default:
        break;
    }
  }

  const createButton = (button, index) => {
    const style = {
      gridArea: button.className
    }
  
    return (
      <button 
        className={`${button.type} ${button.className}`} 
        key={index}
        style={style}
        onClick={() => {handleButtonClick(button)}}
      >
          {button.text}
      </button>
    )
  }
  
  return (
    <div className="calc-buttons">
      {calculatorButtons.map(createButton)}
    </div>
  );
  
}

export default CalcButtons;

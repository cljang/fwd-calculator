import calculatorButtons from "../globals/calculator-button-data"


function CalcButtons({display, setDisplay, result, setResult, operator, setOperator, clearDisplay, clearResult, clearOperator, wasEvaluated, setWasEvaluated}) { 
  // Function to handle number button clicks
  const handleNumber = (button) => {
    // If the final answer was previously evaluated, any new number inputs will overwrite the display
    if (wasEvaluated) {
      setDisplay("" + button.value)
      setWasEvaluated(false);
    } 
    // Else if the display is 0, any new number input will replace the display (this prevents leading 0's)
    else if (display === "0") {
      setDisplay("" + button.value)
    } 
    // Else keep appending new number inputs onto the end of the display value number string
    else {
      setDisplay(display + button.value)
    }
  }
  
  // Function to handle clear and all clear button clicks
  const handleClear = (button) => {
    clearDisplay()

    if (button.value === "All Clear") {
      clearResult()
      clearOperator()
    }
  }

  // Calculation returns the resulting value when using the current operator on the previous result value and the current display value
  // If no calculation was done, returns null
  const calculate = () => {
    let calculation = null;
    // If there is an existing operator, use it to apply the current display value to the stored result
    // If there is no result or display value, replace it with 0 or 1 (for multiply/divide)
    if (operator) {
      switch (operator) {
        case "+": // Add
          calculation = (result ? parseFloat(result) : 0) + (display ? parseFloat(display) : 0)
          break;
  
        case "-": // Subtract
          calculation = (result ? parseFloat(result) : 0) - (display ? parseFloat(display) : 0)
          break;
    
        case "\u00f7": // Divide
          calculation = (result ? parseFloat(result) : 1) / (display ? parseFloat(display) : 1)
          break;
  
        case "\u00d7": // Multiply
          calculation = (result ? parseFloat(result) : 1) * (display ? parseFloat(display) : 1)
          break;
  
        // case "%": // Percent
        //   calculation = (display ? parseFloat(display) : 0) * 100
        //   break;

        // case "\u221a": // Square root
        //   calculation = Math.sqrt(display ? parseFloat(display) : 0)
        //   break;
                
        default:
          break;
      }
    }
    
    return calculation;
  } 

  // Handle selection of mathematical operators
  const handleOperator = (button) => {
    // Only change the result if there is a display value
    if (display) {
      // If there is no existing result, set it to display 
      if (!result) {
        setResult(display);
      } else {
        let calculation = calculate();
        if (calculation !== null) {
          setResult(calculation)
        }
      }
    }
    // If there is an existing result value or a display value that will update the result value, Clear existing display and change to new operator
    if (display || result) {
      clearDisplay();
      setOperator(button.text);
    }
  }

  // Handle Equal button clicks
  const handleEqual = () => {
    // Perform any outstanding calculations and update the display
    let calculation = calculate()
    if (calculation !== null) {
      setDisplay("" + calculation);
      clearResult();
      clearOperator();
      setWasEvaluated(true);
    }
  }

  // Function to handle sign button clicks
  const handleSign = () => {
    // If the first character is a negative-sign (-) then remove it from the display
    // Else add a negative-sign to the display
    if (display.slice(0,1) === "-") {
      setDisplay(display.slice(1));
    } else {
      setDisplay("-" + display);
    }
  }

  // Function to handle decimal button clicks
  const handleDecimal = (button) => {
    // If the final answer was previously evaluated, any new number inputs will overwrite the display
    if (wasEvaluated) {
      setDisplay("" + button.value);
      setWasEvaluated(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + button.value);
    }
  }

  // Function to handle square root
  const handleSquareRoot = (button) => {
    // Only change the result if there is a display value
    if (display) {
      let calculation = Math.sqrt(display ? parseFloat(display) : 0);
      setResult(display);
      setDisplay("" + calculation);
      setOperator(button.text);
      setWasEvaluated(true);
    }
  }

  // Function to handle percent
  const handlePercent = (button) => {
    // Only change the result if there is a display value
    if (display) {
      let calculation = (display ? parseFloat(display) : 0) / 100;
      setResult(display);
      setDisplay("" + calculation);
      setOperator(button.text);
      setWasEvaluated(true);
    }
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
        handleEqual();
        break;
  
      case "sign":
        handleSign();
        break;
  
      case "decimal":
        handleDecimal(button);
        break;

      case "square-root":
        handleSquareRoot(button);
        break

      case "percent":
        handlePercent(button);
        break
          
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

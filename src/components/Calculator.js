import CalcDisplay from "./CalcDisplay";
import CalcButtons from "./CalcButtons";
import { useState } from "react";

function Calculator() {
  // Current Display
  const [display, setDisplay] = useState("");
  // Stored Result
  const [result, setResult] = useState();
  // Selected Operation
  const [operator, setOperator] = useState("");
  // Selected Operation
  const [wasEvaluated, setWasEvaluated] = useState(false);

  // Reset functions for states
  const clearDisplay = () => {
    setDisplay("")
  }

  const clearResult = () => {
    setResult()
  }

  const clearOperator = () => {
    setOperator("")
  }

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

  // Function to format the calculation values to scientific notation if they are too long
  const formatCalculation = (calculation) => {
    // Format output precision 
    const maxStringLength = 13;
    const decimalPrecision = 12;
    const exponentPrecision = 7
    // Get length of calculation as a string to get the length of the input
    let calculationStringLength = ("" + calculation).length;
    // If the calculation string is too large to display, then we need to adjust the calculation precision
    if (calculationStringLength > maxStringLength) {
      // Get base 10 exponent of calculation
      const base10Exp = Math.log(Math.abs(calculation)) / Math.log(10);
      // If the base 10 exponenent (sci. notation exponent is larger than allowed, or negative, use the smaller exponentPrecision
      // Else use the larger decimal precision
      if ((base10Exp > decimalPrecision) || (base10Exp < 0)) {
        calculation = Number(calculation.toExponential());
        calculation = calculation.toPrecision(exponentPrecision);
      } else {
        calculation = calculation.toPrecision(decimalPrecision);
      }
    }
    return calculation
  }

  // Calculation returns the resulting value when using the current operator on the previous result value and the current display value
  // If no calculation was done, returns null
  const calculate = (operator) => {
    let calculation = null;
    // If there is an existing operator, use it to apply the current display value to the stored result
    // If there is no result or display value, replace it with 0 or 1 (for multiply/divide)
    if (operator) {
      // Perform Calculation
      switch (operator) {
        case "+": // Add
          calculation = (result ? Number(result) : 0) + (display ? Number(display) : 0)
          break;
  
        case "-": // Subtract
          calculation = (result ? Number(result) : 0) - (display ? Number(display) : 0)
          break;
    
        case "\u00f7": // Divide
          calculation = (result ? Number(result) : 1) / (display ? Number(display) : 1)
          break;
  
        case "\u00d7": // Multiply
          calculation = (result ? Number(result) : 1) * (display ? Number(display) : 1)
          break;
  
        case "%": // Percent
          calculation = (display ? Number(display) : 0) / 100
          break;

        case "\u221a": // Square root
          calculation = Math.sqrt(display ? Number(display) : 0)
          break;

          
        case "+/-": // Sign
          calculation = (display ? -Number(display) : 0)
          break;
                
        default:
          break;
      }
      calculation = formatCalculation(calculation);
    }
    
    return calculation;
  } 

  // Handle selection of general mathematical operators
  const handleOperator = (button) => {
    // Only change the result if there is a display value
    if (display) {
      // If there is no existing result, set it to display 
      if (!result) {
        setResult(display);
      } else {
        // Perform a calculation with the currently selected operator
        let calculation = calculate(operator);
        // If a valid calculation was performed, then return the 
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
    let calculation = calculate(operator)
    if (calculation !== null) {
      setDisplay("" + calculation);
      clearResult();
      clearOperator();
      setWasEvaluated(true);
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

  // Function to handle unary operators
  // Unary operators are operations that require a single input (e.g square-root, percent)
  const handleUnaryOperator = (button) => {
    // Only change the result if there is a display value
    if (display) {
      let calculation = calculate(button.text);
      // setResult(display);
      setDisplay("" + calculation);
      // setOperator(button.text);
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
  
      case "decimal":
        handleDecimal(button);
        break;

      case "unary-operator":
        handleUnaryOperator(button);
        break
          
      default:
        break;
    }
  }

  return (
    <div className="calculator">
      <CalcDisplay 
        display={display}
        result={result}
        operator={operator}
      />
      <CalcButtons 
        handleButtonClick={handleButtonClick}
      />
    </div>
  );
  
}

export default Calculator;

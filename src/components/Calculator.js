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

  const clearDisplay = () => {
    setDisplay("")
  }

  const clearResult = () => {
    setResult()
  }

  const clearOperator = () => {
    setOperator("")
  }

  return (
    <div className="calculator">
      <CalcDisplay 
        display={display}
        result={result}
        operator={operator}
      />
      <CalcButtons 
        display={display} 
        setDisplay={setDisplay}
        result={result}
        setResult={setResult}
        operator={operator}
        setOperator={setOperator}
        wasEvaluated={wasEvaluated}
        setWasEvaluated={setWasEvaluated}
        clearDisplay={clearDisplay}
        clearResult={clearResult}
        clearOperator={clearOperator}
      />
    </div>
  );
  
}

export default Calculator;

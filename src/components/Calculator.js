import CalcDisplay from "./CalcDisplay";
import CalcButtons from "./CalcButtons";
import { useState } from "react";

function Calculator() {
  const [result, setResult] = useState(0);
  const [display, setDisplay] = useState("");

  return (
    <div className="calculator">
      <CalcDisplay 
        display={display}
      />
      <CalcButtons 
        display={display} 
        setDisplay={setDisplay}
        result={result}
        setResult={setResult}
      />
    </div>
  );
  
}

export default Calculator;

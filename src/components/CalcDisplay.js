function CalcDisplay({display, result, operator, memory}) {


  return (
    <div className="calc-display">
      <p className="small-display calculation-history">{result} {operator}</p>
      <p className="small-display memory">{memory ? "Memory: " + memory : ""}</p>
      <p className="display-value">{display}</p>
    </div>
  );
  
}

export default CalcDisplay;

function CalcDisplay({display, result, operator}) {


  return (
    <div className="calc-display">
      <p className="calculation-history">{result} {operator}</p>
      <p className="display-value">{display}</p>
    </div>
  );
  
}

export default CalcDisplay;

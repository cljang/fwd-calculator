function CalcDisplay({display, result, operator}) {


  return (
    <div className="calc-display">
      <p className="calculation-history">{result} {operator}</p>
      <input type="text" readOnly className="display-value" value={display}/>
    </div>
  );
  
}

export default CalcDisplay;

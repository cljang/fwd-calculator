function CalcDisplay({display, result, operator}) {


  return (
    <div className="calc-display">
      <p className="history">{result} {operator}</p>
      <input type="number" readOnly  value={display}/>
    </div>
  );
  
}

export default CalcDisplay;

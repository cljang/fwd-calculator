function CalcDisplay({display}) {


  return (
    <div className="calc-display">
      <input type="text" readOnly  value={display}/>
    </div>
  );
  
}

export default CalcDisplay;

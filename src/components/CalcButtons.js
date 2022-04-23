import calculatorButtons from "../globals/calculator-button-data"


function CalcButtons({handleButtonClick}) { 

  const createButton = (button, index) => {
    const style = {
      gridArea: button.className
    };
  
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

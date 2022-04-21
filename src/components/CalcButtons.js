import calculatorButtons from "../globals/calculator-button-data"


function CalcButtons({display, setDisplay, result, setResult}) { 

  const handleButtonClick = (button) => {
    if (button.type === "number") {
      setDisplay(display + button.value)
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

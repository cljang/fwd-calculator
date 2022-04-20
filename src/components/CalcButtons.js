import calculatorButtons from "../globals/calculator-button-data"

const createButton = (button, index) => {
  const style = {
    gridArea: button.className
  }

  return (
    <button 
      className={`${button.type} ${button.className}`} 
      key={index}
      style={style}
    >
        {button.text}
    </button>
  )
}

function CalcButtons() {
  return (
    <div className="button-controls">
      {calculatorButtons.map(createButton)}
    </div>
  );
  
}

export default CalcButtons;

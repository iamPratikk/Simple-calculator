import {useState} from 'react'
import "./App.css";

function App() {
  //i have made 4 states that will take different digit and operator values
  //waitingForNewValue helps in chaining the calculations
  const [display, setDisplay] = useState("");
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  //This function takes care of the numbers that user clicks and saves it in the display state
  const handleDigitClick = (digit) => {
    if (waitingForNewValue) {
      setDisplay(digit);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display + digit);
    }
  };

  //This takes in the operator that is clicked and puts the current digit in prevDigit state, also toggles the waitForNextValue 
  const handleOperatorClick = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (prevValue == null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const result = performCalculation(prevValue, inputValue, operator);
      setDisplay(result.toString());
      setPrevValue(result);
    }

    setOperator(nextOperator);
    setWaitingForNewValue(true);
  };

  //This function uses the switch case to perform calculations
  const performCalculation = (prev, current, operator) => {
    switch (operator) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "*":
        return prev * current;
      case "/":
        return prev / current;
      default:
        return current;
    }
  };

  //clears all the states to start from scratch
  const handleClear = () => {
    setDisplay("");
    setPrevValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  //peforms calculation on the digits and clears them to start again
  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (prevValue != null && operator) {
      const result = performCalculation(prevValue, inputValue, operator);
      setDisplay(result.toString());
      setPrevValue(null);
      setOperator(null);
      setWaitingForNewValue(false);
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display || "0"}</div>
      <div className="buttons">
        <button className="btn clear" onClick={handleClear}>
          C
        </button>
        <button
          className="btn operator"
          onClick={() => handleOperatorClick("/")}
        >
          /
        </button>
        <button
          className="btn operator"
          onClick={() => handleOperatorClick("*")}
        >
          *
        </button>
        <button
          className="btn operator"
          onClick={() => handleOperatorClick("-")}
        >
          -
        </button>
        <button className="btn digit" onClick={() => handleDigitClick("7")}>
          7
        </button>
        <button className="btn digit" onClick={() => handleDigitClick("8")}>
          8
        </button>
        <button className="btn digit" onClick={() => handleDigitClick("9")}>
          9
        </button>
        <button
          className="btn operator"
          onClick={() => handleOperatorClick("+")}
        >
          +
        </button>
        <button className="btn digit" onClick={() => handleDigitClick("4")}>
          4
        </button>
        <button className="btn digit" onClick={() => handleDigitClick("5")}>
          5
        </button>
        <button className="btn digit" onClick={() => handleDigitClick("6")}>
          6
        </button>
        <button className="btn digit" onClick={() => handleDigitClick("1")}>
          1
        </button>
        <button className="btn digit" onClick={() => handleDigitClick("2")}>
          2
        </button>
        <button className="btn digit" onClick={() => handleDigitClick("3")}>
          3
        </button>
        <button className="btn equals" onClick={handleEquals}>
          =
        </button>
        <button
          className="btn digit zero"
          onClick={() => handleDigitClick("0")}
        >
          0
        </button>
        <button className="btn digit" onClick={() => handleDigitClick(".")}>
          .
        </button>
      </div>
    </div>
  );
}

export default App;

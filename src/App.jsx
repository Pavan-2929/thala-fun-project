import { useState } from "react";
import song from "./music/song.mp3";
import mobileBg from "./assets/mobile_bg.jpg";
import pcBg from "./assets/pc_bg.jpg";

function App() {
  const [input, setInput] = useState("");
  const [subtractedNumber, setSubtractedNumber] = useState(null);
  const [missingNumber, setMissingNumber] = useState(null);
  const [finalAnswer, setFinalAnswer] = useState(null);
  const [audio] = useState(new Audio(song));
  const [subtractSteps, setSubtractSteps] = useState([]);
  const [stringLength, setStringLength] = useState(0);

  const subtractNumber = (input) => {
    const numberArray = Array.from(input, Number);
    let answer = numberArray[0];
    const steps = [answer];

    for (let index = 1; index < numberArray.length; index++) {
      const currentNumber = numberArray[index];
      answer -= numberArray[index];
      steps.push(` - ${currentNumber}`);
    }
    setSubtractSteps(steps);
    return answer;
  };

  const play = () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.currentTime = 0;
    }
  };

  const inputHandler = (e) => {
    e.preventDefault();

    if (input === "") {
      play();
      alert(" '' + 7 = 7 \n\n\n\n Thala for a reason");
      return;
    } else if (input === "0") {
      play();
      alert(" 0 + 7 = 7 \n\n\n\n Thala for a reason");
      return;
    }
    else if(input === '7' || input.length === 7){
      play();
      alert("Perfect \n\n\n You are Thala")
    }
     else if (!isNaN(input)) {
      const currentSubtractedNumber = subtractNumber(input);
      const currentMissingNumber = 7 - currentSubtractedNumber;
      const currentFinalAnswer = currentSubtractedNumber + currentMissingNumber;

      setSubtractedNumber(currentSubtractedNumber);
      setMissingNumber(currentMissingNumber);
      setFinalAnswer(currentFinalAnswer);

      play();
    } else {
      const cuttedInput = input.toString().trim().split(" ").join("");
      const currentStringLength = cuttedInput.length;

      setStringLength(currentStringLength);
      const currentMissingLength = 7 - currentStringLength;
      const currentFinalAnswer = currentStringLength + currentMissingLength;

      setSubtractedNumber(currentStringLength);
      setMissingNumber(currentMissingLength);
      setFinalAnswer(currentFinalAnswer);

      play();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${window.innerWidth <= 768 ? mobileBg : pcBg})`,
      }}
    >
      <div className="bg-opacity-80 bg-gray-800 p-8 rounded shadow-md max-w-md w-full text-white">
        <h1 className="text-3xl font-bold mb-6 text-blue-500">
          Thala for a reason
        </h1>
        <form onSubmit={inputHandler}>
          <div className="mb-4">
            <label
              htmlFor="input"
              className="block text-sm font-medium text-gray-300"
            >
              Enter something
            </label>
            <input
              id="input"
              className="border border-gray-500 p-3 w-full rounded focus:outline-none focus:border-blue-500 bg-opacity-50 text-gray-800 placeholder-gray-600"
              type="text"
              placeholder="e.g., 123"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          {finalAnswer && subtractedNumber && missingNumber && (
            <div className="mb-4">
              <h5 className="text-lg font-bold text-gray-300">
                {`${
                  isNaN(input)
                    ? `${stringLength}(String Length)`
                    : subtractSteps.join("")
                } + ${missingNumber} = ${finalAnswer}`}
              </h5>
            </div>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            type="submit"
          >
            Submit
          </button>
        </form>
        <p className="mt-4 text-gray-300 text-sm">Thala for a reason</p>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./index.css";
import img1 from "./img/pal.png";
import img2 from "./img/jeff-b.png";

function App() {
  const initState = {
    count: 0,
    time: 20,
    limit: 15,
    endWinModal: false,
  };
  const [count, setCount] = useState(initState.count);
  const [time, setTime] = useState(initState.time);
  const [end, setEnd] = useState(initState.endWinModal);
  const [win, setWin] = useState(initState.endWinModal);
  const [modal, setModal] = useState(initState.endWinModal);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  if (count >= initState.limit && !end) {
    setModal(true);
    setWin(true);
    setEnd(true);
  }

  if (time < 1 && !end) {
    setModal(true);
    setEnd(true);
  }

  //Timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    //cleanup
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const onDragStart = (e) => {
    const dragImage = e.target.cloneNode(true);
    dragImage.style.opacity = "0.5";
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 50, 50);

    //cleanup after drag starts
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const onDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const onDrop = (e) => {
    e.preventDefault(); // Necessary to allow dropping
    console.log("dropped in receiver");
    setCount(count + 1);
  };

  const resetGame = () => {
    setCount(initState.count);
    setTime(initState.time);
    setEnd(initState.endWinModal);
    setWin(initState.endWinModal);
    setModal(initState.endWinModal);
  };

  if (isMobile) {
    return (
      <h1 style={{ textAlign: "center" }}>
        Not available on mobile, go get a laptop/desktop
      </h1>
    );
  }

  return (
    <>
      <div className="container">
        {modal && win && (
          <div className="modal">
            <h1>You Did It!</h1>
            <p>Now Jeff will be able to face the day!</p>
            <button
              onClick={() => {
                resetGame();
              }}
            >
              Try again?
            </button>
          </div>
        )}
        {modal && end && !win && (
          <div className="modal">
            <h1>You Blew It!</h1>
            <p>Now Jeff will never know what to call someone!</p>
            <button
              onClick={() => {
                resetGame();
              }}
            >
              Try again?
            </button>
          </div>
        )}

        {!end && (
          <div className="game">
            <h1 className="title hurry">Hurry!</h1>
            <h1 className="title">
              Jeff needs <span className="counter-num">{initState.limit}</span>{" "}
              "Pals" up his ass to become whole again!
            </h1>
            <p style={{ textAlign: "center" }}>
              *Drag and drop them over there
            </p>
            <p className="timer">
              {time}
              <span className="seconds">s</span>
            </p>
            <div className="counter-wrap">
              <h3 className="counter">
                Count: <span className="counter-num">{count}</span>
              </h3>
            </div>
            <div className="timer-wrap"></div>
            <div className="basket-container">
              <img
                draggable
                src={img1}
                onDragStart={onDragStart}
                className="basket"
                alt="fart"
              ></img>
              <img
                src={img2}
                alt="fart2"
                onDragOver={onDragOver}
                onDrop={onDrop}
                className="receiver"
              ></img>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

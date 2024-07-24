// "use client";
// import React, { KeyboardEvent, useEffect, useState } from "react";
// import SnakePart from './SnakePart';
// import Joystick from './Joystick'; // Import the Joystick component

// const GRID_SIZE = 20;
// const SNAKE_SPEED = 150; 

// type Point = {
//   x: number;
//   y: number;
// };

// type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

// const SnakeGrid = () => {
//   const [snake, setSnake] = useState<Point[]>([
//     { y: 0, x: 2 },
//     { y: 0, x: 1 },
//     { y: 0, x: 0 },
//   ]);
//   const [visible,setvisible]=useState<boolean>(false)
//   const [food, setFood] = useState<Point | null>(null); 
//   const [direction, setDirection] = useState<Direction | null>(null);
//   const [gameOver, setGameOver] = useState<boolean>(false);
//   const [score, setScore] = useState(0);
//   const [highScore, setHighScore] = useState(0);

//   const generateFood = () => {
//     const x = Math.floor(Math.random() * GRID_SIZE);
//     const y = Math.floor(Math.random() * GRID_SIZE);
//     setFood({ x, y });
//   };

//   const moveSnake = () => {
//     if (!direction || gameOver) return;

//     const newSnake = [...snake];
//     const snakeHead = { ...newSnake[0] };

//     if (direction === "UP") {
//       snakeHead.y -= 1;
//     }
//     if (direction === "DOWN") {
//       snakeHead.y += 1;
//     }
//     if (direction === "LEFT") {
//       snakeHead.x -= 1;
//     }
//     if (direction === "RIGHT") {
//       snakeHead.x += 1;
//     }

//     if (
//       snakeHead.x < 0 ||
//       snakeHead.x >= GRID_SIZE ||
//       snakeHead.y < 0 ||
//       snakeHead.y >= GRID_SIZE ||
//       newSnake.some(
//         (snakePart) =>
//           snakePart.x === snakeHead.x && snakePart.y === snakeHead.y
//       )
//     ) {
//       setGameOver(true);
//       return;
//     }

//     newSnake.unshift(snakeHead);

//     if (snakeHead.x === food?.x && snakeHead.y === food?.y) {
//       generateFood();
//     } else {
//       newSnake.pop();
//     }

//     setSnake(newSnake);
//     setScore(newSnake.length - 3);
//   };

//   const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
//     event.preventDefault(); 
//     if ((event.key === "ArrowUp" || event.key === "w") && direction !== "DOWN") {
//       setDirection("UP");
//     }
//     if ((event.key === "ArrowDown" || event.key === "s") && direction !== "UP") {
//       setDirection("DOWN");
//     }
//     if ((event.key === "ArrowLeft" || event.key === "a") && direction !== "RIGHT") {
//       setDirection("LEFT");
//     }
//     if ((event.key === "ArrowRight" || event.key === "d") && direction !== "LEFT") {
//       setDirection("RIGHT");
//     }
//   };

//   const handleJoystickMove = (dir: Direction) => {
//     if (dir === "UP" && direction !== "DOWN") {
//       setDirection("UP");
//     }
//     if (dir === "DOWN" && direction !== "UP") {
//       setDirection("DOWN");
//     }
//     if (dir === "LEFT" && direction !== "RIGHT") {
//       setDirection("LEFT");
//     }
//     if (dir === "RIGHT" && direction !== "LEFT") {
//       setDirection("RIGHT");
//     }
//   };

//   useEffect(() => {
//     document.addEventListener(
//       "keydown",
//       handleKeyPress as unknown as EventListener
//     );
//     return () => {
//       document.removeEventListener(
//         "keydown",
//         handleKeyPress as unknown as EventListener
//       );
//     };
//   }, [direction]);

//   useEffect(() => {
//     generateFood(); 
//   }, []);

//   useEffect(() => {
//     if (gameOver) {
//       setDirection(null);
//       if (score > highScore) {
//         setHighScore(score);
//       }
//     }
//   }, [gameOver]);

//   useEffect(() => {
//     if (direction && !gameOver) {
//       const interval = setInterval(moveSnake, SNAKE_SPEED); 
//       return () => clearInterval(interval);
//     }
//   }, [snake, direction, gameOver]);

//   const restartGame = () => {
//     setSnake([
//       { y: 0, x: 2 },
//       { y: 0, x: 1 },
//       { y: 0, x: 0 },
//     ]);
//     setDirection(null);
//     setGameOver(false);
//     generateFood(); 
//   };

//   return (
//     <div
//       tabIndex={0}
//       autoFocus
//       className="relative flex flex-col items-center justify-center p-2 bg-[#dfe1e8] shadow-lg rounded-md border-gray-200"
      
//     >
//       {gameOver && (
//         <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#dfe1e8] p-2 rounded-lg shadow-lg">
//           <h1 className="text-4xl font-bold text-red-500 mt-2 custom-font">GAME OVER!</h1>
//           <p className="mt-2 text-lg custom-font">Score: {score}</p>
//           <p className="mt-2 text-lg custom-font">High Score: {highScore}</p>
//           <button
//             onClick={restartGame}
//             className="play-again custom-radius mt-4 text-black font-bold py-2 px-4 transition-all ease-in-out duration-200"
//           >
//             Play Again
//           </button>
//         </div>
//       )}
//       <div className="mt-3 mb-0.5 flex text-[#8c8c8c]">
//         <p className="text-base font-semibold pr-[8.5rem]">Score: {score}</p>
//         <p className="text-base font-bold">High Score: {highScore}</p>
//       </div>
//       <div className="border border-black bg-[#ffcc66] p-1 rounded-lg">
//         <svg
//           viewBox={`0 0 ${GRID_SIZE * 20} ${GRID_SIZE * 20}`}
//           className="w-full h-full"
//         >
//           <SnakePart points={snake} />
//           {food && ( 
//             <circle
//               cx={food.x * 20 + 10}
//               cy={food.y * 20 + 10}
//               r={10}
//               fill="red"
//               fillOpacity="0.7"
//             />
//           )}
//         </svg>
//       </div>
//      {visible && <Joystick onMove={handleJoystickMove} />} 
//     {!visible && <button onClick={()=>{setvisible(true)}}>Show Joystick</button>}
//     </div>
//   );
// };

// export default SnakeGrid;


"use client";
import React, { KeyboardEvent, useEffect, useState } from "react";
import SnakePart from './SnakePart';
import Joystick from './Joystick'; // Import the Joystick component

const GRID_SIZE = 20;
const SNAKE_SPEED = 150; 

type Point = {
  x: number;
  y: number;
};

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const SnakeGrid = () => {
  const [snake, setSnake] = useState<Point[]>([
    { y: 0, x: 2 },
    { y: 0, x: 1 },
    { y: 0, x: 0 },
  ]);
  const [visible, setVisible] = useState<boolean>(false);
  const [food, setFood] = useState<Point | null>(null); 
  const [direction, setDirection] = useState<Direction | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const generateFood = () => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    setFood({ x, y });
  };

  const moveSnake = () => {
    if (!direction || gameOver) return;

    const newSnake = [...snake];
    const snakeHead = { ...newSnake[0] };

    if (direction === "UP") {
      snakeHead.y -= 1;
    }
    if (direction === "DOWN") {
      snakeHead.y += 1;
    }
    if (direction === "LEFT") {
      snakeHead.x -= 1;
    }
    if (direction === "RIGHT") {
      snakeHead.x += 1;
    }

    if (
      snakeHead.x < 0 ||
      snakeHead.x >= GRID_SIZE ||
      snakeHead.y < 0 ||
      snakeHead.y >= GRID_SIZE ||
      newSnake.some(
        (snakePart) =>
          snakePart.x === snakeHead.x && snakePart.y === snakeHead.y
      )
    ) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(snakeHead);

    if (snakeHead.x === food?.x && snakeHead.y === food?.y) {
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
    setScore(newSnake.length - 3);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault(); 
    if ((event.key === "ArrowUp" || event.key === "w") && direction !== "DOWN") {
      setDirection("UP");
    }
    if ((event.key === "ArrowDown" || event.key === "s") && direction !== "UP") {
      setDirection("DOWN");
    }
    if ((event.key === "ArrowLeft" || event.key === "a") && direction !== "RIGHT") {
      setDirection("LEFT");
    }
    if ((event.key === "ArrowRight" || event.key === "d") && direction !== "LEFT") {
      setDirection("RIGHT");
    }
  };

  const handleJoystickMove = (dir: Direction) => {
    if (dir === "UP" && direction !== "DOWN") {
      setDirection("UP");
    }
    if (dir === "DOWN" && direction !== "UP") {
      setDirection("DOWN");
    }
    if (dir === "LEFT" && direction !== "RIGHT") {
      setDirection("LEFT");
    }
    if (dir === "RIGHT" && direction !== "LEFT") {
      setDirection("RIGHT");
    }
  };

  useEffect(() => {
    document.addEventListener(
      "keydown",
      handleKeyPress as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyPress as unknown as EventListener
      );
    };
  }, [direction]);

  useEffect(() => {
    generateFood(); 
  }, []);

  useEffect(() => {
    if (gameOver) {
      setDirection(null);
      if (score > highScore) {
        setHighScore(score);
      }
    }
  }, [gameOver]);

  useEffect(() => {
    if (direction && !gameOver) {
      const interval = setInterval(moveSnake, SNAKE_SPEED); 
      return () => clearInterval(interval);
    }
  }, [snake, direction, gameOver]);

  const restartGame = () => {
    setSnake([
      { y: 0, x: 2 },
      { y: 0, x: 1 },
      { y: 0, x: 0 },
    ]);
    setDirection(null);
    setGameOver(false);
    generateFood(); 
  };

  return (
    <div
      tabIndex={0}
      autoFocus
      className="relative flex flex-col items-center justify-center p-2 bg-[#dfe1e8] shadow-lg rounded-md border-gray-200"
    >
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#dfe1e8] p-2 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-red-500 mt-2 custom-font">GAME OVER!</h1>
          <p className="mt-2 text-lg custom-font">Score: {score}</p>
          <p className="mt-2 text-lg custom-font">High Score: {highScore}</p>
          <button
            onClick={restartGame}
            className="play-again custom-radius mt-4 text-black font-bold py-2 px-4 transition-all ease-in-out duration-200"
          >
            Play Again
          </button>
        </div>
      )}
      <div className="mt-3 mb-0.5 flex text-[#8c8c8c]">
        <p className="text-base font-semibold pr-[8.5rem]">Score: {score}</p>
        <p className="text-base font-bold">High Score: {highScore}</p>
      </div>
      <div className="border border-black bg-[#ffcc66] p-1 rounded-lg">
        <svg
          viewBox={`0 0 ${GRID_SIZE * 20} ${GRID_SIZE * 20}`}
          className="w-full h-full"
        >
          <SnakePart points={snake} />
          {food && ( 
            <circle
              cx={food.x * 20 + 10}
              cy={food.y * 20 + 10}
              r={10}
              fill="red"
              fillOpacity="0.7"
            />
          )}
        </svg>
      </div>
      {visible && <Joystick onMove={handleJoystickMove} />} 
      <button
        onClick={() => setVisible(!visible)}
        className="transition-opacity duration-200 text-[#8c8c8c] pt-2 hover:text-gray-800"
      >
        {visible ? 'Hide Joystick' : 'Show Joystick'}
      </button>
    </div>
  );
};

export default SnakeGrid;

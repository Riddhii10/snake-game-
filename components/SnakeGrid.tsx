"use client";
import React, { KeyboardEvent, useEffect, useState } from "react";

const GRID_SIZE = 20;
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
  const [food, setFood] = useState<Point>({ x: 0, y: 0 });
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
    if (!direction || gameOver) return; // Exit early if game is over or no direction is set

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

    if (snakeHead.x === food.x && snakeHead.y === food.y) {
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") {
      setDirection("UP");
    }
    if (event.key === "ArrowDown" && direction !== "UP") {
      setDirection("DOWN");
    }
    if (event.key === "ArrowLeft" && direction !== "RIGHT") {
      setDirection("LEFT");
    }
    if (event.key === "ArrowRight" && direction !== "LEFT") {
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
      } // Stop the snake movement
    }
  }, [gameOver]);

  useEffect(() => {
    if (direction && !gameOver) {
      const interval = setInterval(moveSnake, 100);
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
      className="grid grid-cols-20 grid-rows-20 border border-black"
    >
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-red-500">GAME OVER!</h1>
          <p className="mt-2 text-lg">Score: {score}</p>
          <p className="mt-2 text-lg">High Score: {highScore}</p>
          <button
            onClick={restartGame}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            PLAY AGAIN!!!
          </button>
        </div>
      )}
        
      {Array.from({ length: GRID_SIZE }).map((_, y) => (
        <div className="flex" key={y}>
          {Array.from({ length: GRID_SIZE }).map((_, x) => (
            <div
              key={x}
              className={`w-5 h-5 border border-gray-50
                                ${
                                  snake.some(
                                    (snakePart) =>
                                      snakePart.x === x && snakePart.y === y
                                  ) && "bg-green-500"
                                }
                                ${food.x === x && food.y === y && "bg-red-500"}
                            `}
            ></div>
          ))}
        </div>
      ))}
       <div className="flex flex-col items-center justify-between h-full">
        <div className="text-center mb-4">
          <p className="text-xl font-bold">Score: {score}</p>
          <p className="text-xl font-bold">High Score: {highScore}</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={restartGame}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            PLAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnakeGrid;

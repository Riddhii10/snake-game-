"use client";
import React, { KeyboardEvent, useEffect, useState } from "react";
import SnakePart from './SnakePart';

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

    if (snakeHead.x === food.x && snakeHead.y === food.y) {
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
    setScore(newSnake.length - 3);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevents the default action
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
      }
    }
  }, [gameOver]);

  useEffect(() => {
    if (direction && !gameOver) {
      const interval = setInterval(moveSnake, 150);
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
      className="relative flex flex-col items-center justify-center p-2 bg-white shadow-lg rounded-lg border-gray-200"
    >
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-2 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-red-500 mt-2">GAME OVER!</h1>
          <p className="mt-2 text-lg">Score: {score}</p>
          <p className="mt-2 text-lg">High Score: {highScore}</p>
          <button
            onClick={restartGame}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Play Again
          </button>
        </div>
      )}
      <div className="border-4 border-green-300 bg-green-200 p-1 rounded-lg">
        <svg
          viewBox={`0 0 ${GRID_SIZE * 20} ${GRID_SIZE * 20}`}
          className="w-full h-full"
        >
          <SnakePart points={snake} />
          <circle
            cx={food.x * 20 + 10}
            cy={food.y * 20 + 10}
            r={10}
            fill="red"
          />
        </svg>
      </div>
      <div className="flex flex-col items-center justify-between w-full h-full mt-4 bg-blue-50 p-2 rounded-3xl border-4 border-blue-200">
        <div className="text-center mb-4">
          <p className="text-xl font-bold">Score: {score}</p>
          <p className="text-xl font-bold">High Score: {highScore}</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={restartGame}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnakeGrid;

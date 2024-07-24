import React from 'react';
import { motion } from 'framer-motion';

type Point = {
  x: number;
  y: number;
};

type SnakePartProps = {
  points: Point[];
};

const SnakePart: React.FC<SnakePartProps> = ({ points }) => {
  const size = 20;
  const thinnerSize = 6; // Thinner width for the snake body

  const getPathData = (points: Point[]) => {
    let pathData = `M${points[0].x * size + size / 2} ${points[0].y * size + size / 2}`;
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      pathData += ` L${point.x * size + size / 2} ${point.y * size + size / 2}`;
    }
    return pathData;
  };

  const pathData = getPathData(points);

  return (
    <>
      <motion.path
        d={pathData}
        fill="none"
        stroke="black"
        strokeWidth={thinnerSize}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.1,ease: "easeInOut" }}
      />
      <motion.circle
        cx={points[0].x * size + size / 2}
        cy={points[0].y * size + size / 2}
        r={thinnerSize / 2}
        fill="black"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
};

export default SnakePart;

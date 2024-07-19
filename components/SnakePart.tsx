// import React from 'react';
// import { motion } from 'framer-motion';
// type Point = {
//   x: number;
//   y: number;
// };

// type SnakePartProps = {
//   points: Point[];
// };

// const SnakePart: React.FC<SnakePartProps> = ({ points }) => {
//   const size = 20;
//   const thinnerSize = 6; // Thinner width for the snake body

//   const getPathData = (points: Point[]) => {
//     let pathData = `M${points[0].x * size + size / 2} ${points[0].y * size + size / 2}`;
//     for (let i = 1; i < points.length; i++) {
//       const point = points[i];
//       pathData += ` L${point.x * size + size / 2} ${point.y * size + size / 2}`;
//     }
//     return pathData;
//   };

//   const getHeadPath = (points: Point[]) => {
//     if (points.length < 2) return '';

//     const head = points[0];
//     const neck = points[1];
//     const directionX = head.x - neck.x;
//     const directionY = head.y - neck.y;

//     // Calculate the control points for the curved head
//     const controlPoint1 = {
//       x: head.x * size + size / 2 + directionY * thinnerSize / 2,
//       y: head.y * size + size / 2 - directionX * thinnerSize / 2,
//     };

//     const controlPoint2 = {
//       x: head.x * size + size / 2 - directionY * thinnerSize / 2,
//       y: head.y * size + size / 2 + directionX * thinnerSize / 2,
//     };

//     return `
//       M${neck.x * size + size / 2 - directionY * thinnerSize / 2} ${neck.y * size + size / 2 + directionX * thinnerSize / 2}
//       L${neck.x * size + size / 2 + directionY * thinnerSize / 2} ${neck.y * size + size / 2 - directionX * thinnerSize / 2}
//       Q${controlPoint1.x} ${controlPoint1.y} ${head.x * size + size / 2} ${head.y * size + size / 2}
//       Q${controlPoint2.x} ${controlPoint2.y} ${neck.x * size + size / 2 - directionY * thinnerSize / 2} ${neck.y * size + size / 2 + directionX * thinnerSize / 2}
//       Z
//     `;
//   };

//   const pathData = getPathData(points);
//   const headPathData = getHeadPath(points);

//   return (
//     <>

//       <path
//         d={pathData}
//         fill="none"
//         stroke="black"
//         strokeWidth={thinnerSize}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
      
//       {points.slice(1).map((point, index) => (
//         <rect
//           key={index}
//           x={point.x * size + (size - thinnerSize) / 2}
//           y={point.y * size + (size - thinnerSize) / 2}
//           width={thinnerSize}
//           height={thinnerSize}
//           fill="black"
//         />
//       ))}
//       <path
//         d={headPathData}
//         fill="black"
//       />
//     </>
//   );
// };

// export default SnakePart;



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

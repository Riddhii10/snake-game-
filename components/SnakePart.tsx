// circled
// import React from 'react';
// type Point = {
//   x: number;
//   y: number;
// };
// type SnakePartProps = {
//   points: Point[];
// };
// const SnakePart: React.FC<SnakePartProps> = ({ points }) => {
//   const size = 20;
//   const getPathData = (points: Point[]) => {
//     let pathData = `M${points[0].x * size + size / 2} ${points[0].y * size + size / 2}`;
//     for (let i = 1; i < points.length; i++) {
//       const point = points[i];
//       pathData += ` L${point.x * size + size / 2} ${point.y * size + size / 2}`;
//     }
//     return pathData;
//   };
//   const getStrokeWidth = (index: number) => {
//     const maxStrokeWidth = size;
//     const minStrokeWidth = size / 4;
//     const strokeWidth = maxStrokeWidth - ((maxStrokeWidth - minStrokeWidth) * index) / (points.length - 1);
//     return strokeWidth;
//   };
//   const pathData = getPathData(points);
//   return (
//     <>
//       {points.map((point, index) => (
//         <circle
//           key={index}
//           cx={point.x * size + size / 2}
//           cy={point.y * size + size / 2}
//           r={getStrokeWidth(index) / 2}
//           fill="green"
//         />
//       ))}
//       <circle
//         cx={points[0].x * size + size / 2}
//         cy={points[0].y * size + size / 2}
//         r={size / 2}
//         fill="darkgreen"
//       />
//     </>
//   );
// };

// export default SnakePart;


// uniform
// import React from 'react';
// type Point = {
//   x: number;
//   y: number;
// };
// type SnakePartProps = {
//   points: Point[];
// };
// const SnakePart: React.FC<SnakePartProps> = ({ points }) => {
//   const size = 20;
//   const getPathData = (points: Point[]) => {
//     let pathData = `M${points[0].x * size + size / 2} ${points[0].y * size + size / 2}`;
//     for (let i = 1; i < points.length; i++) {
//       const point = points[i];
//       pathData += ` L${point.x * size + size / 2} ${point.y * size + size / 2}`;
//     }
//     return pathData;
//   };
//   const pathData = getPathData(points);
//   return (
//     <>
//       <path
//         d={pathData}
//         fill="none"
//         stroke="green"
//         strokeWidth={size}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <circle
//         cx={points[0].x * size + size / 2}
//         cy={points[0].y * size + size / 2}
//         r={size / 2}
//         fill="darkgreen"
//       />
//     </>
//   );
// };
// export default SnakePart;


import React from 'react';

type Point = {
  x: number;
  y: number;
};

type SnakePartProps = {
  points: Point[];
};

const SnakePart: React.FC<SnakePartProps> = ({ points }) => {
  const size = 20;

  const getPathData = (points: Point[]) => {
    let pathData = `M${points[0].x * size + size / 2} ${points[0].y * size + size / 2}`;
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      pathData += ` L${point.x * size + size / 2} ${point.y * size + size / 2}`;
    }
    return pathData;
  };

  const getHeadPath = (points: Point[]) => {
    if (points.length < 2) return '';

    const head = points[0];
    const neck = points[1];
    const directionX = head.x - neck.x;
    const directionY = head.y - neck.y;

    // Calculate the control points for the curved head
    const controlPoint1 = {
      x: head.x * size + size / 2 + directionY * size / 2,
      y: head.y * size + size / 2 - directionX * size / 2,
    };

    const controlPoint2 = {
      x: head.x * size + size / 2 - directionY * size / 2,
      y: head.y * size + size / 2 + directionX * size / 2,
    };

    return `
      M${neck.x * size + size / 2 - directionY * size / 2} ${neck.y * size + size / 2 + directionX * size / 2}
      L${neck.x * size + size / 2 + directionY * size / 2} ${neck.y * size + size / 2 - directionX * size / 2}
      Q${controlPoint1.x} ${controlPoint1.y} ${head.x * size + size / 2} ${head.y * size + size / 2}
      Q${controlPoint2.x} ${controlPoint2.y} ${neck.x * size + size / 2 - directionY * size / 2} ${neck.y * size + size / 2 + directionX * size / 2}
      Z
    `;
  };

  const pathData = getPathData(points);
  const headPathData = getHeadPath(points);

  return (
    <>
      <path
        d={pathData}
        fill="none"
        stroke="green"
        strokeWidth={size}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.slice(1).map((point, index) => (
        <rect
          key={index}
          x={point.x * size}
          y={point.y * size}
          width={size}
          height={size}
          fill="green"
        />
      ))}
      <path
        d={headPathData}
        fill="green"
      />
    </>
  );
};

export default SnakePart;

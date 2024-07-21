import React from 'react';
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type JoystickProps = {
  onMove: (direction: "UP" | "DOWN" | "LEFT" | "RIGHT") => void;
};

const Joystick: React.FC<JoystickProps> = ({ onMove }) => {
  return (
    <div className="fixed bottom-0 right-0 flex flex-col items-center bg-[#8c8c8c] my-radius">
      
      <button onClick={() => onMove("UP")} className="p-2 m-1 bg-gray-200 rounded-full ">
        <FaArrowUp />
      </button>
      
      <div className="flex ">
        <button onClick={() => onMove("LEFT")} className="p-2 m-1 bg-gray-200 rounded-full mr-10">
          <FaArrowLeft />
        </button>

        <button onClick={() => onMove("RIGHT")} className="p-2 m-1 bg-gray-200 rounded-full">
          <FaArrowRight />
        </button>
      </div>
      <button onClick={() => onMove("DOWN")} className="p-2 m-1 bg-gray-200 rounded-full">
        <FaArrowDown />
      </button>
    </div>
  );
};

export default Joystick;

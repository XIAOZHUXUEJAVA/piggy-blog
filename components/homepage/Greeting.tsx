import React, { useEffect } from 'react';
import clsx from 'clsx';
// import { renderCanvas } from '../../utils/renderCanvas'; // Ensure correct import path
// import { newCanvas } from '../../utils/newCanvas'; // Ensure correct import path

const Greeting = () => {
  const className = clsx(
    'relative', // Add relative positioning to the container
    'bg-gradient-to-r from-gray-500 to-slate-400 dark:bg-gradient-to-l dark:from-blue-800 dark:to-primary-600',
    'mb-8 bg-clip-text text-4xl font-extrabold leading-[60px] tracking-tight text-transparent md:text-7xl md:leading-[86px]'
  );

  // Call renderCanvas when the component mounts
  useEffect(() => {
    // renderCanvas(); // This will initialize the canvas animation
    //  newCanvas('canvas')
  }, []);

  return (
    <div className={className}>
      <div className="absolute left-1/2 top-1/2 z-[-1] -translate-x-1/2 -translate-y-1/2 transform">
        {/* The canvas element for rendering the animation */}
        <canvas id="canvas"></canvas>
      </div>
      Hello, everyone! <span className="font-bold">I am here to share my learning journey and insights.</span>
    </div>
  );
};

export default Greeting;

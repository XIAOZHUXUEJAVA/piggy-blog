import clsx from 'clsx';
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation';

const Greeting = () => {
  const className = clsx(
    'relative', // Add relative positioning to the container
    'bg-gradient-to-r from-gray-500 to-slate-400 dark:bg-gradient-to-l dark:from-blue-800 dark:to-primary-600',
    'mb-8 bg-clip-text text-4xl font-extrabold leading-[60px] tracking-tight text-transparent md:text-7xl md:leading-[86px]'
  );

  return (
    <div className={className}>
      <RoughNotationGroup show={true}>
        <RoughNotation type="underline" color="#4FD1C5" animationDuration={1000}>
          <span>Hello, everyone! </span>
        </RoughNotation>
        <span className="font-bold">I am here to share my learning journey and insights.</span>
      </RoughNotationGroup>
    </div>
  );
};

export default Greeting;

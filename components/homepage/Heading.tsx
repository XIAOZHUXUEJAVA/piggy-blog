import siteMetadata from '@/data/siteMetadata';
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation';

const Heading = () => {
  return (
    <RoughNotationGroup show={true}>
      <h1 className="flex flex-wrap items-center gap-2 font-medium text-neutral-900 dark:text-neutral-200">
        <span className="flex items-center gap-1">
          I'm
          <RoughNotation type="underline" color="#FFB900" animationDelay={500} animationDuration={1200}>
            {siteMetadata.fullName}
          </RoughNotation>
        </span>
        <span>a programmer dedicated to becoming </span>

        <RoughNotation type="highlight" color="#f43f5e33" animationDelay={1500} animationDuration={1200}>
          FullStack Engineer
        </RoughNotation>
      </h1>
    </RoughNotationGroup>
  );
};

export default Heading;

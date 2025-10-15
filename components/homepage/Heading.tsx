import siteMetadata from '@/data/siteMetadata';
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation';

const Heading = () => {
  return (
    <RoughNotationGroup show={true}>
      <h1 className="flex items-center gap-1 font-medium text-neutral-900 dark:text-neutral-200">
        I'm <RoughNotation type="underline" color="#FFB900" animationDelay={500} animationDuration={1200}>{siteMetadata.fullName}</RoughNotation> a programmer dedicated to becoming <RoughNotation type="highlight" color="#f43f5e33" animationDelay={1500} animationDuration={1200}>FullStack Engineer</RoughNotation>
      </h1>
    </RoughNotationGroup>
  );
};

export default Heading;

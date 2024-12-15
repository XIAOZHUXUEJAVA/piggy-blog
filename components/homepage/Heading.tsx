import siteMetadata from '@/data/siteMetadata';

import Twemoji from '@/components/ui/Twemoji';
import { RoughNotation } from 'react-rough-notation';

const Heading = () => {
  return (
    <h1 className="font-medium text-neutral-900 dark:text-neutral-200">
      I'm{' '}
      <RoughNotation type="underline" show={true} color="#FFb900" animationDelay={1400} animationDuration={1200}>
        {siteMetadata.fullName}
      </RoughNotation>{' '}
      - a programmer dedicated to becoming a{' '}
      <RoughNotation type="circle" show={true} color="#f43f5e" animationDelay={1700} animationDuration={1200}>
        FullStack Engineer{' '}
      </RoughNotation>
      {/* <span className="hidden">Ho Chi Minh, VN</span> */}
      <span className="absolute ml-1.5 inline-flex pt-[3px]">
        <Twemoji emoji="viet-nam-vietnam-flag" />
      </span>
    </h1>
  );
};

export default Heading;

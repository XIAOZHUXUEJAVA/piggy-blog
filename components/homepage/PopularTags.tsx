import { map } from 'lodash';

import popularTags from '@/data/popularTags';

import Link from '@/components/ui/Link';
import BrandIcon from '@/components/ui/BrandIcon';
import Twemoji from '../ui/Twemoji';
import { RoughNotation } from 'react-rough-notation';

const PopularTags = () => {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 py-6 md:space-y-5">
        {/* <RoughNotation type="underline" show={true} color="#FFb900" animationDelay={1400} animationDuration={1200}>
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Popular Tags
          </h1>
        </RoughNotation> */}
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          <RoughNotation
            type="bracket"
            show={true}
            color="#1db954" // 使用柔和的蓝色
            brackets={['left', 'right']}
            animationDelay={1000}
            animationDuration={1000}
            strokeWidth={5}
          >
            <span className="inline-block text-gray-600" style={{ padding: '0.2em' }}>
              Popular Tags
            </span>
          </RoughNotation>
        </h1>

        {/* <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Popular Tags
        </h1> */}
        <p className="!mt-2 flex text-lg leading-7 text-gray-500 dark:text-gray-400">
          Popular tags feature the most widely favored topics.
          <Link href="/tags" className="z-[1] ml-auto ">
            <Twemoji emoji="backhand-index-pointing-right" />
            <RoughNotation type="underline" show={true} color="#FFb900" animationDelay={1400} animationDuration={1200}>
              <span data-umami-event="home-link-blog" className="z-[1] ml-1.5">
                See more blogs
              </span>
            </RoughNotation>
          </Link>
        </p>
      </div>
      <div className="popular-tags grid grid-cols-3 gap-4 py-6 xl:grid-cols-6">
        {map(popularTags, (popularTag) => {
          const { slug, iconType, href, title } = popularTag;

          const className = `${slug} flex w-[128px] justify-center space-x-2 rounded-lg p-3 transform transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-1 hover:shadow-lg hover:shadow-gray-400`;

          return (
            <Link key={slug} href={href} className={className}>
              <BrandIcon type={iconType} className="h-6 w-6" />
              <div className="my-auto text-white">{title}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PopularTags;

import { ReactNode } from 'react';
import type { Authors } from 'contentlayer/generated';
import { Icon } from '@iconify/react';
// import { CareerTimeline } from '@/components/about';
import { Link, Image, Twemoji } from '@/components/ui';

interface Props {
  children: ReactNode;
  content: Omit<Authors, '_id' | '_raw' | 'body'>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, email, twitter, github } = content;
  return (
    <>
      <div className="about divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 md:text-lg md:leading-7">
            Here's a brief introduction about me.
          </p>
        </div>

        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8 sm:pt-28">
            <Image src={avatar || ''} alt="avatar" width={192} height={192} className="h-48 w-48 rounded-full" />

            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            {/* <div className="text-gray-500 dark:text-gray-400">{company}</div> */}

            <div className="mt-2 flex gap-3">
              <Link href={`mailto:${email}`}>
                <Icon icon="fluent-color:mail-24" width="24px" height="24px" />
              </Link>
              <Link href={github || ''} target="_blank">
                <Icon icon="jam:github" width="24px" height="24px" />
              </Link>
              <Link href={twitter || ''} target="_blank">
                <Icon icon="ri:twitter-x-fill" width="24px" height="24px" />
              </Link>
              {/* <Link href={linkedin || ''} target="_blank">
                <Icon icon="mingcute:linkedin-line" width="24px" height="24px" style={{ color: '#648ae3' }} />
              </Link> */}
            </div>
          </div>

          {/* <div className="prose max-w-none pb-8 dark:prose-dark xl:col-span-2">{children}</div> */}

          <div className="prose max-w-none pb-8 dark:prose-dark xl:col-span-2">
            <h2>
              Hello, friends! <Twemoji className="mx-2" emoji="waving-hand" /> I'm Piggy DP.
            </h2>
            <div className="flex items-center justify-between">
              {/* <h2>My Career</h2> */}

              {/* <Button as="a" href="/static/resume.pdf" target="_blank">
                <span>Resume</span>
                <Twemoji emoji="page-facing-up" />
              </Button> */}
            </div>
            {/* <CareerTimeline /> */}
            {/* <h2>Tech stack</h2>
            <p>
              This blog is built with{' '}
              <a target="_blank" href="https://nextjs.org/">
                Next.js
              </a>{' '}
              and{' '}
              <a target="_blank" href="https://tailwindcss.com/">
                Tailwind CSS
              </a>{' '}
              using <strong>Tailwind Nextjs Starter Blog</strong>.
            </p>

            <p>
              This blog site takes inspiration from leohuynh.dev. I appreciate{' '}
              <a target="_blank" href="https://twitter.com/hta218_">
                Leo Huynh
              </a>{' '}
              and{' '}
              <a target="_blank" href="https://twitter.com/timlrxx">
                Timothy Lin
              </a>{' '}
              for their contribution to this minimal, lightweight, and highly customizable blog starter.
            </p> */}
            <ul>
              <li>
                <Twemoji className="!mr-2" emoji="desktop-computer" /> I am an ordinary programmer for{' '}
                <strong>web development</strong>.
              </li>
              <li>
                <Twemoji className="!mr-2" emoji="party-popper" /> I publish blogs to{' '}
                <strong>enhance my capabilities and foster personal growth.</strong>
              </li>
              <li>
                <Twemoji className="!mr-2" emoji="musical-note" /> <strong>Favorite Song:</strong> 《Yesterday》
              </li>
              <li>
                <Twemoji className="!mr-2" emoji="video-game" /> <strong>Favorite Games:</strong> Sekiro / DarkSouls III
                / WoLong / Elden Ring / Nioh 2 / Bloodborne / DarkSouls I / Rise of the Ronin / The Last of Us / God War
              </li>
            </ul>

            <p>
              <Twemoji emoji="backhand-index-pointing-right" />
              <span className="ml-2">See my </span>
              <a target="_blank" href="https://github.com/XIAOZHUXUEJAVA/piggy-blog">
                repository
              </a>{' '}
              for this blog.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

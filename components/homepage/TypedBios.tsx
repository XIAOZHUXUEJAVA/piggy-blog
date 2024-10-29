import React from 'react';
import Typed from 'typed.js';

import Twemoji from '@/components/ui/Twemoji';

const TypedBios = () => {
  const el = React.useRef(null);
  const typed = React.useRef<Typed | null>(null);

  React.useEffect(() => {
    typed.current = new Typed(el.current, {
      stringsElement: '#bios',
      typeSpeed: 40,
      backSpeed: 10,
      loop: true,
      backDelay: 1000,
    });

    return () => typed.current?.destroy();
  }, []);

  return (
    <div>
      <ul id="bios" className="hidden">
        <li>
          I live in <b className="font-medium">Ho Chi Minh, Viet Nam</b>.
        </li>
        <li>
          I was born in the beautiful <b className="font-medium">Quang Ngai</b> city.
        </li>
        <li>
          My first programming language I learned was <b className="font-medium">C++</b>.
        </li>
        <li>I love web development.</li>
        <li>
          I'm focusing on building <b className="font-medium">Social Analytics Software</b>.
        </li>
        <li>
          I work mostly with <b className="font-medium">Java/Javascript/Typescript</b> technologies.
        </li>
        <li>
          I love
          <span className="ml-1">
            <Twemoji emoji="ping-pong" />
          </span>
          and
          <span className="ml-1">
            <Twemoji emoji="motorcycle" />
          </span>
        </li>
        <li>
          I enjoy listening to pop music
          <Twemoji emoji="musical-note" />.
        </li>
        <li>
          I love playing video game <Twemoji emoji="video-game" />, LoL is my favorite one.
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  );
};

export default TypedBios;

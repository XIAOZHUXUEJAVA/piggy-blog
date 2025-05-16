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
          I live in <b className="font-medium">Ji nan, China</b>.
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
          <Twemoji emoji="musical-note" />
          G.E.M.!!!!!!
        </li>
        <li>
          I love playing Soulslike game <Twemoji emoji="video-game" />: Sekiro, DarkSouls...
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  );
};

export default TypedBios;

import { useId, type CSSProperties, type ReactNode } from 'react';
import {
  Check,
  ChevronRight,
  Code2,
  Command,
  Headphones,
  Lightbulb,
  Music2,
  Pause,
  Play,
  PencilRuler,
  Rocket,
  Repeat2,
  Sparkles,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import CareerTechIcon from '@/components/career/CareerTechIcon';
import { LifeClock } from './AboutTerminalLive';
import CruiserMotorcycle from './CruiserMotorcycle';
import SceneryImage from './SceneryImage';
import styles from './AboutPage.module.css';

type SceneCopy = Record<string, string>;

function Dots() {
  return (
    <span className={styles.miniDots}>
      <i />
      <i />
      <i />
    </span>
  );
}

function ToolkitScene({ copy }: { copy: SceneCopy }) {
  const tools = [
    { name: 'Java', caption: 'BACKEND', className: styles.stackJava },
    { name: 'Spring Boot', caption: 'SERVICES', className: styles.stackSpring },
    { name: 'TypeScript', caption: 'TYPE SAFE', className: styles.stackTypeScript },
    { name: 'React', caption: 'INTERFACES', className: styles.stackReact },
    { name: 'Next.js', caption: 'WEB APPS', className: styles.stackTypeScript },
    { name: 'MySQL', caption: 'DATABASES', className: styles.stackJava },
    { name: 'Docker', caption: 'DELIVERY', className: styles.stackReact },
    { name: 'Git', caption: 'VERSION CONTROL', className: styles.stackSpring },
  ];
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.toolkitList}>
        <div className={styles.sceneLabel}>
          <Command size={12} /> MY TOOLKIT <span>08</span>
        </div>
        <div className={styles.toolkitViewport}>
          <div className={styles.toolkitTrack}>
            {tools.map((tool) => (
              <div className={`${styles.toolRow} ${tool.className}`} key={tool.name}>
                <span className={styles.toolLogo}>
                  <CareerTechIcon name={tool.name} />
                </span>
                <span>
                  <strong>{tool.name}</strong>
                  <small>{tool.caption}</small>
                </span>
                <i />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.floatingEditor}>
        <div className={styles.miniToolbar}>
          <Dots />
          <span>hello.ts</span>
          <Code2 size={12} />
        </div>
        <div className={styles.codeBlock}>
          <p>
            <em>01</em>
            <b>const</b> developer = {'{'}
          </p>
          <p>
            <em>02</em>&nbsp; name: <span>'Piggy'</span>,
          </p>
          <p>
            <em>03</em>&nbsp; curiosity: <span>Infinity</span>,
          </p>
          <p>
            <em>04</em>&nbsp; mode: <span>'building'</span>
          </p>
          <p>
            <em>05</em>
            {'}'}
            <i className={styles.codeCaret} />
          </p>
        </div>
        <div className={styles.editorStatus}>
          <span>
            <Check size={11} /> {copy.typecheck}
          </span>
          <span>TS</span>
        </div>
      </div>
    </div>
  );
}

function ProjectsScene({ copy }: { copy: SceneCopy }) {
  const threadMaskId = `idea-thread-${useId()}`;
  const threadPath = 'M210 99 C325 36 455 62 457 111 C460 157 287 138 270 214 C263 247 336 279 422 254';

  return (
    <div className={`${styles.scene} ${styles.ideaScene}`} aria-hidden="true">
      <div className={styles.ideaBoardLabel}>
        <span>THE LITTLE IDEA BOARD</span>
        <Sparkles size={14} strokeWidth={1.4} />
      </div>
      <svg className={styles.ideaThread} viewBox="0 0 600 316" preserveAspectRatio="none" fill="none">
        <defs>
          <mask id={threadMaskId} maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="316">
            <path className={styles.ideaThreadReveal} d={threadPath} pathLength="1" />
          </mask>
        </defs>
        <path d={threadPath} mask={`url(#${threadMaskId})`} />
        <path className={styles.ideaThreadArrow} d="m412 247 12 7-9 10" />
      </svg>
      <div className={`${styles.ideaNote} ${styles.ideaSeed}`}>
        <span className={styles.noteTape} />
        <span className={styles.noteLabel}>
          <Lightbulb size={15} /> WHAT IF...
        </span>
        <strong>{copy.noteIdea}</strong>
        <p>{copy.noteIdeaDetail}</p>
        <span className={styles.noteScribble} />
      </div>
      <div className={`${styles.ideaNote} ${styles.ideaTrial}`}>
        <span className={styles.noteTape} />
        <span className={styles.noteLabel}>
          <PencilRuler size={15} /> TRY IT OUT
        </span>
        <strong>{copy.noteTry}</strong>
        <p>{copy.noteTryDetail}</p>
        <div className={styles.noteSketch}>
          <i />
          <i />
          <i />
          <span />
        </div>
      </div>
      <div className={`${styles.ideaNote} ${styles.ideaDone}`}>
        <span className={styles.noteLabel}>
          <Rocket size={15} /> MADE IT REAL
        </span>
        <strong>{copy.noteDone}</strong>
        <p>
          <Check size={13} /> {copy.noteDoneDetail}
        </p>
      </div>
    </div>
  );
}

function LifeScene() {
  return (
    <div className={`${styles.scene} ${styles.lifeScene}`} aria-hidden="true">
      <div className={styles.motorcycleCard}>
        <span className={styles.motorcycleLabel}>OUT FOR A RIDE</span>
        <CruiserMotorcycle />
      </div>
      <div className={styles.musicPlayer}>
        <div className={styles.playerTop}>
          <span>
            <Headphones size={12} /> ON REPEAT
          </span>
          <span className={styles.equalizer}>
            {Array.from({ length: 5 }, (_, i) => (
              <i key={i} style={{ '--i': i } as CSSProperties} />
            ))}
          </span>
        </div>
        <div className={styles.playerTrack}>
          <span className={styles.record}>
            <span>
              <Music2 size={15} />
            </span>
          </span>
          <div>
            <span className={styles.trackAlbum}>LA LA LAND</span>
            <strong>City of Stars</strong>
          </div>
        </div>
        <div className={styles.trackProgress}>
          <i />
        </div>
        <div className={styles.trackTimes}>
          <span>01:28</span>
          <span>04:12</span>
        </div>
        <div className={styles.playerBottom}>
          <Music2 size={13} />
          <div>
            <ChevronRight size={14} className={styles.previousTrack} />
            <span>
              <Pause size={13} fill="currentColor" className={styles.pauseIcon} />
              <Play size={13} fill="currentColor" className={styles.playIcon} />
            </span>
            <ChevronRight size={14} />
          </div>
          <Repeat2 size={13} />
        </div>
      </div>
      <LifeClock />
    </div>
  );
}

function SceneryScene({ copy }: { copy: SceneCopy }) {
  return (
    <div className={`${styles.scene} ${styles.sceneryScene}`}>
      <figure className={`${styles.sceneryPhoto} ${styles.sceneryClouds}`}>
        <span className={styles.photoTape} aria-hidden="true" />
        <SceneryImage src="/1bc2057a-2e67-4789-8cf1-be072ecd26f5.png" alt={copy.cloudsAlt} />
        <figcaption>01 / GOLDEN HOUR</figcaption>
      </figure>
      <figure className={`${styles.sceneryPhoto} ${styles.sceneryStreet}`}>
        <span className={styles.photoTape} aria-hidden="true" />
        <SceneryImage src="/cb544003-3626-439b-b24e-bf6b0395a216.png" alt={copy.streetAlt} />
        <figcaption>02 / A LITTLE POETRY</figcaption>
      </figure>
    </div>
  );
}

export default async function AboutShowcase() {
  const t = await getTranslations('AboutStudio');
  const copy = t.raw('scene') as SceneCopy;
  const cards: {
    id: string;
    index: string;
    title: string;
    description: string;
    summary: string;
    Scene: ReactNode;
    tone: string;
    animated?: boolean;
  }[] = [
    {
      id: 'toolkit',
      index: '01 / THE TOOLKIT',
      title: t('toolkitTitle'),
      description: t('toolkitDescription'),
      summary: t('toolkitSummary'),
      Scene: <ToolkitScene copy={copy} />,
      tone: styles.toneAmber,
      animated: true,
    },
    {
      id: 'projects',
      index: '02 / THE PLAYGROUND',
      title: t('projectsTitle'),
      description: t('projectsDescription'),
      summary: t('projectsSummary'),
      Scene: <ProjectsScene copy={copy} />,
      tone: styles.toneGreen,
      animated: true,
    },
    {
      id: 'life',
      index: '03 / OFF THE SCREEN',
      title: t('lifeTitle'),
      description: t('lifeDescription'),
      summary: t('lifeSummary'),
      Scene: <LifeScene />,
      tone: styles.toneClay,
      animated: true,
    },
    {
      id: 'scenery',
      index: '04 / LITTLE MOMENTS',
      title: t('sceneryTitle'),
      description: t('sceneryDescription'),
      summary: t('scenerySummary'),
      Scene: <SceneryScene copy={copy} />,
      tone: styles.toneClay,
    },
  ];
  return (
    <section id="about-explore" className={styles.explore} aria-labelledby="about-explore-title">
      <header className={styles.exploreHeader} data-about-reveal>
        <p className={styles.eyebrow}>A FEW THINGS ABOUT ME</p>
        <h2 id="about-explore-title" tabIndex={-1}>
          {t('sectionDescription')}
        </h2>
      </header>
      <div className={styles.showcaseGrid}>
        {cards.map((card, index) => (
          <article
            className={`${styles.showcaseCard} ${card.tone}`}
            key={card.id}
            data-about-scene
            data-about-reveal
            data-about-reveal-order={index}
            aria-labelledby={`about-${card.id}`}
          >
            <span className={styles.cardPaper} aria-hidden="true" />
            <header className={styles.cardHeading}>
              <p className={styles.cardIndex}>{card.index}</p>
              <h3 id={`about-${card.id}`}>{card.title}</h3>
              <p>{card.description}</p>
            </header>
            <p className="sr-only">{card.summary}</p>
            {card.animated && (
              <button
                className={styles.sceneControl}
                type="button"
                data-scene-toggle
                aria-label={t('pauseDemo', { name: card.title })}
                aria-pressed="false"
              >
                <Pause size={12} className={styles.pauseIcon} aria-hidden="true" />
                <Play size={12} className={styles.playIcon} aria-hidden="true" />
              </button>
            )}
            {card.Scene}
            <div className={styles.cardFooter}>
              <span>{['🐷', '🌷', '🧸', '🌅'][index]}</span>
              <span>
                0{index + 1} / 0{cards.length}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

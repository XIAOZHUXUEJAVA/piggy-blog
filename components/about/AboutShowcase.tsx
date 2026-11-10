import type { CSSProperties, ReactNode } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCheck,
  ChevronRight,
  Circle,
  Code2,
  Command,
  FileCode2,
  FileText,
  FolderGit2,
  GitBranch,
  GitCommitHorizontal,
  Headphones,
  Music2,
  Pause,
  Play,
  Search,
  Sprout,
  Timer,
  Terminal,
  Wand2,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import CareerTechIcon from '@/components/career/CareerTechIcon';
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
        <div className={styles.toolkitFoot}>
          <span /> {copy.toolkitFoot}
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
      <div className={styles.stackFloat}>
        <CareerTechIcon name="Next.js" />
        <span>Next.js</span>
        <span>+</span>
        <CareerTechIcon name="Tailwind CSS" />
        <span>Tailwind</span>
      </div>
    </div>
  );
}

function ProjectsScene({ copy }: { copy: SceneCopy }) {
  const files = [
    { title: 'digital-garden.mdx', detail: copy.garden, Icon: FileText },
    { title: 'little-tools.ts', detail: copy.tools, Icon: FileCode2 },
    { title: 'what-if.md', detail: copy.ideas, Icon: Wand2 },
    { title: 'reading-notes.mdx', detail: copy.readingNotes, Icon: BookOpen },
    { title: 'focus-timer.tsx', detail: copy.focusTool, Icon: Timer },
    { title: 'design-tokens.css', detail: copy.designSystem, Icon: Code2 },
    { title: 'release-notes.md', detail: copy.releaseNotes, Icon: GitCommitHorizontal },
  ];
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.projectFiles}>
        <div className={styles.sceneLabel}>
          <FolderGit2 size={12} /> WORK IN PROGRESS
        </div>
        <div className={styles.projectViewport}>
          <div className={styles.projectTrack}>
            {[...files, ...files.slice(0, 4)].map(({ title, detail, Icon }, index) => (
              <div className={styles.projectFile} key={`${title}-${index}`}>
                <span className={styles.fileIcon}>
                  <Icon size={19} strokeWidth={1.6} />
                </span>
                <span>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                </span>
                <ArrowUpRight size={13} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.previewWindow}>
        <div className={styles.miniToolbar}>
          <Dots />
          <span>piggy.dev / garden</span>
          <ArrowUpRight size={11} />
        </div>
        <div className={styles.gardenPreview}>
          <span>
            <Sprout size={15} /> THE DIGITAL GARDEN
          </span>
          <strong>{copy.previewTitle}</strong>
          <p>{copy.previewDescription}</p>
          <div>
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div className={styles.diffWindow}>
        <div>
          <GitBranch size={12} />
          <span>about-me.ts</span>
          <b>+2 −1</b>
        </div>
        <p className={styles.diffRemoved}>
          <span>−</span> someday: true
        </p>
        <p className={styles.diffAdded}>
          <span>+</span> start: 'today'
        </p>
        <p className={styles.diffAdded}>
          <span>+</span> ship(something)
        </p>
      </div>
    </div>
  );
}

function LifeScene({ copy }: { copy: SceneCopy }) {
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.readingCard}>
        <span className={styles.bookCover}>
          <BookOpen size={22} strokeWidth={1.3} />
          <small>
            THE ART
            <br />
            OF NOTICING
          </small>
        </span>
        <div>
          <span className={styles.sceneLabel}>ON MY DESK</span>
          <strong>{copy.book}</strong>
          <small>{copy.reading}</small>
          <span className={styles.readingProgress}>
            <i />
          </span>
        </div>
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
            <strong>Somewhere, Slowly</strong>
            <small>{copy.playlist}</small>
          </div>
        </div>
        <div className={styles.trackProgress}>
          <i />
        </div>
        <div className={styles.playerBottom}>
          <span>01:28 / 04:12</span>
          <div>
            <ChevronRight size={14} className={styles.previousTrack} />
            <span>
              <Pause size={12} fill="currentColor" />
            </span>
            <ChevronRight size={14} />
          </div>
          <span>↻</span>
        </div>
      </div>
      <div className={styles.focusWidget}>
        <span>
          <Timer size={12} /> {copy.focus}
        </span>
        <strong>
          24<span>:</span>38
        </strong>
        <small>
          <i /> {copy.oneThing}
        </small>
      </div>
      <div className={styles.lifeNote}>
        <Sprout size={12} /> {copy.lifeNote}
      </div>
    </div>
  );
}

function WorkflowScene({ copy }: { copy: SceneCopy }) {
  const activity = [22, 38, 16, 52, 30, 65, 42, 26, 58, 35, 72, 48, 32, 60, 44, 80, 56, 40, 68, 48, 86, 62, 42, 72];
  const steps = [
    { Icon: Circle, key: 'idea', status: '01', label: copy.idea, detail: 'notes/idea.md' },
    { Icon: FolderGit2, key: 'plan', status: '02', label: copy.plan, detail: 'read: src/components/' },
    { Icon: Code2, key: 'build', status: '03', label: copy.build, detail: 'feat: make it work' },
    { Icon: Terminal, key: 'check', status: '04', label: copy.check, detail: 'check: types · lint · a11y' },
    { Icon: CheckCheck, key: 'polish', status: '05', label: copy.polish, detail: 'fix: the little details' },
    { Icon: FileText, key: 'document', status: '06', label: copy.document, detail: 'docs: what I learned' },
    {
      Icon: GitCommitHorizontal,
      key: 'commit',
      status: '07',
      label: copy.commit,
      detail: 'git commit -m "a little better"',
    },
    { Icon: GitBranch, key: 'ship', status: '08', label: copy.ship, detail: 'git push origin main' },
  ];
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.traceWindow}>
        <div className={styles.miniToolbar}>
          <span>
            <GitBranch size={12} /> main
          </span>
          <span className={styles.traceSearch}>
            <Search size={10} /> {copy.trace}
          </span>
          <span>⌘ K</span>
        </div>
        <div className={styles.activityGraph}>
          {activity.map((height, i) => (
            <i key={i} style={{ '--bar': `${height}%`, '--i': i } as CSSProperties} />
          ))}
        </div>
        <div className={styles.traceViewport}>
          <div className={styles.traceSteps}>
            {steps.map(({ Icon, key, status, label, detail }, index) => (
              <div className={styles.traceStep} key={key} style={{ '--i': index } as CSSProperties}>
                <span className={styles.stepNumber}>{status}</span>
                <span className={styles.stepIcon}>
                  <Icon size={14} />
                </span>
                <span>
                  <strong>{label}</strong>
                  <small>{detail}</small>
                </span>
                <Check size={13} className={styles.stepCheck} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.traceDetail}>
          <div className={styles.traceDetailHeading}>
            <Terminal size={12} />
            <span>{copy.commitDetails}</span>
            <span>×</span>
          </div>
          <p className={styles.traceDetailCommand}>git commit</p>
          <dl>
            <dt>{copy.branch}</dt>
            <dd>main</dd>
            <dt>{copy.changed}</dt>
            <dd>3 files</dd>
            <dt>{copy.result}</dt>
            <dd>
              <Check size={10} /> {copy.complete}
            </dd>
          </dl>
          <div className={styles.traceDetailDiff}>
            <span>+ 24</span>
            <span>− 8</span>
          </div>
        </div>
        <div className={styles.traceFooter}>
          <span>
            <i /> {copy.iterating}
          </span>
          <span>8 steps · 1 idea</span>
        </div>
      </div>
      <div className={styles.shipToast}>
        <span>
          <Check size={14} />
        </span>
        <div>
          <strong>{copy.shipped}</strong>
          <small>small steps. every day.</small>
        </div>
        <GitCommitHorizontal size={16} />
      </div>
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
  }[] = [
    {
      id: 'toolkit',
      index: '01 / THE TOOLKIT',
      title: t('toolkitTitle'),
      description: t('toolkitDescription'),
      summary: t('toolkitSummary'),
      Scene: <ToolkitScene copy={copy} />,
      tone: styles.toneAmber,
    },
    {
      id: 'projects',
      index: '02 / THE PLAYGROUND',
      title: t('projectsTitle'),
      description: t('projectsDescription'),
      summary: t('projectsSummary'),
      Scene: <ProjectsScene copy={copy} />,
      tone: styles.toneGreen,
    },
    {
      id: 'life',
      index: '03 / OFF THE SCREEN',
      title: t('lifeTitle'),
      description: t('lifeDescription'),
      summary: t('lifeSummary'),
      Scene: <LifeScene copy={copy} />,
      tone: styles.toneClay,
    },
    {
      id: 'workflow',
      index: '04 / THE PROCESS',
      title: t('workflowTitle'),
      description: t('workflowDescription'),
      summary: t('workflowSummary'),
      Scene: <WorkflowScene copy={copy} />,
      tone: styles.toneTeal,
    },
  ];
  return (
    <section id="about-explore" className={styles.explore} aria-labelledby="about-explore-title">
      <header className={styles.exploreHeader} data-about-reveal>
        <p className={styles.eyebrow}>A FEW THINGS ABOUT ME</p>
        <h2 id="about-explore-title">
          {t('sectionTitle')}
          <br />
          <span>{t('sectionSubtitle')}</span>
        </h2>
        <p>{t('sectionDescription')}</p>
      </header>
      <div className={styles.showcaseGrid}>
        {cards.map((card, index) => (
          <article
            className={`${styles.showcaseCard} ${card.tone}`}
            key={card.id}
            data-about-scene
            data-about-reveal
            aria-labelledby={`about-${card.id}`}
          >
            <header className={styles.cardHeading}>
              <p className={styles.cardIndex}>{card.index}</p>
              <h3 id={`about-${card.id}`}>{card.title}</h3>
              <p>{card.description}</p>
            </header>
            <p className="sr-only">{card.summary}</p>
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
            {card.Scene}
            <div className={styles.cardFooter}>
              <span>
                <i /> {t('cardFooter')}
              </span>
              <span>0{index + 1} / 04</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

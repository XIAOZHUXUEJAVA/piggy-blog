import Image from 'next/image';
import { ArrowUpRight, Github, Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Authors } from 'contentlayer/generated';
import { Link } from '@/i18n/navigation';
import { LocalTime, TerminalTheme } from './AboutTerminalLive';
import styles from './AboutPage.module.css';
import AboutMotion from './AboutMotion';
import AboutShowcase from './AboutShowcase';

interface AboutProfileProps {
  author: CoreContent<Authors>;
  postCount: number;
}

function Prompt({ command }: { command?: string }) {
  return (
    <p className={styles.prompt} aria-hidden="true">
      <span className={styles.user}>piggy</span>
      <span className={styles.at}>@</span>
      <span className={styles.host}>blog</span>
      <span className={styles.path}>~/about</span>
      <span className={styles.dollar}>$</span>
      {command ? <span className={styles.command}>{command}</span> : <span className={styles.caret} />}
    </p>
  );
}

export default async function AboutProfile({ author, postCount }: AboutProfileProps) {
  const t = await getTranslations('AboutProfile');
  const details = [
    { label: t('roleLabel'), value: t('role') },
    { label: t('focusLabel'), value: 'Java · TypeScript · AI' },
    { label: t('stackLabel'), value: 'Spring Boot · React · Next.js' },
    { label: t('locationLabel'), value: t('location') },
    { label: t('timeLabel'), value: <LocalTime /> },
    { label: t('writingLabel'), value: t('writing') },
    {
      label: t('postsLabel'),
      value: (
        <Link href="/blog" className={styles.inlineLink}>
          {t('postsCount', { count: postCount })}
        </Link>
      ),
    },
    { label: t('themeLabel'), value: <TerminalTheme /> },
  ];

  return (
    <AboutMotion className={styles.about}>
      <div className={styles.terminalStage} data-terminal-stage>
        <div className={styles.window} data-terminal-surface aria-labelledby="profile-name">
          <div className={styles.titleBar} aria-hidden="true">
            <span className={styles.windowControls}>
              <span />
              <span />
              <span />
            </span>
            <span className={styles.windowTitle}>piggy@blog: ~/about</span>
            <span className={styles.shell}>zsh</span>
          </div>

          <div className={styles.windowBody}>
            <aside className={styles.profile} aria-label={t('contactLabel')}>
              <div className={styles.avatarFrame}>
                <Image
                  src={author.avatar || '/static/images/my-avatar.jpg'}
                  alt={t('avatarAlt', { name: author.name })}
                  width={160}
                  height={160}
                  sizes="(max-width: 639px) 88px, 160px"
                  className={styles.avatar}
                  priority
                />
              </div>
              <p className={styles.handle}>@piggy</p>
              <p className={styles.profileNote}>{t('profileNote')}</p>

              <div className={styles.socials}>
                {author.github && (
                  <a
                    href={author.github}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('githubLabel')}
                    title="GitHub"
                  >
                    <Github size={18} strokeWidth={1.6} aria-hidden="true" />
                  </a>
                )}
                {author.email && (
                  <a
                    href={`mailto:${author.email}`}
                    className={styles.socialLink}
                    aria-label={t('emailLabel')}
                    title={t('emailLabel')}
                  >
                    <Mail size={18} strokeWidth={1.6} aria-hidden="true" />
                  </a>
                )}
              </div>

              <Link href="/blog" className={styles.readLink}>
                {t('readPosts')}
                <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </aside>

            <div className={styles.terminal}>
              <Prompt command="fastfetch" />

              <div className={styles.identity}>
                <h1 id="profile-name" className={styles.name}>
                  {author.name}
                  <span className={styles.nameDot}>.</span>
                </h1>
                <p className={styles.tagline}>{t('tagline')}</p>
              </div>

              <dl className={styles.details}>
                {details.map(({ label, value }) => (
                  <div className={styles.detail} key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              <div className={styles.palette} aria-hidden="true">
                {Array.from({ length: 8 }, (_, index) => (
                  <span key={index} />
                ))}
              </div>

              <Prompt />
            </div>
          </div>
        </div>
        <div className={styles.windowCaption}>
          <span>FASTFETCH / PIGGY OS</span>
        </div>
      </div>

      <AboutShowcase />
    </AboutMotion>
  );
}

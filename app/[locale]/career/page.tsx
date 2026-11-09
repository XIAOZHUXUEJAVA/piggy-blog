import { ArrowUpRight, BriefcaseBusiness, Clock3, FolderGit2, Github, Layers3, Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { allAuthors } from 'contentlayer/generated';
import { genPageMetadata } from 'app/seo';
import { Link } from '@/i18n/navigation';
import careerData from '@/data/careerData';
import CareerRuler from '@/components/career/CareerRuler';
import CareerHistory from '@/components/career/CareerHistory';
import CareerMotion from '@/components/career/CareerMotion';
import { formatDuration, workingMonths } from '@/utils/career';
import styles from '@/components/career/CareerPage.module.css';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Career' });
  return genPageMetadata({ title: t('title'), description: t('description') });
}

// Refresh ongoing experience durations without turning a mostly static page into a client component.
export const revalidate = 86400;

export default async function CareerPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'en' ? 'en' : 'zh';
  const t = await getTranslations({ locale, namespace: 'Career' });
  const now = new Date();
  const author = allAuthors.find((entry) => entry.slug === 'default');
  const experienceMonths = workingMonths(careerData, now);
  const stats = [
    {
      value: formatDuration(experienceMonths, locale),
      label: t('stats.experience'),
      eyebrow: 'EXPERIENCE',
      Icon: Clock3,
      duration: experienceMonths,
    },
    {
      value: new Set(careerData.filter((entry) => entry.kind === 'work').map((entry) => entry.organization.en)).size,
      label: t('stats.companies'),
      eyebrow: 'TEAMS',
      Icon: BriefcaseBusiness,
    },
    {
      value: new Set(
        careerData.flatMap((entry) =>
          entry.highlights.flatMap((highlight) => (highlight.projectId ? [highlight.projectId] : []))
        )
      ).size,
      label: t('stats.projects'),
      eyebrow: 'PROJECTS',
      Icon: FolderGit2,
    },
    {
      value: new Set(careerData.flatMap((entry) => entry.stack)).size,
      label: t('stats.technologies'),
      eyebrow: 'TOOLKIT',
      Icon: Layers3,
    },
  ];

  return (
    <CareerMotion className={styles.page}>
      <header className={styles.pageHeader} data-career-reveal>
        <p className={styles.eyebrow}>
          <span aria-hidden="true">~</span>/career
        </p>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>
            {t('title')}
            <span>.</span>
          </h1>
          <span className={styles.sampleBadge}>{t('sampleBadge')}</span>
        </div>
        <p className={styles.description}>{t('description')}</p>
      </header>

      <ul className={styles.stats} aria-label={t('statsLabel')}>
        {stats.map((stat, index) => (
          <li className={styles.stat} key={stat.eyebrow} data-career-reveal data-career-delay={index * 70}>
            <span className={styles.statTop} aria-hidden="true">
              <span className={styles.statEyebrow}>{stat.eyebrow}</span>
              <stat.Icon className={styles.statIcon} size={17} strokeWidth={1.5} />
            </span>
            <span className={styles.statValue}>
              {stat.duration !== undefined ? (
                <span className={styles.statDuration} aria-hidden="true">
                  <span data-career-count={Math.floor(stat.duration / 12)}>{Math.floor(stat.duration / 12)}</span>
                  <span className={styles.statUnit}>{locale === 'zh' ? '年' : 'yr'}</span>
                  <span data-career-count={stat.duration % 12}>{stat.duration % 12}</span>
                  <span className={styles.statUnit}>{locale === 'zh' ? '个月' : 'mo'}</span>
                </span>
              ) : (
                <span aria-hidden="true" data-career-count={stat.value}>
                  {stat.value}
                </span>
              )}
              <span className="sr-only">{stat.value}</span>
            </span>
            <span className={styles.statLabel}>{stat.label}</span>
          </li>
        ))}
      </ul>

      <CareerRuler entries={careerData} now={now} locale={locale} />
      <CareerHistory entries={careerData} now={now} locale={locale} />

      <section className={styles.contact} aria-labelledby="career-contact-title" data-career-reveal>
        <div>
          <p className={styles.command}>
            <span>$</span> echo hello
          </p>
          <h2 id="career-contact-title">{t('contactTitle')}</h2>
          <p className={styles.contactDescription}>{t('contactDescription')}</p>
        </div>
        <div className={styles.contactLinks}>
          {author?.github && (
            <a className={styles.primaryLink} href={author.github} target="_blank" rel="noopener noreferrer">
              <Github size={16} strokeWidth={1.6} aria-hidden="true" /> GitHub
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
          {author?.email && (
            <a className={styles.contactLink} href={`mailto:${author.email}`}>
              <Mail size={16} strokeWidth={1.6} aria-hidden="true" /> {t('email')}
            </a>
          )}
          <Link className={styles.contactLink} href="/about">
            {t('about')} <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <p className={styles.sampleNote}>{t('sampleNote')}</p>
    </CareerMotion>
  );
}

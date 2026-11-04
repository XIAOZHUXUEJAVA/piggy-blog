import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Authors } from 'contentlayer/generated';
import styles from './AboutPage.module.css';

interface AboutProfileProps {
  author: CoreContent<Authors>;
}

export default async function AboutProfile({ author }: AboutProfileProps) {
  const t = await getTranslations('AboutProfile');

  return (
    <section className={styles.profile} aria-labelledby="profile-name">
      <Image
        src={author.avatar || '/static/images/my-avatar.jpg'}
        alt={t('avatarAlt', { name: author.name })}
        width={112}
        height={112}
        className={styles.avatar}
        priority
      />

      <div className={styles.introduction}>
        <h1 id="profile-name" className={styles.name}>
          {author.name}
        </h1>
        <p className={styles.bio}>{t('intro')}</p>

        <dl className={styles.details}>
          <div className={styles.detail}>
            <dt>{t('locationLabel')}</dt>
            <dd>{t('location')}</dd>
          </div>
          {author.email && (
            <div className={styles.detail}>
              <dt>{t('emailLabel')}</dt>
              <dd>
                <a href={`mailto:${author.email}`} className={styles.email}>
                  {author.email}
                </a>
              </dd>
            </div>
          )}
          <div className={styles.detail}>
            <dt>{t('startedLabel')}</dt>
            <dd>2023</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

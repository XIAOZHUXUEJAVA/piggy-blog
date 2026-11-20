import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import siteMetadata from '@/data/siteMetadata';

export default function CommentLink() {
  const t = useTranslations('Post');
  if (!siteMetadata.comments?.provider) return null;

  return (
    <a
      href="#comment"
      className="inline-flex min-h-11 items-center gap-2 rounded-sm text-xs text-paper-muted transition-colors hover:text-paper-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper-accent"
    >
      <MessageCircle size={14} aria-hidden="true" />
      {t('scrollToComments')}
    </a>
  );
}

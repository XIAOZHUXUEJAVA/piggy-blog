import { Code2 } from 'lucide-react';
import { careerTechIcons } from '@/data/careerTechIcons';

export default function CareerTechIcon({ name, className }: { name: string; className?: string }) {
  const icon = careerTechIcons[name];
  if (!icon) {
    return <Code2 className={className} size={14} aria-hidden="true" />;
  }
  return (
    <svg className={className} viewBox={icon.viewBox} width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

import { Code2, Sparkles } from 'lucide-react';
import { careerTechIcons } from '@/data/careerTechIcons';

export default function CareerTechIcon({ name, className }: { name: string; className?: string }) {
  const icon = careerTechIcons[name];
  if (!icon) {
    const Fallback = name === 'AI SDK' ? Sparkles : Code2;
    return <Fallback className={className} size={14} aria-hidden="true" />;
  }
  return (
    <svg className={className} viewBox={icon.viewBox} width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

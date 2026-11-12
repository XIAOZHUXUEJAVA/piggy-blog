import type { CSSProperties } from 'react';
import {
  BriefcaseBusiness,
  Check,
  Code2,
  GraduationCap,
  GitBranch,
  GitCommitHorizontal,
  GitMerge,
  Search,
  Terminal,
} from 'lucide-react';
import styles from './CareerProcess.module.css';

type SceneCopy = Record<string, string>;

export interface CareerCommitPreview {
  id: string;
  kind: 'work' | 'education' | 'project' | 'merge';
  label: string;
  message: string;
  date: string;
  branch: string;
  hash: string;
  stack: string[];
}

const icons = { work: BriefcaseBusiness, education: GraduationCap, project: Code2, merge: GitMerge };

export default function WorkflowScene({
  commits,
  copy,
  footer,
}: {
  commits: CareerCommitPreview[];
  copy: SceneCopy;
  footer: string;
}) {
  const activity = [22, 38, 16, 52, 30, 65, 42, 26, 58, 35, 72, 48, 32, 60, 44, 80, 56, 40, 68, 48, 86, 62, 42, 72];
  const latest = commits[0];
  return (
    <div
      className={styles.scene}
      aria-hidden="true"
      style={{ '--trace-travel': `${Math.max(0, commits.length - 4) * 39}px` } as CSSProperties}
    >
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
            {commits.map((commit, index) => {
              const Icon = icons[commit.kind];
              return (
                <div className={styles.traceStep} key={commit.id} style={{ '--i': index } as CSSProperties}>
                  <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.stepIcon}>
                    <Icon size={14} />
                  </span>
                  <span title={commit.date + ' · ' + commit.label + ' · ' + commit.message}>
                    <strong>{commit.label}</strong>
                    <small>
                      {commit.date} · {commit.message}
                    </small>
                  </span>
                  <Check size={13} className={styles.stepCheck} />
                </div>
              );
            })}
          </div>
        </div>
        {latest && (
          <div className={styles.traceDetail}>
            <div className={styles.traceDetailHeading}>
              <Terminal size={12} />
              <span>{copy.commitDetails}</span>
              <span>×</span>
            </div>
            <p className={styles.traceDetailCommand} title={latest.label}>
              {latest.label}
            </p>
            <dl>
              <dt>{copy.commit}</dt>
              <dd>{latest.hash}</dd>
              <dt>{copy.date}</dt>
              <dd>{latest.date}</dd>
              <dt>{copy.branch}</dt>
              <dd>{latest.branch}</dd>
            </dl>
            <div className={styles.traceDetailStack}>
              {latest.stack.slice(0, 3).map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>
        )}
        <div className={styles.traceFooter}>
          <span>
            <i /> {copy.iterating}
          </span>
          <span>{footer}</span>
        </div>
      </div>
      <div className={styles.shipToast}>
        <span>
          <Check size={14} />
        </span>
        <div>
          <strong>{copy.shipped}</strong>
          <small>{copy.nextChapter}</small>
        </div>
        <GitCommitHorizontal size={16} />
      </div>
    </div>
  );
}

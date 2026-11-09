import type { HTMLAttributes } from 'react';
import { cx } from '@/utils/cx';
import styles from './Badge.module.css';

type Tone = 'primary' | 'success' | 'danger' | 'warning' | 'neutral';

interface BadgeProbs extends HTMLAttributes<HTMLSpanElement> {
  /*alles, was man span kann */
  tone?: Tone;
}

export function Badge({ tone = 'neutral', className, ...rest }: BadgeProbs) {
  return <span className={cx(styles.badge, styles[tone], className)} {...rest} />;
}

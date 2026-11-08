import type { HTMLAttributes } from 'react';
import { cx } from '@/utils/cx';
import styles from './Card.module.css';

interface CardProbs extends HTMLAttributes<HTMLDivElement> {
  /*standatdmäßig algemeine innenstadt. für Tabelle padded= false*/
  padded?: boolean;
}

export function Card({ padded = true, className, ...rest }: CardProbs) {
  return <div className={cx(styles.card, padded && styles.padded, className)} {...rest} />;
}

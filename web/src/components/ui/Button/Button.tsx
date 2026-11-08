import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';
import { cx } from '@/utils/cx';

type Variant = 'primary' | 'secondary' | 'danger';
type Size = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = 'primary',
  size = 'md',

  type = 'button',
  className,

  ...rest
}: ButtonProps) {
  const classes = cx(styles.button, styles[variant], styles[size], className);
  return <button type={type} className={classes} {...rest} />;
}

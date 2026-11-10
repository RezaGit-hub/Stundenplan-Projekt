import type { InputHTMLAttributes } from "react";
import { cx } from "@/utils/cx";
import styles from './SearchInput.module.css';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  /*omit<typ> nimmt eine Typ und entfernt bestimmte Eigentschaften daraus, hier value und onChange, dann definieren wir es,
  zum beispiel hier onChange liefert direkt einen string statt <event Objekt */
  value :string;
  onChange: (value: string) => void;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Suchen...',
  className,
  ...rest
}: SearchInputProps){
  return(
    <div className={cx(styles.wrapper, className)}>
      {/* SVG, als Lupe, statt ein Bild, currentColor nimmt die textFarbe, aria-hidden verstckt sie vor screenreadern */}
      <svg
        className={styles.icon}
        width= "16"
        height= "16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 201-3.5-3.5" />
      </svg>
      <input
        type="search"
        className={styles.input}
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(event) => onChange(event.target.value)}
        {...rest}
      />
    </div>
  );
}

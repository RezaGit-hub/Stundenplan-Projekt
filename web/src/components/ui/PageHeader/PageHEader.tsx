import type { ReactNode } from "react";
import styles from './PageHeader.module.css';

interface PageHeaderprobs {
  title: string;

  description?: string;    /* ?: heißt dass alle Pages könnten Beschreibung hben oder <keine> */

  actions?: ReactNode;      /* ReactNode, enthält alles das React machen kann, in rechte Seite von Page kann alles enthalten sein, button Tabelle text... */
}

export function PageHeader({title, description, actions}: PageHeaderprobs){
  return(
    <header className= {styles.header}>
      <div>
        <h1 className={styles.title}>{title}</h1>    /*pro Seite nur eine h1 */
        {description && <p className= {styles.description}>{description}</p>}   /* description && rendern nur wenn description einen text hat */
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}

    </header>
  )
}

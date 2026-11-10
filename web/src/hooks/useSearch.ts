import { useState } from "react";

export function useSearch<T>(items: T[], getSearchText: (item: T)=> string){
  /* <T> ist ein Placeholder, für den Typ der Listenanträge, wo nach einen bestimmte text gesucht sein, wird es durch T ersetzen*/

  const [query, setQuery] = useState('');  /* es wird benutzt in jeder Seite, und wo es aufgerufen wird, bekommt ihren eigenen*/

  const needle = query.trim().toLowerCase(); /*trim entfernt die Leerzeichen und tolowercase macht alle in Kleine*/

  const results =
    needle === ''                   /*leerzeichen zeigt alle Ergebnisse ohne Filter*/
      ?items
      : items.filter((item) => getSearchText(item).toLowerCase().includes(needle));

  return {query, setQuery, results}

}

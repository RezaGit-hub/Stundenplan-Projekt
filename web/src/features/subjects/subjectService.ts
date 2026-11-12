import { subjects } from '@/mocks/subjects';
import { delay } from '@/utils/delay';
import type { Subject } from './types';

export async function getSubjects(): Promise<Subject[]> {
  /*durch async , wird von Funktion immer eine Promise zurückgegben
Promise sagt, dass immer eine Liste von Fächer dahin kommen */
  await delay; /* await pausiert erstmal bis wann Versprechen volständig sein */

  return structuredClone(
    subjects,
  ); /*structuredClone liefert eine Kopie von Mock Daten, so das Orginal Mock-Daten nie Kapuut wird */
}

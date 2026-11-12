import type { Teacher } from './types';
import { teachers } from '@/mocks/teachers';
import { delay } from '@/utils/delay';

export async function getTeachers(): Promise<Teacher[]> {
  await delay;

  return structuredClone(teachers);
}

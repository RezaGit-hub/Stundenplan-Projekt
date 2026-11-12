export type Employment = 'full-time' | 'part-time';

export interface Teacher {
  id: string;
  name: string;
  abbreviation: string;
  employment: Employment;

  weeklyHours: number;

  subjectIds: string[];

  isActive: boolean;
}

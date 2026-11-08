type ClassValue = string | false | undefined | null ;

export function cx(...parts : ClassValue[]): string{
  return parts.filter(Boolean).join(' ');
}

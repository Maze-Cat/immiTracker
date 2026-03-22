export function formatPriorityDate(date: string): string {
  if (date === 'C') return 'Current';
  if (date === 'U') return 'Unavailable';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

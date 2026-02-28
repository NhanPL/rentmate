import moment from 'moment';

export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// hoặc
export function formatNumberIntl(num: number): string {
  return new Intl.NumberFormat('de-DE').format(num);
}

export function formatDate(date: Date | string): string {
  return moment(new Date(date)).format('YYYY-MM-DD');
}

export function getDisplayName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  return parts[parts.length - 1];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: readonly K[]): Omit<T, K> {
  const clone = { ...obj };
  for (const key of keys) {
    delete clone[key];
  }
  return clone;
}

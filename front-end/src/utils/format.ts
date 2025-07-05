import moment from 'moment';

export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// hoặc
export function formatNumberIntl(num: number): string {
  return new Intl.NumberFormat('de-DE').format(num);
}

export function formatDate(date: Date | string): string {
  return moment(date).format('DD/MM/YYYY');
}

export function getDisplayName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  return parts[parts.length - 1]; // Tên cuối
}

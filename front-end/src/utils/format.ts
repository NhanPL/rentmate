export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// hoặc
export function formatNumberIntl(num: number): string {
  return new Intl.NumberFormat('de-DE').format(num);
}

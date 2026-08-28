export function formatDateTime(iso: string, locale = "es") {
  return new Date(iso).toLocaleString(locale);
}

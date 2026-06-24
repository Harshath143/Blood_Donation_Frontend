import { format, parseISO, formatDistanceToNow } from 'date-fns';

export const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};

export const formatDistanceString = (km) => {
  return `${km.toFixed(1)} km`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
    return format(date, 'MMM dd, yyyy');
  } catch (e) {
    return dateStr;
  }
};

export const formatTimeAgo = (dateStr) => {
  if (!dateStr) return '';
  try {
    const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (e) {
    return '';
  }
};

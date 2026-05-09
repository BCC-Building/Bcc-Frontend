import { API_BASE_URL } from './constants';

const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');

export const getMediaUrl = (url) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url) || url.startsWith('blob:') || url.startsWith('data:')) {
    return url;
  }

  const normalised = url.replaceAll('\\', '/');
  if (normalised.startsWith('/')) {
    return `${API_ORIGIN}${normalised}`;
  }

  return `${API_ORIGIN}/${normalised}`;
};

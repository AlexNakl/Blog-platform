import { format, parseISO } from 'date-fns';

import iconFavorited from '../img/favorited.svg';
import iconUnfavorited from '../img/unfavorited.svg';

export const formatDate = (date) => {
  if (date) {
    return format(parseISO(date), 'MMMM d, yyyy');
  }
  return 'NA';
};

export const getIcon = (liked) => {
  if (liked) {
    return iconFavorited;
  }
  return iconUnfavorited;
};

export const shortenText = (str, maxLen = 150) => {
  const separator = ' ';
  if (str.length <= maxLen) return str;
  return `${str.substr(0, str.lastIndexOf(separator, maxLen))} ...`;
};

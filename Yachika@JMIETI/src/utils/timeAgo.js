const MINUTE = 60;
const HOUR = 60 * 60;
const DAY = 60 * 60 * 24;
const MONTH = 60 * 60 * 24 * 30;
const YEAR = 60 * 60 * 24 * 365;

export function formatTimeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffSeconds = Math.floor((now - date) / 1000);

  if (diffSeconds < MINUTE) {
    return diffSeconds <= 10 ? "just now" : `${diffSeconds} secs ago`;
  } else if (diffSeconds < HOUR) {
    const diff = Math.floor(diffSeconds / MINUTE);
    return `${diff} min${diff > 1 ? 's' : ''} ago`;
  } else if (diffSeconds < DAY) {
    const diff = Math.floor(diffSeconds / HOUR);
    return `${diff} hr${diff > 1 ? 's' : ''} ago`;
  } else if (diffSeconds < MONTH) {
    const diff = Math.floor(diffSeconds / DAY);
    return `${diff} day${diff > 1 ? 's' : ''} ago`;
  } else if (diffSeconds < YEAR) {
    const diff = Math.floor(diffSeconds / MONTH);
    return `${diff} month${diff > 1 ? 's' : ''} ago`;
  } else {
    const diff = Math.floor(diffSeconds / YEAR);
    return `${diff} year${diff > 1 ? 's' : ''} ago`;
  }
}
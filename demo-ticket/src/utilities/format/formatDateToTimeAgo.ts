const formatTimeToMinutesAgo = (time: string) => {
  const now = new Date();
  const then = new Date(time);
  const diff = now.getTime() - then.getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    return `${hours} hour${hours !== 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(minutes / 1440);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
};

export default formatTimeToMinutesAgo;
export const timeAgo = (date: Date): string => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const interval in intervals) {
    const time = Math.floor(seconds / intervals[interval]);
    if (time > 1) {
      return `${time} ${interval}s ago`;
    } else if (time === 1) {
      return `${time} ${interval} ago`;
    }
  }

  return "just now";
};

export const getInitialsFromAllWords = (fullName: string): string => {
  const nameParts = fullName.trim().split(" ");
  const initials = nameParts.map((part) => part[0].toUpperCase()).join("");
  return initials;
};

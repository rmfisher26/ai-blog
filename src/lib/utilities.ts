export const formatCustomDate = (date: Date): string => {
  // Check if the date is valid
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "...";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};
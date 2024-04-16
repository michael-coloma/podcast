export const convertFormatZuluToFormatDateView = (
  formatZulu: string
): string => {
  // Print date with format: dd/mm/yyyy hh:mm
  const formatDate = (d: Date, separator = " "): string | null => {
    const pad = (value: number): string => {
      return value.toString().padStart(2, "0");
    };

    const n = [
      d.getDate(),
      d.getMonth() + 1,
      d.getFullYear(),
      d.getHours(),
      d.getMinutes(),
    ];

    return `${pad(n[0])}/${pad(n[1])}/${n[2]}${separator}${pad(n[3])}:${pad(n[4])}`;
  };

  const formatZonedTimestamp = (
    date: string | undefined | null,
    separator = " "
  ): string | null => {
    if (!date) {
      return null;
    }
    return formatDate(new Date(date), separator);
  };

  const isFormatZulu = () => {
    const formatZuluRegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

    return formatZuluRegExp.test(formatZulu);
  };

  if (isFormatZulu()) {
    return formatZonedTimestamp(formatZulu) || formatZulu;
  }

  return formatZulu;
};

export const convertMilisecondstoFormatHoursMinutes = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const formatHours = hours < 10 ? "0" + hours : hours;
  const formatMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${formatHours}:${formatMinutes}`;
};

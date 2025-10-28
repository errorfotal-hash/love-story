export type TimeParts = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

export const getTimeParts = (startDate: Date): TimeParts => {
  const now = new Date();
  const totalMs = now.getTime() - startDate.getTime();
  const totalSeconds = Math.max(Math.floor(totalMs / 1000), 0);

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (value: number) => value.toString().padStart(2, "0");

  return {
    days: days.toString(),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds)
  };
};

export const formatTime = (date) => {
  if (!date) return "";

  const d = new Date(date);

  if (isNaN(d.getTime())) return "";

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}:00`;
};

export const formatTimeShort = (date) => {
  if (!date) return "";

  const d = new Date(date);

  if (isNaN(d.getTime())) return "";

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};
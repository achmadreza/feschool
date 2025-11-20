export const formatDate = (date) => {
  return Intl.DateTimeFormat("ID-id", { dateStyle: "medium" }).format(date);
};

export const formatDate = (date?: Date) => {
  if (!date) return "No Date Available";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

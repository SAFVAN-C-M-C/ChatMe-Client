import moment from "moment";

// Utility to format the date for the chat list
export const formateDateForChat = (date: string | Date): string => {
  const inputDate = moment(date);
  const now = moment();

  const diffInSeconds = now.diff(inputDate, "seconds");
  const diffInMinutes = now.diff(inputDate, "minutes");
  const diffInHours = now.diff(inputDate, "hours");

  if (diffInSeconds < 60) {
    return `now`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  } else if (diffInHours < 24 && now.isSame(inputDate, "day")) {
    return inputDate.format("h:mm A");
  } else if (now.subtract(1, "day").isSame(inputDate, "day")) {
    return "Yesterday";
  } else {
    return inputDate.format("DD/MM/YYYY");
  }
};

export const dateUtils = (stakedDate: number) => {
  var currentDate = new Date(stakedDate);

  var date = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var hours = currentDate.getHours();
  var min = currentDate.getMinutes();

  var minutes = min < 10 ? "0" + min : min;

  var hour = hours < 10 ? "0" + hours : hours;
  var months = month < 10 ? "0" + month : month;
  var dates = date < 10 ? "0" + date : date;
  var dateString =
    year + "." + months + "." + dates + "  " + hour + ":" + minutes;
  return dateString;
};

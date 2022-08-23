const weekNames = [
    "Monday",
    "Tuesday",
    "Webnesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const stringToDate = (str) => {
    var strDate = "";
    var d = "";
    for (var item = 0; item < str.length; item++) {
        if (str[item] === "/") {
            if (item + 1 < str.length) d = "-" + strDate + d;
            strDate = "";
        } else strDate = strDate + str[item];
    }
    d = strDate + d;
    return d;
};

const dateToString = (oldValue) => {
    var dateStr =
        new Date(oldValue).getFullYear() +
        "-" +
        (new Date(oldValue).getMonth() + 1) +
        "-" +
        new Date(oldValue).getDate();
    return dateStr;
};

const parseDateTimeForSQL = (value) => {
    var newValue = new Date(value).toISOString().slice(0, 19).replace("T", " ");
    return newValue;
};

const parseShortDate = (currentDate) => {
    if (currentDate) {
        var cd = new Date(currentDate);
        var shortDate = `${monthNames[cd.getMonth()].substr(0, 3)} ${cd.getDate()} ${cd.getFullYear()}`;
        return shortDate;
    }
    return "";
};

const parseShortDateTime = (currentDate) => {
    if (currentDate) {
      var cd = new Date(currentDate);
      var shortDateTime = `${monthNames[cd.getMonth()].substr(0, 3)} ${cd.getDate()} ${cd.getFullYear()} ${cd.getHours()} : ${ cd.getMinutes()}`;
      return shortDateTime; 
    }
    return "";
};

const compareDate = (rDateStr, lDateStr) => {
    var rDate = new Date(rDateStr);
    var lDate = new Date(lDateStr);
    if (
        rDate.getDay() === lDate.getDay() &&
        rDate.getMonth() === lDate.getMonth() &&
        rDate.getFullYear() === lDate.getFullYear()
    )
        return "equal";
    if (rDate > lDate) return "bigger";
    if (rDate < lDate) return "smaller";
    return "";
};

const calculate = (fromDate,toDate) => {
    let from = new Date(fromDate);
    let to = new Date(toDate);
    const diffTime = Math.abs(from - to);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export default {
    stringToDate,
    dateToString,
    parseShortDate,
    parseDateTimeForSQL,
    compareDate,
    parseShortDateTime,
    calculate
};

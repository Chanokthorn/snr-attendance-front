export function isArray(value) {
  return value && typeof value === "object" && value.constructor === Array;
}

export const sortByStartSchedule = (a, b) => {
  var dateA = new Date(a.m_start_schedule),
    dateB = new Date(b.m_start_schedule);
  return dateA - dateB;
};

export const toDatetimeLocal = data => {
  var date = data,
    ten = function(i) {
      return (i < 10 ? "0" : "") + i;
    },
    YYYY = date.getFullYear(),
    MM = ten(date.getMonth() + 1),
    DD = ten(date.getDate()),
    HH = ten(date.getHours()),
    II = ten(date.getMinutes()),
    SS = ten(date.getSeconds());
  return YYYY + "-" + MM + "-" + DD + "T" + HH + ":" + II + ":" + SS;
};

export function getBase64(file, cb) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function() {
    cb(reader.result);
  };
  reader.onerror = function(error) {
    // console.log("Error: ", error);
  };
}

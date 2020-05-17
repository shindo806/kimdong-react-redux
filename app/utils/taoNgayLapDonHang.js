var moment = require('moment');

function taoNgayLapDonHang() {
  let ngaylapdonhang = "";
  let currentDay = moment().get('Date');
  let currentMonth = moment().get('month') + 1;
  let currentYear = moment().get('year');
  if (currentDay < 10) {
    currentDay = "0" + currentDay;
  }
  if (currentMonth < 10) {
    currentMonth = "0" + currentMonth;
  }
  ngaylapdonhang = `${currentDay.toString()}/${currentMonth.toString()}/${currentYear.toString()}`;

  return ngaylapdonhang;
}

export {
  taoNgayLapDonHang
}
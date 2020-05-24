import moment from 'moment';

import { initialMaSoDonHang } from './masodonhang';

function checkNewDay() {
  let currentDay = moment()
    .get('Date')
    .toString();

  if (currentDay < 10) {
    currentDay = `0${currentDay}`;
  }

  const masodonhangArray = JSON.parse(localStorage.getItem('masodonhang'));
  // detect first time the app run on user computer
  if (masodonhangArray === null) {
    console.log('first time running the app');
    // set new masodonhang, muahangtrongngay, tempdata
    initialMaSoDonHang();
    localStorage.removeItem('muaHangTrongNgay');
    localStorage.removeItem('tempData');
  }
  // detect old day and new day
  else if (masodonhangArray !== null) {
    const oldMaSoDonHang = masodonhangArray[0][2] + masodonhangArray[0][3];
    if (oldMaSoDonHang !== currentDay) {
      initialMaSoDonHang();
      localStorage.removeItem('muaHangTrongNgay');
      localStorage.removeItem('tempData');
    }
  }
}

export default checkNewDay;

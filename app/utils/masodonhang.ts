import moment from 'moment';
import { setMaSoDonHang } from './localStorage';

/*
 - Tạo 2 function
  1) Kiểm tra có phải ngày mới không -> True
  -> set localStorage masodonhang đầu ngày
  2) Push masodonhang mới vào localstorage trong ngày
*/
function initialMaSoDonHang() {
  let currentDay = moment()
    .get('Date')
    .toString();
  let currentMonth = moment().get('month') + 1;

  if (currentDay < 10) {
    currentDay = `0${currentDay}`;
  }
  if (currentMonth < 10) {
    currentMonth = `0${currentMonth}`;
  }
  const newMaSoDonHang = `01${currentDay}${currentMonth}`;
  const masodonhangArray = JSON.parse(localStorage.getItem('masodonhang'));
  // detect first time the app run on user computer
  if (masodonhangArray === null) {
    console.log('first time running the app');
    localStorage.setItem('masodonhang', JSON.stringify([newMaSoDonHang]));
  }
  // detect old day and new day
  else if (masodonhangArray !== null) {
    console.log('more than 1 time');
    const oldMaSoDonHang = masodonhangArray[0][2] + masodonhangArray[0][3];
    if (oldMaSoDonHang !== currentDay) {
      localStorage.setItem('masodonhang', JSON.stringify([newMaSoDonHang]));
    }
  }
}

function taoMaSoDonHang() {
  // Lưu mã số đơn hàng vào localStorage với key là "masodonhang"
  // 1. tăng lên 1 đơn vị mỗi khi user click vào button lưu đơn hàng/lưu-xuất hoá đơn
  // 2. nếu user nhập vào tên khách hàng đã từng thanh toán trong ngày thì kiểm tra để lấy lại
  // masodonhang của khách hàng này, render vào #don-hang-id
  const masodonhangArr = JSON.parse(localStorage.getItem('masodonhang'));
  const masoMaxOld = masodonhangArr[masodonhangArr.length - 1].slice(0, 2);
  let masoMaxNew = parseInt(masoMaxOld, 10) + 1;
  if (masoMaxNew < 10) {
    masoMaxNew = `0${masoMaxNew}`;
  }

  return masoMaxNew + masodonhangArr[masodonhangArr.length - 1].slice(2, 6);
}

function luuMaSoDonHang(masodonhang) {
  // masodonhang = "010705";
  const masodonhangArr = localStorage.getItem('masodonhang')
    ? JSON.parse(localStorage.getItem('masodonhang'))
    : [];
  masodonhangArr.push(masodonhang);
  setMaSoDonHang(masodonhangArr);
}

export { taoMaSoDonHang, initialMaSoDonHang, luuMaSoDonHang };

import {
  setMaSoDonHang
} from './localStorage';

var moment = require('moment');

function taoMaSoDonHang() {
  // Luưu mã số đơn hàng vào localStorage với key là "masodonhang"
  // 1. tăng lên 1 đơn vị mỗi khi user click vào button lưu đơn hàng/lưu-xuất hoá đơn
  // 2. nếu user nhập vào tên khách hàng đã từng thanh toán trong ngày thì kiểm tra để lấy lại
  // masodonhang của khách hàng này, render vào #don-hang-id
  let masodonhangArr = JSON.parse(localStorage.getItem('masodonhang'));
  let masoMaxOld = masodonhangArr[masodonhangArr.length - 1].slice(0, 2);
  let masoMaxNew = parseInt(masoMaxOld) + 1;
  if (masoMaxNew < 10) {
    masoMaxNew = "0" + masoMaxNew;
  }

  return masoMaxNew + masodonhangArr[masodonhangArr.length - 1].slice(2, 6);
}

function luuMaSoDonHang(masodonhang) {
  // masodonhang = "010705";
  let masodonhangArr = localStorage.getItem('masodonhang') ? JSON.parse(localStorage.getItem('masodonhang')) : [];
  masodonhangArr.push(masodonhang);
  setMaSoDonHang(masodonhangArr)
}

function initialMaSoDonHang() {
  // document.querySelector('#don-hang-id').innerText = '';
  let masodonhang = localStorage.getItem('masodonhang') ? JSON.parse(localStorage.getItem('masodonhang')) : [];

  let currentDay = moment().get('Date').toString();
  let currentMonth = moment().get('month') + 1;

  if (currentDay < 10) {
    currentDay = "0" + currentDay;
  }
  if (currentMonth < 10) {
    currentMonth = "0" + currentMonth;
  }

  if (masodonhang.length === 0) {
    let newMaSoDonHang = "01" + currentDay + currentMonth;
    return newMaSoDonHang;
  }

  let pastDay = (masodonhang[0][2] + masodonhang[0][3]).toString();
  if (currentDay !== pastDay) {
    localStorage.removeItem('masodonhang');
    // Khởi tạo masodonhang mới đâuf ngày "010620" "010720" ...
    let newMaSoDonHang = "01" + currentDay + currentMonth;

    return newMaSoDonHang;
  }
}

export {
  taoMaSoDonHang,
  initialMaSoDonHang,
  luuMaSoDonHang
}
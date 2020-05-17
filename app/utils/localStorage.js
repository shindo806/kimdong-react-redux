function luuDuLieuTamThoi(donhang) {
  // thongso: Object {a, b, c, a1, m, }
  // tinhtien: Object {dongia, soluong, thanhtien}
  let initialData = localStorage.getItem('tempData') ? JSON.parse(localStorage.getItem('tempData')) : [];

  initialData.push(donhang);
  localStorage.setItem('tempData', JSON.stringify(initialData));
  return true;
}

function xoaDuLieuTamThoi() {
  localStorage.removeItem('tempData');
  return true;
}

function muaHangTrongNgay(khachhangInfo) {
  let muaHangTrongNgay = localStorage.getItem('muaHangTrongNgay') ? JSON.parse(localStorage.getItem('muaHangTrongNgay')) : [];
  // khachhangInfo : { tenkhachhang, khachhangID, masodonhang }
  if (muaHangTrongNgay.length === 0) {
    muaHangTrongNgay.push(khachhangInfo);
    localStorage.setItem('muaHangTrongNgay', JSON.stringify(muaHangTrongNgay));
    return;
  } else {
    let matchedKhachHang = muaHangTrongNgay.filter(item => item.khachhangID === khachhangInfo.khachhangID)
    if (!matchedKhachHang.length) {
      muaHangTrongNgay.push(khachhangInfo);
      localStorage.setItem('muaHangTrongNgay', JSON.stringify(muaHangTrongNgay));
      return;
    } else {
      console.log("khach hang mua >2 don hang/ngay");
    }
  }

}

function setMaSoDonHang(masodonhangArr) {
  localStorage.setItem('masodonhang', JSON.stringify(masodonhangArr));
  return true;
}

function setTempKhachHangInfo(khachhangObject) {
  localStorage.setItem('tempKhachHangInfo', JSON.stringify(khachhangObject));
  return true;
}

function removeTempData() {
  localStorage.removeItem('tempData');
  localStorage.removeItem('tempKhachHangInfo');
  return true;
}

export {
  luuDuLieuTamThoi,
  xoaDuLieuTamThoi,
  muaHangTrongNgay,
  setMaSoDonHang,
  setTempKhachHangInfo,
  removeTempData
};
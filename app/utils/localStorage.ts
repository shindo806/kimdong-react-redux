function luuDuLieuTamThoi(donhang) {
  // thongso: Object {a, b, c, a1, m, }
  // tinhtien: Object {dongia, soluong, thanhtien}
  const initialData = localStorage.getItem('tempData')
    ? JSON.parse(localStorage.getItem('tempData'))
    : [];

  initialData.push(donhang);
  localStorage.setItem('tempData', JSON.stringify(initialData));
  return true;
}

function xoaDuLieuTamThoi() {
  localStorage.removeItem('tempData');
  return true;
}

function muaHangTrongNgay(khachhangInfo) {
  const muaHangTrongNgayData = localStorage.getItem('muaHangTrongNgay')
    ? JSON.parse(localStorage.getItem('muaHangTrongNgay'))
    : [];
  // khachhangInfo : { tenkhachhang, khachhangID, masodonhang }
  if (muaHangTrongNgayData === null) {
    muaHangTrongNgayData.push(khachhangInfo);
    localStorage.setItem(
      'muaHangTrongNgay',
      JSON.stringify(muaHangTrongNgayData)
    );
  } else {
    const matchedKhachHang = muaHangTrongNgayData.filter(
      item => item.khachhangID === khachhangInfo.khachhangID
    );
    if (!matchedKhachHang.length) {
      muaHangTrongNgayData.push(khachhangInfo);
      localStorage.setItem(
        'muaHangTrongNgay',
        JSON.stringify(muaHangTrongNgayData)
      );
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

function setKhachHangData(khachhangObject) {
  localStorage.setItem('khachhangData', JSON.stringify(khachhangObject));
  return true;
}

function removeTempData() {
  localStorage.removeItem('tempData');
  localStorage.removeItem('tempKhachHangInfo');
  return true;
}

function resetLocalStorage() {
  localStorage.removeItem('masodonhang');
  localStorage.removeItem('tempData');
  localStorage.removeItem('muaHangTrongNgay');
}

export {
  luuDuLieuTamThoi,
  xoaDuLieuTamThoi,
  muaHangTrongNgay,
  setMaSoDonHang,
  setTempKhachHangInfo,
  setKhachHangData,
  removeTempData,
  resetLocalStorage
};

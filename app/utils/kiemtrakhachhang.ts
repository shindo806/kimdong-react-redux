interface KhachhangInfo {
  tenkhachhang: string;
}

function customerDayChecking(khachhangParams: KhachhangInfo) {
  const muaHangTrongNgay = localStorage.getItem('muaHangTrongNgay')
    ? JSON.parse(localStorage.getItem('muaHangTrongNgay'))
    : [];
  const matchedItem = muaHangTrongNgay.filter(
    item => item.tenkhachhang === khachhangParams
  );
  if (matchedItem === null || matchedItem === undefined) return null;
  return {
    khachhangID: matchedItem[0].khachhangID,
    masodonhang: matchedItem[0].masodonhang,
    tenkhachhang: matchedItem[0].tenkhachhang
  };
}

function customerAllDayChecking() {
  console.log('customer all day checking');
}

export { customerDayChecking, customerAllDayChecking };

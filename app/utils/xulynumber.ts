// Xử lý nhập liệu: 16 -> 16.000
function xuLyNhapLieu(string) {
  string = toNumber(string);
  console.log(string / 1000);
}

// Chuyển số thành dạng 1.000.000
function formatNumber(num: string) {
  const intNumber = parseInt(num, 10);
  let stringNumber: string;
  if (num !== null) {
    stringNumber = intNumber
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  return stringNumber;
}

// Chuyển số dạng 1.000.000 thành 1000000
function toNumber(str) {
  let number;
  if (str.length > 1) {
    number = str.split('.').join('');
  } else {
    number = parseInt(str, 10);
  }
  return parseInt(number, 10);
}

export { formatNumber, toNumber, xuLyNhapLieu };

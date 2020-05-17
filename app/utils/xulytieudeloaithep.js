function xuLyTieuDeLoaiThep(loaihang, thongso) {
  // loaihang: Tấm - m ly: a * b
  // thongso: Object {a: ..., b: ..., m : ...}
  // => render vao ID: thong-so-title
  // dai: "",    day: "",    donvitinh: "",    a: "",    b: "",    c: "",    a1: "",    cong1: 0,    cong2: 0, cong3: 0,

  let m = thongso.day === "" ? 0 : thongso.day;
  let a = thongso.a === "" ? 0 : thongso.a;
  let b = thongso.b === "" ? 0 : thongso.b;
  let c = thongso.c === "" ? 0 : thongso.c;
  let a1 = thongso.a1 === "" ? 0 : thongso.a1;

  let renderEl = document.getElementById('thong-so-title');
  // reset before each render time
  renderEl.innerHTML = '';

  let result = '';
  // Regex replace m - a - b ...
  switch (loaihang) {
    case "T1":
      result = `Tấm - ${m} ly: ${a}*${b}`;
      break;
    case "T2":
      result = `Tấm - ${m} ly: ${a}*${b}-${c}Ø`;
      break;
    case "T3":
      result = `Tấm - ${m} ly: (${a}-${c})*${b}-Vuông`
      break;
    case "T4":
      result = `Tấm - ${m} ly: (${a}-${c})*${b}-Cân`
      break;
    case "T5":
      result = `Tấm - ${m} ly: Ø${a}`
      break;
    case "T6":
      result = `Tấm - ${m} ly: Ø${a}/Ø${b} - Lấy ruột`
      break;
    case "T7":
      result = `Tấm - ${m} ly: Ø${a}/Ø${b} - Trừ ruột`
      break;
    case "T8":
      result = `Tấm - ${m} ly: Mẫu`;
      break;
    case "C1":
      result = `Chấn - ${m} ly: U/${a}*${b}*${c}`
      break;
    case "C2":
      result = `Chấn - ${m} ly: U/${a}*${b}*${a}`
      break;
    case "C3":
      result = `Chấn - ${m} ly: L/${a}*${b}`
      break;
    case "C4":
      // Special
      result = `Chấn - ${m} ly: C/${a}*${a1}*${b}*${a1}*${a}`;
      break;
    case "C5":
      result = `Chấn - ${m} ly: Z/${a}*${b}*${c}`
      break;
    case "C6":
      // Special 
      result += `Chấn - ${m} ly: Khay 4 cạnh/${a}*${b}*${c}`;
      break;
    case "C7":
      result = `Chấn - ${m} ly: Mẫu chấn`
      break;
    case "Cu1":
      result = `Cuốn - ${m} ly: Ống Ø${a}`
      break;
    case "Cu2":
      result = `Cuốn - ${m} ly: Nón Ø(${a}-${b})`
      break;
    case "Cu3":
      // Special
      result = `Cuốn - ${m} ly: Vít tải Ø${a}*${a1}*${b}*${c}`;
      break;
    case "CNC1":
      result = `CNC - ${m} ly: Laser/${a}*${b}`
      break;
    case "CNC2":
      result = `CNC - ${m} ly: Plasma/${a}*${b}`;
      break;
    case "CNC3":
      result = `CNC - ${m} ly: Oxy-gas/${a}*${b}`
      break;
    default:
      break;
  }

  renderEl.innerHTML = `<span>Thông số loại hàng:</span><span id="result-loaihang">   ${result}</span>`;

}

export default xuLyTieuDeLoaiThep;
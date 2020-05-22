import {
  getKhachHang
} from '../dataAPI/connectDB';
import {
  removeTempData,
  setKhachHangData
} from './localStorage';
import {
  initialMaSoDonHang
} from './masodonhang';

async function loading() {
  try {
    // Load thong tin khach hang: ten, khachhangID, sodienthoai
    setKhachHangData(getKhachHang());
    // Xoa tempData
    removeTempData();
    // Load masodonhang mới đầu ngày
    initialMaSoDonHang();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default loading;

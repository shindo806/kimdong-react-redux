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
import checkNewDay from './isNewDay';

async function loading() {
  try {
    console.log('checking everything before using app');
    // Initial everything goes here
    checkNewDay();
    // Load thong tin khach hang: ten, khachhangID, sodienthoai
    setKhachHangData(getKhachHang());
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default loading;

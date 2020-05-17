import {
  getKhachHang
} from "../../dataAPI/connectDB";
import {
  removeTempData
} from "./localStorage";

function loading() {
  // Load thong tin khach hang: ten, khachhangID, sodienthoai
  getKhachHang();
  // Xoa tempData
  removeTempData();
}

export default loading;
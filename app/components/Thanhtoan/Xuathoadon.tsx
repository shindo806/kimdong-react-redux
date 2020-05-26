import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import moment from 'moment';
import { postLuuDonHang, getAllData } from 'dataAPI/connectDB';
import {
  muaHangTrongNgay,
  removeTempData,
  xoaDuLieuTamThoi,
  setKhachHangData
} from '../../utils/localStorage';
import { luuMaSoDonHang, taoMaSoDonHang } from '../../utils/masodonhang';
import styles from './thanhtoan.css';

// State
import tempData from './atoms/tempData';
import masodonhangState from './atoms/masodonhang';
import tenkhachhang from './atoms/tenkhachhang';
import sodienthoai from './atoms/sodienthoai';
import errorState from './atoms/warning-error';
import { getKhachHang } from '../../dataAPI/connectDB';

export default function Xuathoadon(props) {
  const [data, setData] = useRecoilState(tempData);
  const [masodonhang, setMaSoDonHang] = useRecoilState(masodonhangState);
  const setTenKhachHang = useSetRecoilState(tenkhachhang);
  const setSoDienThoai = useSetRecoilState(sodienthoai);
  const setError = useSetRecoilState(errorState);

  const luuDonHang = () => {
    const masodonhangArr = JSON.parse(localStorage.getItem('masodonhang'));

    const tongtien = document.querySelector('#thanhtien-render').innerText;
    const thanhtoan = document.querySelector('#thanhtoan-render').value;
    const duno = document.querySelector('#duno-render').innerText;
    const khachhangInfo = JSON.parse(localStorage.getItem('tempKhachHangInfo')); // {ten, khachhangID, sdt}

    const ngaylapdonhang = moment().format('LLLL');
    const trangthaigiacong = false;
    const tatcadonhang = JSON.parse(localStorage.getItem('tempData'));

    if (khachhangInfo === null) {
      setError('Thiếu tên khách hàng !');
      return;
    }
    if (tatcadonhang === null) {
      setError('Không thể lưu đơn hàng trống !');
      return;
    }

    const donhang = {
      duno,
      tongtien,
      thanhtoan,
      ...khachhangInfo,
      masodonhang,
      ngaylapdonhang,
      trangthaigiacong,
      thongtindonhang: tatcadonhang
    };
    // checking is add new item or save edit item
    // Add new item
    if (masodonhang === masodonhangArr[masodonhangArr.length - 1]) {
      console.log('don hang moi');
      // Luu thong tin khach mua hang trong ngay vao localStorage
      muaHangTrongNgay({
        tenkhachhang: khachhangInfo.tenkhachhang,
        khachhangID: khachhangInfo.khachhangID,
        masodonhang
      });
      // tạo mã số đơn hàng mới
      const newMaSoDonHang = taoMaSoDonHang();
      luuMaSoDonHang(newMaSoDonHang);
      setMaSoDonHang(masodonhangArr[masodonhangArr.length - 1]);
    }
    if (masodonhang !== masodonhangArr[masodonhangArr.length - 1]) {
      console.log('edit don hang');
      setMaSoDonHang(masodonhangArr[masodonhangArr.length - 1]);
    }
    // Luu don hang vao database
    postLuuDonHang(donhang);
    // Loai lai thong tin khach hang
    setKhachHangData(getKhachHang());
    // Delete temp data on localStorage
    removeTempData();
    setData([]);
    // Clear tenkhachhhang va sodienthoai sau khi luu du lieu xong
    setTenKhachHang('');
    setSoDienThoai('');
  };

  const onRemoveTempData = () => {
    xoaDuLieuTamThoi();
    setData([]);
    // Clear tenkhachhhang va sodienthoai sau khi luu du lieu xong
    setTenKhachHang('');
    setSoDienThoai('');
    const masodonhangArr = JSON.parse(localStorage.getItem('masodonhang'));
    setMaSoDonHang(masodonhangArr[masodonhangArr.length - 1]);
  };
  return (
    <>
      <div className={styles.row}>
        <div className={`${styles['col-lg-12']} ${styles['col-md-12']}`}>
          <div className={styles['hoa-don']}>
            <button
              type="button"
              title="Lưu lại đơn hàng và In hóa đơn cho khách hàng"
              className={`${styles.ui} ${styles.button} ${styles.primary}`}
              id="print-save"
            >
              Xuất và lưu hóa đơn
            </button>
            <button
              type="button"
              title="Lưu lại đơn hàng"
              className={`${styles.ui} ${styles.button} ${styles.primary}`}
              onClick={luuDonHang}
            >
              Lưu đơn hàng
            </button>
            <button
              type="button"
              title="In hóa đơn cho khách hàng"
              className={`${styles.ui} ${styles.button} ${styles.primary}`}
              id="print"
            >
              Xuất hóa đơn
            </button>
            <button
              type="button"
              title="Xóa bỏ đơn hàng vừa đặt.
                  Lưu ý: Không thể lấy lại được đơn hàng đã xóa!"
              className={`${styles.ui} ${styles.button} ${styles.red}`}
              onClick={onRemoveTempData}
            >
              Hủy đơn hàng
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

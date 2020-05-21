import React from 'react';
import { postLuuDonHang, getAllData } from 'dataAPI/connectDB';
import { muaHangTrongNgay, removeTempData } from 'utils/localStorage';
import { luuMaSoDonHang, taoMaSoDonHang } from 'utils/masodonhang';
import styles from './thanhtoan.css';

const moment = require('moment');

export default function Xuathoadon(props) {
  const luuDonHang = () => {
    const tongtien = document.querySelector('#thanhtien-render').innerText;
    const thanhtoan = document.querySelector('#thanhtoan-render').value;
    const duno = document.querySelector('#duno-render').innerText;
    const khachhangInfo = JSON.parse(localStorage.getItem('tempKhachHangInfo')); // {ten, khachhangID, sdt}
    // remove sodienthoai, ko can luu sdt vao donhang -> luu vao khachhang

    if (khachhangInfo === null) {
      alert('Thiếu tên khách hàng');
      return;
    }

    const masodonhang = document.querySelector('#don-hang-id').innerText;

    const ngaylapdonhang = moment().format('LLLL');
    const trangthaigiacong = false;
    const tatcadonhang = JSON.parse(localStorage.getItem('tempData'));
    if (tatcadonhang === null) {
      alert('Không thể lưu đơn hàng trống !');
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

    // Luu don hang vao database
    postLuuDonHang(donhang);
    // Luu thong tin khach mua hang trong ngay vao localStorage
    muaHangTrongNgay({
      tenkhachhang: khachhangInfo.tenkhachhang,
      khachhangID: khachhangInfo.khachhangID,
      masodonhang
    });
    // Luu lai masodonhang va tang gia tri masodonhang +1
    luuMaSoDonHang(masodonhang);
    const newMaSoDonhang = taoMaSoDonHang();
    props.setMaSoDonHang(newMaSoDonhang);
    // Delete temp data on localStorage
    removeTempData();
    // Clear tenkhachhhang va sodienthoai sau khi luu du lieu xong
    clearThongTinChung();
  };

  const clearThongTinChung = () => {
    document.getElementById('tenkhachhang').value = '';
    document.getElementById('sodienthoai').value = '';
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
            >
              Hủy đơn hàng
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

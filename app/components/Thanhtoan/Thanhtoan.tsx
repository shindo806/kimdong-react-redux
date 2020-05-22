import React, { useState, useEffect } from 'react';
import { Message } from 'semantic-ui-react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { initialMaSoDonHang } from '../../utils/masodonhang';
import { getKhachHang } from '../../dataAPI/connectDB';
// state

import addItem from './atoms/addItem';
// Components import
import Thongtinchung from './Thongtinchung';
import Xuathoadon from './Xuathoadon';
import Loaihang from './Loaihang';
import Thongso from './Thongso';
import Thongsochitiet from './Thongsochitiet';
import Navbar from '../Navbar/Navbar';

import styles from './thanhtoan.css';
import { setKhachHangData } from '../../utils/localStorage';
import loading from '../../utils/loadingApp';

// state
import errorState from './atoms/warning-error';
import masodonhang from './atoms/masodonhang';

export default function Thanhtoan() {
  const error = useRecoilValue(errorState);
  const setMaSoDonHang = useSetRecoilState(masodonhang);
  // Lấy dữ liệu khách hàng, set to localStorage
  setKhachHangData(getKhachHang());
  // Khởi tạo basic data
  useEffect(() => {
    loading();
    setMaSoDonHang(JSON.parse(localStorage.getItem('masodonhang')));
  }, []);
  return (
    <div>
      {/* Navbar */}
      <section className={styles['top-nav']}>
        <div className={styles['container-fluid']}>
          <div className={styles.row}>
            <Navbar />
          </div>
        </div>
      </section>
      {/* header */}
      {/* Warning - Error */}
      {error ? (
        <Message className={`${styles.ui} ${styles.message} ${styles.error}`}>
          <Message.Header>{error}</Message.Header>
        </Message>
      ) : null}
      <div className="main-panel" style={{ padding: '20px' }}>
        <div className={styles['container-fluid']}>
          <div className={styles.row}>
            <div className={`${styles['col-lg-8']} ${styles['col-md-8']}`}>
              {/* left-panel */}
              <div className={styles['left-panel']} id="left-panel">
                <div className="main-content">
                  {/* Thông tin chung của khách mua hàng: Tên, sdt, mã số đơn hàng trong ngày, ngày mua hàng */}
                  <Thongtinchung />
                  {/* Thông tin chi tiết của đơn hàng theo khách hàng xác định */}
                  <Thongsochitiet />
                </div>
                {/* Xuất hoá đơn - Lưu đơn hàng */}
                <Xuathoadon />
              </div>
            </div>
            {/* Right panel */}
            <div className={`${styles['col-lg-4']} ${styles['col-md-4']}`}>
              <div className={styles['right-panel']}>
                <div className={styles.row}>
                  <div
                    className={`${styles['col-lg-12']} ${styles['col-md-12']}`}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        fontSize: '1.2rem'
                      }}
                    >
                      Nhập đơn hàng
                    </span>
                  </div>
                </div>
                <div className={styles.row}>
                  <div
                    className={`${styles['col-lg-12']} ${styles['col-md-12']}`}
                  >
                    <div className="nhap-don-hang">
                      {/* Select loại hàng */}
                      <Loaihang />
                      {/* Nhập thông số loại hàng */}
                      <Thongso />
                      {/* Thêm - Sửa */}
                      <div
                        id="saveEditItem"
                        className={`${styles.visible} save-edit-item`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end of right-panel */}
        </div>
      </div>
    </div>
  );
}

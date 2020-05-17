import React, { useState, useEffect } from 'react';

import { Message } from 'semantic-ui-react';

// Components import
import Thongtinchung from './Thongtinchung';
import Xuathoadon from './Xuathoadon';
import Loaihang from './Loaihang';
import Thongso from './Thongso';
import Thongsochitiet from './Thongsochitiet';
import Navbar from '../Navbar/Navbar';

import { getKhachHang } from '../../dataAPI/connectDB';
import { initialMaSoDonHang } from '../../utils/masodonhang';

import styles from './thanhtoan.css';

// interface Props {
//   loaihangRender?: string;
//   isAddItem?: boolean;
//   data?: [];
//   masodonhang?: string;
// }

export default function Thanhtoan() {
  const [loaihangRender, setLoaiHangRender] = useState('default'); // State quản lý việc user chọn loaị hàng => render component thông số
  const [isAddItem, setIsAddItem] = useState(false);

  const [data, setData] = useState(() => {
    const tempData = localStorage.getItem('tempData');
    if (tempData !== null) {
      return JSON.parse(tempData);
    }
    return [];
  });
  const [masodonhang, setMaSoDonHang] = useState(() => initialMaSoDonHang());
  // Lấy dữ liệu khách hàng, set to localStorage
  const khachHangData = getKhachHang();
  if (khachHangData.length > 0) {
    localStorage.setItem('khachhangData', JSON.stringify(khachHangData));
  }
  // Handle data change when user add item
  useEffect(() => {
    if (isAddItem) {
      const tempData = localStorage.getItem('tempData');
      if (tempData !== null) {
        setData(JSON.parse(tempData));
      }
    }
    setTimeout(() => {
      setIsAddItem(false);
    }, 4200);
  }, [isAddItem]);
  // Reset UI when user save data
  useEffect(() => {
    setData([]);
    // setMaSoDonHang(props.masodonhang);
  }, [masodonhang]);
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* header */}
      <div className="main-panel" style={{ padding: '20px' }}>
        <div className={styles['container-fluid']}>
          <div className={styles.row}>
            <div className={`${styles['col-lg-8']} ${styles['col-md-8']}`}>
              {/* left-panel */}
              <div className={styles['left-panel']} id="left-panel">
                <div className="main-content">
                  {/* Thông tin chung của khách mua hàng: Tên, sdt, mã số đơn hàng trong ngày, ngày mua hàng */}
                  <Thongtinchung masodonhang={masodonhang} />
                  {/* Thông tin chi tiết của đơn hàng theo khách hàng xác định */}
                  {/* <Thongo
                    isAddItem={isAddItem}
                    setIsAddItem={setIsAddItem}
                  /> */}
                  <Thongsochitiet data={data} isReRender={isAddItem} />
                </div>
                {/* Xuất hoá đơn - Lưu đơn hàng */}
                <Xuathoadon setMaSoDonHang={setMaSoDonHang} />
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
                      <Loaihang
                        loaihangRender={loaihangRender}
                        setLoaiHangRender={setLoaiHangRender}
                      />
                      {/* Nhập thông số loại hàng */}
                      <Thongso
                        loaihangRender={loaihangRender}
                        setLoaiHangRender={setLoaiHangRender}
                        setIsAddItem={setIsAddItem}
                        setData={setData}
                      />
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
          {/* Thông báo thêm hoá đơn thành công */}
          {isAddItem ? (
            <Message success header="Thêm một đơn hàng thành công" />
          ) : null}
          {/* end of right-panel */}
        </div>
      </div>
    </div>
  );
}

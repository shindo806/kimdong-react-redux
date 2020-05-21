import React from 'react';
import { useRecoilState } from 'recoil';

import loaihangState from './atoms/loaihang';

import styles from './thanhtoan.css';

export default function Loaihang() {
  const [loaihang, setLoaiHang] = useRecoilState(loaihangState);
  const onHandleSelect = e => {
    setLoaiHang(e.target.value);
  };

  return (
    <>
      <div className={styles['loai-hang']}>
        <select
          value={loaihang}
          id="loai-hang"
          className={`${styles.ui} ${styles.search} ${styles.dropdown}`}
          onChange={e => onHandleSelect(e)}
        >
          <option value="default">Loại hàng</option>
          <option value="T1">Tấm - m ly : a*b</option>
          <option value="T2">Tấm - m ly : a*b-c∅</option>
          <option value="T3">Tấm - m ly : (a-c)*b-Vuông</option>
          <option value="T4">Tấm - m ly : (a-c)*b-Cân</option>
          <option value="T5">Tấm - m ly : ∅a</option>
          <option value="T6">Tấm - m ly : ∅a / ∅b-Lấy ruột</option>
          <option value="T7">Tấm - m ly : ∅a / ∅b-Trừ ruột</option>
          <option value="T8">Tấm - m ly : Mẫu</option>
          <option value="C1">Chấn - m ly : U/a*b*c</option>
          <option value="C2">Chấn - m ly : U/a*b*a</option>
          <option value="C3">Chấn - m ly : L/a*b</option>
          <option value="C4">Chấn - m ly : C/a*a1*b*a1*a</option>
          <option value="C5">Chấn - m ly : Z/a*b*c</option>
          <option value="C6">Chấn - m ly : Khay 4 cạnh/a*b*c</option>
          <option value="C7">Chấn - m ly : Mẫu chấn</option>
          <option value="Cu1">Cuốn - m ly : Ống ∅a</option>
          <option value="Cu2">Cuốn - m ly : Nón ∅(a-b)</option>
          <option value="Cu3">Cuốn - m ly : Vít tải ∅a*a1*b*c</option>
          <option value="CNC1">CNC - m ly : Laser/a*b</option>
          <option value="CNC2">CNC - m ly : Plasma/a*b</option>
          <option value="CNC3">CNC - m ly : Oxy-Gas/a*b</option>
        </select>
      </div>
    </>
  );
}

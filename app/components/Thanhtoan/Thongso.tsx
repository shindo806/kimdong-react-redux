import React, { useEffect, useState } from 'react';
import { Message } from 'semantic-ui-react';
import styles from './thanhtoan.css';

import * as congthuc from '../../utils/tinhtien';

import xuLyTieuDeLoaiThep from '../../utils/xulytieudeloaithep';
import { formatNumber, toNumber } from '../../utils/xulynumber';
import { luuDuLieuTamThoi } from '../../utils/localStorage';
import getDomIdElement from '../../utils/getDomElement';

export default function Thongso(props) {
  // props.loaihangRender  = "default"  - thongso initial = []
  const [loaihang, setLoaiHang] = useState([]);
  const [thongso1, setThongSo1] = useState({
    dai: '',
    day: '',
    donvitinh: '',
    a: '',
    b: '',
    c: '',
    a1: ''
  });
  const [thongso2, setThongSo2] = useState({
    cong1: 0,
    cong2: 0,
    cong3: 0
  });
  const [thongso3, setThongSo3] = useState({
    dongia: 0,
    soluong: 0,
    thanhtien: 0
  });
  const [error, setError] = useState('');
  let loaithep = [];
  const handleLoaiHangChange = loaihang => {
    switch (loaihang) {
      case 'T1':
        loaithep = ['a', 'b'];
        break;
      case 'T2':
        loaithep = ['a', 'b', 'c'];
        break;
      case 'T3':
        loaithep = ['a', 'b', 'c'];
        break;
      case 'T4':
        loaithep = ['a', 'b', 'c'];
        break;
      case 'T5':
        loaithep = ['a'];
        break;
      case 'T6':
        loaithep = ['a', 'b'];
        break;
      case 'T7':
        loaithep = ['a', 'b'];
        break;
      case 'T8':
        loaithep = ['a', 'b', 'c', 'q', 'a1'];
        break;
      case 'C1':
        loaithep = ['a', 'b', 'c', 'q'];
        break;
      case 'C2':
        loaithep = ['a', 'b', 'q'];
        break;
      case 'C3':
        loaithep = ['a', 'b', 'q'];
        break;
      case 'C4':
        loaithep = ['a', 'b', 'q', 'a1'];
        break;
      case 'C5':
        loaithep = ['a', 'b', 'q', 'c'];
        break;
      case 'C6':
        loaithep = ['a', 'b', 'q', 'c'];
        break;
      case 'C7':
        loaithep = ['a', 'b', 'q', 'c', 'a1'];
        break;
      case 'Cu1':
        loaithep = ['a', 'q'];
        break;
      case 'Cu2':
        loaithep = ['a', 'b', 'q'];
        break;
      case 'Cu3':
        loaithep = ['a', 'b', 'q', 'a1', 'c'];
        break;
      case 'CNC1':
        loaithep = ['a', 'b'];
        break;
      case 'CNC2':
        loaithep = ['a', 'b'];
        break;
      case 'CNC3':
        loaithep = ['a', 'b'];
        break;
      default:
        loaithep = [];
        break;
    }
    return loaithep;
  };

  // Set UI sau moi lan user thay đổi loai thep
  useEffect(() => {
    // Set tựa đề cho thanh Thông số loại hàng: default
    document.getElementById('thong-so-title').innerHTML =
      'Thông số loại hàng: ';
    let newLoaiHang = handleLoaiHangChange(props.loaihangRender);
    setLoaiHang(newLoaiHang);
    // Reset input field ve default
    setThongSo1({
      dai: '',
      day: '',
      donvitinh: '',
      a: '',
      b: '',
      c: '',
      a1: ''
    });
    setThongSo2({
      cong1: '',
      cong2: '',
      cong3: ''
    });
    setThongSo3({
      dongia: 0,
      soluong: 0,
      thanhtien: 0
    });
  }, [props.loaihangRender]);

  // Handle Select tất cả giá trị trong ô input khi user click vào ô input
  const handleFocus = event => {
    event.target.select();
  };

  // Trigger when user want to add item to localStorage
  const handleAddItem = () => {
    let donhang = {
      ...thongso1,
      ...thongso2,
      ...thongso3,
      loaihang: document.getElementById('result-loaihang').innerText // lấy thông tin loại hàng để render
    };
    const saveStatus = luuDuLieuTamThoi(donhang);
    if (saveStatus) {
      props.setLoaiHangRender('default');
      // send status back to parent component
      props.setIsAddItem(true);
    }
  };

  // Handle Input Change: 3 type
  // Type 1: Nhập thông số: dài, dày, a, b, c, a1, đơn vị tính
  // -> nếu user thay đổi giá trị thì gọi lại hàm tính đơn giá -> tính thành tiền
  const handleInputChange1 = elementID => {
    // Nhiệm vụ của function này chỉ là setState cho các giá trị elementID thay đổi
    let elementIDValue = getDomIdElement(elementID).value;
    // setState using thongso1 state
    let newState = { ...thongso1 };
    newState[`${elementID}`] = elementIDValue;
    setThongSo1(newState);
    // Render tiêu đề loại thép
    xuLyTieuDeLoaiThep(props.loaihangRender, newState);
  };
  const handleTrigger1 = (typeofValue, event) => {
    // Nhiệm vụ của function này là trigger function tính đơn giá và thành tiền mỗi lần user thay đổi giá trị các ô type1

    if (event.key === 'Tab') {
      let thongso = {
        ...thongso1,
        ...thongso2
      };
      let dongia = congthuc.tinhdongia(props.loaihangRender, thongso);
      if (isNaN(dongia)) {
        dongia = 0;
      }
      let thanhtien = congthuc.tinhthanhtien(dongia, thongso3.soluong);

      setThongSo3(prev => ({
        ...prev,
        dongia: formatNumber(dongia),
        thanhtien: formatNumber(thanhtien)
      }));
      return;
    }
  };

  const validateInput = (typeofValue, event) => {
    if (
      event.key === 'Backspace' ||
      event.altKey ||
      event.shiftKey ||
      event.ctrlKey ||
      event.metaKey
    )
      return;
    if (typeofValue === 'number') {
      const keyCode = event.keyCode || event.which;
      const string = String.fromCharCode(keyCode);
      const regex = /[0-9,]|\./;
      if (!regex.test(string)) {
        event.returnValue = false;
        if (event.preventDefault) {
          event.preventDefault();
          setError('Vui lòng nhập giá trị số !');
          setTimeout(() => {
            setError('');
          }, 3500);
        }
      }
    } else if (typeofValue === 'string') {
      const keyCode = event.key;
      if (parseInt(keyCode)) {
        event.preventDefault();
        setError('Vui lòng nhập giá trị chữ !');
        setTimeout(() => {
          setError('');
        }, 3500);
      }
    }
  };

  // Type 2: Nhập thông số: công 1, công 2, công 3
  // + User nhập 250 press Tab key -> Input value = 250.000
  // -> nếu user thay đổi giá trị thì gọi lại hàm tính đơn giá -> tính thành tiền
  const handleInputChange2 = elementID => {
    // Nhiệm vụ của function này chỉ là setState cho các giá trị elementID thay đổi
    let elementIDValue = getDomIdElement(elementID).value;
    // setState using thongso1 state
    let newState = { ...thongso2 };
    newState[`${elementID}`] = isNaN(parseInt(toNumber(elementIDValue)))
      ? ''
      : parseInt(elementIDValue);
    setThongSo2(newState);
  };

  const handleTrigger2 = (elementID, event) => {
    // Nhiệm vụ của function này là trigger function
    // 1. chuyển định dạng user nhập 15 -> 15.000 khi press tab key
    // 2. tính đơn giá và thành tiền mỗi lần user thay đổi giá trị các ô type1
    if (event.key === 'Tab') {
      // 1. 15 -> 15.000
      let elementIdValue = getDomIdElement(`${elementID}`).value;
      let formatedNumber = formatNumber(parseInt(elementIdValue * 1000));
      let newThongSo2 = { ...thongso2 };
      newThongSo2[`${elementID}`] = formatedNumber;
      setThongSo2(newThongSo2);

      // 2. tính đơn giá dựa trên newThongSo2 - newest state -> call 2 functions: tinhdongia and tinhthanhtien
      let thongso = {
        ...thongso1,
        ...newThongSo2
      };
      let dongia = congthuc.tinhdongia(props.loaihangRender, thongso);
      if (isNaN(dongia)) {
        dongia = 0;
      }
      let thanhtien = congthuc.tinhthanhtien(dongia, thongso3.soluong);

      return setThongSo3(prev => ({
        ...prev,
        dongia: formatNumber(dongia),
        thanhtien: formatNumber(thanhtien)
      }));
    }
  };

  // Type 3: handle value cho các gía trị: đơn giá, số lượng, thành tiền
  const handleInputChange3 = (elementID, event) => {
    // Nhiệm vụ của function này chỉ là setState cho các giá trị elementID thay đổi
    let elementIDValue = event.target.value;
    if (elementID === 'soluong') {
      let newState = { ...thongso3 };
      let thanhtien = congthuc.tinhthanhtien(
        toNumber(newState.dongia),
        elementIDValue
      );
      let thanhtienFormated = isNaN(thanhtien) ? 0 : formatNumber(thanhtien);

      return setThongSo3(prev => ({
        ...prev,
        soluong: elementIDValue,
        thanhtien: thanhtienFormated
      }));
    }

    // setState using thongso1 state
    let newState = { ...thongso3 };
    if (elementID === 'soluong') {
      let thanhtien = congthuc.tinhthanhtien(newState.dongia, elementIDValue);

      setThongSo3(prev => ({
        ...prev,
        soluong: elementIDValue,
        thanhtien
      }));
    }
    newState[`${elementID}`] =
      elementIDValue === '' ? '' : parseInt(elementIDValue);
    setThongSo3(newState);
  };

  const handleTrigger3 = (elementID, event) => {
    // Nhiệm vụ của function này là trigger function
    // 1. chuyển định dạng user nhập 15 -> 15.000 khi press tab key
    // 2. tính đơn giá và thành tiền mỗi lần user thay đổi giá trị các ô type1
    if (elementID === 'dongia') {
      if ((event.key === 'Tab') | (event.key === 'Enter')) {
        let dongia = getDomIdElement(`${elementID}`).value;
        // TH1: Có giá trị sẵn do tính từ công thức và setState3
        if (dongia.includes('.')) {
          let dongiaFormated = toNumber(dongia);
          let thanhtien = congthuc.tinhthanhtien(
            dongiaFormated,
            thongso3.soluong
          );

          return setThongSo3(prev => ({
            ...prev,
            dongia: dongia,
            thanhtien: formatNumber(thanhtien)
          }));
        }

        // TH2: User nhập vào
        let dongiaFormated = formatNumber(dongia * 1000);
        let thanhtien = congthuc.tinhthanhtien(dongia * 1000, thongso3.soluong);
        return setThongSo3(prev => ({
          ...prev,
          dongia: dongiaFormated,
          thanhtien: formatNumber(thanhtien)
        }));
      }
    }
  };
  return (
    <>
      <Message
        className={
          error ? `${styles.ui} ${styles.message} ${styles.error}` : ''
        }
      >
        {error}
      </Message>
      <div
        id="thong-so"
        className={loaihang.length === 0 ? styles.close : styles['thong-so']}
      >
        <div id="thong-so-title" className={styles['thong-so-title']}>
          Thông số loại hàng:
        </div>
        <div className={`${styles.ui} ${styles.form} thong-so-1`}>
          <div className={styles.fields}>
            <div
              className={
                loaihang.includes('q')
                  ? `${styles.field} chieu-dai`
                  : `${styles.close}`
              }
            >
              <label>Chiều dài - q</label>
              <input
                value={thongso1.dai}
                id="dai"
                type="text"
                placeholder="Chiều dài"
                onChange={() => handleInputChange1('dai')}
                onKeyPress={e => handleTrigger1('number', e)}
                onFocus={handleFocus}
              />
            </div>
            <div className={styles.field}>
              <label>Độ dày - m</label>
              <input
                value={thongso1.day}
                id="day"
                type="text"
                placeholder="Độ dày"
                onChange={() => handleInputChange1('day')}
                onKeyDown={e => handleTrigger1('number', e)}
                onKeyPress={e => validateInput('number', e)}
                onFocus={handleFocus}
              />
            </div>
            <div className={styles.field}>
              <label>Đơn vị tính</label>
              <input
                value={thongso1.donvitinh}
                id="donvitinh"
                type="text"
                placeholder="Đơn vị tính"
                onChange={() => handleInputChange1('donvitinh')}
                onKeyDown={e => handleTrigger1('string', e)}
                onKeyPress={e => validateInput('string', e)}
                onFocus={handleFocus}
              />
            </div>
          </div>
        </div>
        <div className={`${styles.ui} ${styles.form} thong-so-2`}>
          <div className={styles.fields}>
            <div className={`${styles.field} a`}>
              <label>a</label>
              <input
                value={thongso1.a}
                id="a"
                type="text"
                placeholder="Cạnh a"
                onChange={() => handleInputChange1('a')}
                onKeyDown={e => handleTrigger1('number', e)}
                onKeyPress={e => validateInput('number', e)}
                onFocus={handleFocus}
              />
            </div>
            <div
              className={
                loaihang.includes('b') ? `${styles.field} b` : styles.close
              }
            >
              <label>b</label>
              <input
                value={thongso1.b}
                id="b"
                type="text"
                placeholder="Cạnh b"
                onChange={() => handleInputChange1('b')}
                onKeyDown={e => handleTrigger1('number', e)}
                onKeyPress={e => validateInput('number', e)}
                onFocus={handleFocus}
              />
            </div>
            <div
              className={
                loaihang.includes('c') ? `${styles.field} c` : styles.close
              }
            >
              <label>c</label>
              <input
                value={thongso1.c}
                id="c"
                type="text"
                placeholder="Cạnh c"
                onChange={() => handleInputChange1('c')}
                onKeyDown={e => handleTrigger1('number', e)}
                onKeyPress={e => validateInput('number', e)}
                onFocus={handleFocus}
              />
            </div>
            <div
              className={
                loaihang.includes('a1') ? `${styles.field} a1` : styles.close
              }
            >
              <label>a1</label>
              <input
                value={thongso1.a1}
                id="a1"
                type="text"
                placeholder="Cạnh a1"
                onChange={() => handleInputChange1('a1')}
                onKeyDown={e => handleTrigger1('number', e)}
                onKeyPress={e => validateInput('number', e)}
                onFocus={handleFocus}
              />
            </div>
          </div>
        </div>
        <div className={`${styles.ui} ${styles.form} thong-so-4`}>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label>Công 1</label>
              <input
                value={thongso2.cong1}
                onChange={() => handleInputChange2('cong1')}
                onKeyDown={e => handleTrigger2('cong1', e)}
                onKeyPress={e => validateInput('number', e)}
                onFocus={handleFocus}
                id="cong1"
                type="text"
                placeholder="Công 1"
              />
            </div>
            <div className={styles.field}>
              <label>Công 2</label>
              <input
                value={thongso2.cong2}
                onChange={() => handleInputChange2('cong2')}
                onKeyDown={e => handleTrigger2('cong2', e)}
                onKeyPress={e => validateInput('number', e)}
                onFocus={handleFocus}
                id="cong2"
                type="text"
                placeholder="Công 2"
              />
            </div>
            <div className={styles.field}>
              <label>Công 3</label>
              <input
                value={thongso2.cong3}
                onChange={() => handleInputChange2('cong3')}
                onKeyDown={e => handleTrigger2('cong3', e)}
                onKeyPress={e => validateInput('number', e)}
                onFocus={handleFocus}
                id="cong3"
                type="text"
                placeholder="Công 3"
              />
            </div>
          </div>
        </div>
        <div className={`${styles.ui} ${styles.form} thong-so-5`}>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label>Đơn giá</label>
              <input
                value={thongso3.dongia}
                onChange={e => handleInputChange3('dongia', e)}
                onKeyDown={e => handleTrigger3('dongia', e)}
                onKeyPress={e => validateInput('number', e)}
                onFocus={handleFocus}
                id="dongia"
                type="text"
                placeholder="Đơn giá"
              />
            </div>
            <div className={styles.field}>
              <label>Số lượng</label>
              <input
                value={thongso3.soluong}
                onChange={e => handleInputChange3('soluong', e)}
                // onKeyDown={(e) => handleTrigger3("soluong", e)}
                onKeyPress={e => validateInput('number', e)}
                onFocus={handleFocus}
                id="soluong"
                type="text"
                placeholder="Số lượng"
              />
            </div>
            <div className={styles.field}>
              <label>Thành tiền</label>
              <input
                value={thongso3.thanhtien}
                onChange={e => handleInputChange3('thanhtien', e)}
                id="thanhtien"
                type="text"
                placeholder="Thành tiền"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div
        id="gia-cong"
        className={loaihang.length === 0 ? styles.close : styles['gia-cong']}
      >
        <a
          href="#home"
          className={`${styles.ui} ${styles.button} ${styles.blue}`}
          onClick={handleAddItem}
        >
          Thêm
        </a>
      </div>
    </>
  );
}

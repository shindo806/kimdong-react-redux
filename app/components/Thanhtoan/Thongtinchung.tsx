import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import Autosuggest from 'react-autosuggest';

import { taoNgayLapDonHang } from '../../utils/taoNgayLapDonHang';
import { setTempKhachHangInfo } from '../../utils/localStorage';

// Database
import { getDataByNameAndMaSoDonHang } from '../../dataAPI/connectDB';
// state
import masodonhangState from './atoms/masodonhang';

import styles from './thanhtoan.css';
import tenkhachhang from './atoms/tenkhachhang';
import sodienthoai from './atoms/sodienthoai';
import tempData from './atoms/tempData';

export default function Thongtinchung() {
  const [data, setTempData] = useRecoilState(tempData);
  const [ngaylapdonhang, setNgayLapDonHang] = useState(() =>
    taoNgayLapDonHang()
  );
  const [masodonhang, setMaSoDonHang] = useRecoilState(masodonhangState);

  const [value, setValue] = useRecoilState(tenkhachhang);
  const [sdt, setSodienthoai] = useRecoilState(sodienthoai);

  const [suggestions, setSuggestions] = useState([]);

  const [khachhangs, setKhachHangs] = useState(() =>
    localStorage.getItem('khachhangData')
      ? JSON.parse(localStorage.getItem('khachhangData'))
      : []
  );
  // Update new khachhangData when app had new user
  useEffect(() => {
    setKhachHangs(JSON.parse(localStorage.getItem('khachhangData')));
  }, [masodonhang]);

  useEffect(() => {
    if (value === '' || value === null || value === undefined) {
      localStorage.removeItem('tempData');
      setTempData([]);
    }
  }, [value]);
  const onChange = (event, { newValue, method }) => {
    setValue(newValue);
  };

  const handleTenKhachHang = tenkhachhangParams => {
    if (
      tenkhachhangParams === '' ||
      tenkhachhangParams === null ||
      tenkhachhangParams === undefined
    ) {
      setSodienthoai('');
      localStorage.removeItem('tempKhachHangInfo');
      // xoa tempdata ve render lai table
      localStorage.removeItem('tempData');
      setTempData([]);
      // render lai masodonhang
      const masodonhangArr = JSON.parse(localStorage.getItem('masodonhang'));
      setMaSoDonHang(masodonhangArr[masodonhangArr.length - 1]);
      return;
    }
    const matched = khachhangs.filter(
      khachhang => khachhang.tenkhachhang === tenkhachhangParams
    );
    if (matched.length === 0) {
      setSodienthoai('');
      setTempKhachHangInfo({
        tenkhachhang: value,
        sodienthoai: sdt,
        khachhangID: shortid.generate()
      });
      return;
    }
    // Tim duoc user => set Sodienthoai
    setSodienthoai(matched[0].sodienthoai);
    setTempKhachHangInfo({
      tenkhachhang: matched[0].tenkhachhang,
      sodienthoai: matched[0].sodienthoai,
      khachhangID: matched[0].khachhangID
    });
  };

  const maSoDonHangTrongNgay = name => {
    const khachHangTrongNgay = JSON.parse(
      localStorage.getItem('muaHangTrongNgay')
    );
    if (khachHangTrongNgay === null) return false;
    const matched = khachHangTrongNgay.filter(
      khachhangInfo => khachhangInfo.tenkhachhang.trim() === name.trim()
    );
    return matched[0];
  };
  const onHandleTenKhachHangPress = event => {
    if (event.key === 'Tab' || event.key === 'Enter') {
      handleTenKhachHang(value);
      const matchedObj = maSoDonHangTrongNgay(value);
      if (matchedObj === undefined) {
        return setTempData([]);
      }
      if (matchedObj !== undefined || matchedObj !== null) {
        const dataFromDB = getDataByNameAndMaSoDonHang(matchedObj);
        setTempData(dataFromDB.thongtindonhang);
        // Set lại masodonhang cũ thông qua state masodonhang atom
        setMaSoDonHang(dataFromDB.masodonhang);
        // Set back to tempData to edit/add-new-item
        localStorage.setItem(
          'tempData',
          JSON.stringify(dataFromDB.thongtindonhang)
        );
      }
    }
  };

  const onHandleTenKhachHangBlur = event => {
    handleTenKhachHang(value);
  };
  const inputTenKhachHangProps = {
    id: 'tenkhachhang',
    value,
    onChange,
    onKeyDown: onHandleTenKhachHangPress,
    onBlur: onHandleTenKhachHangBlur
  };
  const handleSodienthoai = sodienthoaiParams => {
    const matched = khachhangs.filter(
      khachhang => khachhang.sodienthoai === sodienthoaiParams
    );
    if (matched.length === 0) {
      setTempKhachHangInfo({
        tenkhachhang: value,
        sodienthoai: sdt,
        khachhangID: shortid.generate()
      });
    } else {
      setValue(matched[0].tenkhachhang);
      setTempKhachHangInfo({
        tenkhachhang: matched[0].tenkhachhang,
        sodienthoai: matched[0].sodienthoai,
        khachhangID: matched[0].khachhangID
      });
    }
  };

  const onHandleSdtChange = e => {
    setSodienthoai(e.target.value);
  };
  const onHandleSdtPress = e => {
    if (e.key === 'Tab' || e.key === 'Enter') {
      handleSodienthoai(sdt);
    }
    // return;
  };
  const onHandleSdtBlur = () => {
    handleSodienthoai(sdt);
  };

  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    return khachhangs.filter(khachhang =>
      khachhang.tenkhachhang.includes(value)
    );
  }

  function getSuggestionValue(suggestion) {
    return suggestion.tenkhachhang;
  }

  function renderSuggestion(suggestion) {
    return <span>{suggestion.tenkhachhang}</span>;
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  return (
    <>
      <div className={styles.row}>
        <div className={`${styles['col-lg-8']} ${styles['col-md-8']}`}>
          <div className={styles['title-col-1']}>
            <p>phiếu giao hàng</p>
          </div>
        </div>
        <div className={`${styles['col-lg-4']} ${styles['col-md-4']}`}>
          <div className="title-col-2">
            <div className={styles['title-info-row']}>
              <p>Ngày:</p>
              <p id="new-date">{ngaylapdonhang}</p>
            </div>
            <div className={styles['title-info-row']}>
              <p>Mã số đơn hàng:</p>
              <p id="don-hang-id">{masodonhang}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        {/* Khach hang */}
        <div className={`${styles['col-lg-8']} ${styles['col-md-8']}`}>
          <div className={`${styles['ten-khach-hang']} ${styles.autocomplete}`}>
            <label>Khách hàng:</label>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputTenKhachHangProps}
            />
          </div>
        </div>
        <div className={`${styles['col-lg-4']} ${styles['col-md-4']}`}>
          <div className={styles['so-dien-thoai']}>
            <div className={styles.autocomplete}>
              <label>Điện thoại:</label>
              <input
                id="sodienthoai"
                type="text"
                value={sdt}
                onChange={onHandleSdtChange}
                onKeyDown={onHandleSdtPress}
                onBlur={onHandleSdtBlur}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

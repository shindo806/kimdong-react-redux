import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import { useRecoilValue, useRecoilState } from 'recoil';
import Autosuggest from 'react-autosuggest';

import { taoNgayLapDonHang } from '../../utils/taoNgayLapDonHang';
import { setTempKhachHangInfo } from '../../utils/localStorage';

// state
import masodonhangState from './atoms/masodonhang';

import styles from './thanhtoan.css';
import tenkhachhang from './atoms/tenkhachhang';
import sodienthoai from './atoms/sodienthoai';

export default function Thongtinchung(props) {
  const [ngaylapdonhang, setNgayLapDonHang] = useState(() =>
    taoNgayLapDonHang()
  );
  const masodonhang = useRecoilValue(masodonhangState);

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

  const onChange = (event, { newValue, method }) => {
    setValue(newValue);
  };
  const handleTenKhachHang = tenkhachhangParams => {
    if (tenkhachhangParams === '') {
      setSodienthoai('');
      localStorage.removeItem('tempKhachHangInfo');
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
  const onHandleTenKhachHangPress = event => {
    if (event.key === 'Tab' || event.key === 'Enter') {
      handleTenKhachHang(value);
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
              <p id="don-hang-id">{masodonhang[masodonhang.length - 1]}</p>
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

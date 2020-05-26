import { formatNumber, toNumber } from '../utils/xulynumber';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults
db.defaults({
  donhang: [],
  khachhang: [],
  muahang: []
}).write();

// Utils

const muahangSampleData = [
  {
    nhacungcap: 'lam thai son',
    ngaythangnam: '17/11/2019',
    congtienhang: '5000000',
    duno: '-4000000',
    tratien: '1000000',
    ghichu: 'mang thieu tien',
    ID: 'o8eLmOIfqCYHh732wvYgUZ9oP1xXcf6C'
  },
  {
    nhacungcap: 'le van sinh',
    ngaythangnam: '16/11/2019',
    congtienhang: '4000000',
    duno: '0',
    tratien: '4000000',
    ghichu: 'test du lieu',
    ID: '9d5fGc7YmHG77tALk0WYU4klc4Evwb9s'
  }
];

const getAllData = () => {
  return db.read().value();
};

// Khach hang
const getKhachHang = () => {
  const khachhangData = db.get('khachhang').value();
  return khachhangData;
};

const addKhachHang = khachhangInfo => {
  db.get('khachhang')
    .push(khachhangInfo)
    .write();
};

interface FindingDonHang {
  masodonhang: string;
  tenkhachhang?: string;
}
// Tìm kiếm đơn hàng theo tên khách hàng và masodonhang
const getDataByNameAndMaSoDonHang = (params: FindingDonHang) => {
  if (params === undefined || params.masodonhang === '') return null;
  const data = db
    .get('donhang')
    .find({ masodonhang: params.masodonhang })
    .value();
  return data;
};

// Lưu đơn hàng mới
const postNewDonHang = donhang => {
  console.log('luu 1 don hang moi');
  db.get('donhang')
    .push(donhang)
    .write();
};

// Lưu đơn hàng EDIT
const postUpdateDonHang = donhang => {
  console.log('luu 1 don hang chinh sua');
  // db.get('donhang')
  //   .find({ masodonhang: donhang.masodonhang })
  //   .assign(donhang)
  //   .write();
};

const postLuuDonHang = donhang => {
  // Chung:
  //  -- Xử lý mã số đơn hàng
  //  -- Lưu ngày lập đơn hàng bằng Lib Momentjs
  //  -- Chuyển dữ liệu số về type number

  // TH1: Tồn tại khách hàng
  //    + Sử dụng lại "khachhangID", "tenkhachhang" trong đơn hàng -> lấy từ
  //       khachhangData
  const khachhangData = getKhachHang();
  if (khachhangData === null || khachhangData.length === 0) {
    console.log('chua co khach hang nay');
    addKhachHang({
      tenkhachhang: donhang.tenkhachhang,
      sodienthoai: donhang.sodienthoai,
      khachhangID: donhang.khachhangID
    });
  } else {
    const matched = khachhangData.filter(
      khachhang => khachhang.khachhangID === donhang.khachhangID
    );
    if (matched === null || matched.length === 0) {
      addKhachHang({
        tenkhachhang: donhang.tenkhachhang,
        sodienthoai: donhang.sodienthoai,
        khachhangID: donhang.khachhangID
      });
    }
  }
  const isMaSoDonHangExist = db
    .get('donhang')
    .find({
      masodonhang: donhang.masodonhang
    })
    .value();

  if (isMaSoDonHangExist !== undefined) {
    postUpdateDonHang(donhang);
  } else {
    postNewDonHang(donhang);
  }
  // TH2: Không tồn tại khách hàng
  // db.get('donhang')
  //   .push(donhang)
  //   .write();
  // return true;
};

export {
  getAllData,
  postLuuDonHang,
  getKhachHang,
  getDataByNameAndMaSoDonHang
};

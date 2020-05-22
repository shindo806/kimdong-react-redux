import { atom } from 'recoil';

const tempData = atom({
  key: 'tempData',
  default: localStorage.getItem('tempData')
    ? JSON.parse(localStorage.getItem('tempData'))
    : []
});

export default tempData;

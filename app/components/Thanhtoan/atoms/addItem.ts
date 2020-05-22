import { atom } from 'recoil';

const addItem = atom({
  key: 'addItem',
  default: false
});

export default addItem;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

function check() {
  const isMaSoDonHangExist = db
    .get('donhang')
    .find({
      masodonhang: '012405'
    })
    .value();
  if (isMaSoDonHangExist !== undefined) return isMaSoDonHangExist;
  return null;
}

check();

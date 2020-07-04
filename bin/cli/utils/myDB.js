const writeToFiles = require("./writeToFiles");

function MyDB(data, source) {
  this.data = data;
  this.source = source;
}

MyDB.prototype.get = function (subject) {
  const sub = this.data[subject];
  if (sub === undefined) {
    return this;
  } else {
    return new MyDB(sub);
  }
};

MyDB.prototype.post = async function (subject, newItem) {
  const pos = this.data[subject]
    .map((item) => item.id)
    .indexOf("" + newItem.id);

  if (pos !== -1) return false;
  this.data[subject].push(newItem);
  await writeToFiles(this.source, this.data);

  return true;
};

MyDB.prototype.put = async function (subject, newItem) {
  const pos = this.data[subject]
    .map((item) => item.id)
    .indexOf("" + newItem.id);

  if (pos === -1) return false;
  this.data[subject].splice(pos, 1, newItem);
  await writeToFiles(this.source, this.data);
  return true;
};

MyDB.prototype.delete = async function (id) {
  const pos = this.data[subject].map((item) => item.id).indexOf(id);
  if (pos === -1) return false;

  this.data[subject].splice(pos, 1);
  await writeToFiles(this.source, this.data);

  return true;
};

MyDB.prototype.value = function () {
  return this.data;
};

module.exports = MyDB;

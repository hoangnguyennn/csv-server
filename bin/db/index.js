function MyDB(initialData, source) {
  this.initialData = initialData;
  this.source = source;
  this.currentData = initialData;
}

MyDB.isMatch = function (item, filter) {
  let isEqual = true;
  for (const key in filter) {
    if (item[key] !== filter[key]) {
      isEqual = false;
      break;
    }
  }

  return isEqual;
};

MyDB.prototype.get = function (model) {
  this.currentData = this.initialData[model];
  return this;
};

MyDB.prototype.find = function (filter = {}) {
  this.currentData = this.currentData.filter((item) => {
    return MyDB.isMatch(item, filter);
  });

  return this;
};

MyDB.prototype.findOne = function (filter = {}) {
  this.currentData = this.currentData.find((item) => {
    return MyDB.isMatch(item, filter);
  });

  return this;
};

MyDB.prototype.value = function () {
  const result = this.currentData;
  this.currentData = this.initialData;
  return result;
};

module.exports = MyDB;

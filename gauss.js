"use strict";

class Matrix {
  constructor(arr) {
    this.arr = arr;
  }

  get(i, j) {
    if (i < 1
      || j < 1 
      || i > this.arr.length
      || i > this.arr.length)
      throw new Error(`outbound exception: estas intentando sacar un número 
      de una posición equivocada. (${i}, ${j})`);
    return this.arr[i-1][j-1];
  }

  showData() {
    console.table(this.arr);
  }
}

const fn = {
  logMatrix: (m) => {console.table(m.arr)}
};

module.exports = { ...fn, Matrix };

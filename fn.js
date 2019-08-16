"use strict";

class Matrix {
  constructor(name = 'no name') {
    this.name = name;
  }

  sayHi() {
    console.log(this.name);
  }
}

const fn = {
  log: () => console.log
};

module.exports = { ...fn, Matrix };

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

  getFirstNonZeroColumnIndex(params = {}) {
    let [i, j, val] = [0, 0, 0];
    for (j = 0; j < this.arr[0].length; j++) {
      for (i = 0; i < this.arr.length; i++) {
        val = this.arr[i][j];
        if (val != 0) {
          i++;j++;
          if (params.returnIJ) return {i, j};
          return j;
        }
      }
    }
    return -1;
  }

  swapRows(i1, i2) {
    
    this.arr = [...this.arr].map((row, index, sourceArr) => {
      if ((index + 1) == i1) return sourceArr[i2 - 1];
      else if ((index + 1) == i2) return sourceArr[i1 - 1];
      return row;
    });

    return this;
  }

  rowScalar(params) {

    // console.log(params);

    if (!params.rowToOperate) {
      for (let i = 0; i < this.arr.length; i++) {
        const newParams = {...params, rowToOperate: {i: i+1}};
        this.rowScalar(newParams);
      }
    } else {

      const row = this.arr[params.rowToOperate.i - 1];
      const scalar = params.scalar;
      const fromCol = (params.rowToOperate.fromCol | 1) - 1;
      let val;
      for (let col = fromCol; col < row.length; col++) {
        row[col] = row[col] * scalar;
      }
    }
    
  }

  /**
   * obtener ceros debajo de este elemento delantero, sumando 
   * múltiplos adecuados del renglón superior a los renglones debajo de él
   *
   * @param {*} j
   * @memberof Matrix
   */
  colOperations(j) {
    let col = j-1, i;
    let pivote = 0;
    const params = {};
    for (i = 0; i < this.arr.length; i++) {
      pivote = this.arr[i][col];
      if (pivote > 0) {
        params.pivote = {
          i, j: col
        };
        break;
      }
    }

    let [val, scalar] = [0, 0];
    for (++i; i < this.arr.length; i++) {
      val = this.arr[i][col];
      if (val > 0) {
        scalar = -(pivote / val);
        params.rowToOperate = { i };
        params.scalar = scalar;
        
        this.matrixOps(fn.CONSTANTS.ROW_OPS.SUM_SCALAR_ROWS, params);
      }
    }
    
  }

  matrixOps(op, params) {
    console.log('operación de fila:', params);

    switch (op) {
      case fn.CONSTANTS.ROW_OPS.SUM_SCALAR_ROWS:
        const pivoteRow = this.arr[params.pivote.i];
        const row = this.arr[params.rowToOperate.i];
        console.log('row before', row);
        for (let col = params.pivote.j; col < row.length; col++) {
          row[col] = (row[col] * params.scalar) + pivoteRow[col];
        }
        console.log('row after', row);
        // fn.logMatrix(this);
        break;
    
      default:
        break;
    }
  }

  showData() {
    console.table(this.arr);
  }

  equals(m) {
    // console.log(JSON.stringify(this), JSON.stringify(m));
    
    let [i, j] = [0, 0];
    for (j = 0; j < this.arr[0].length; j++) {
      for (i = 0; i < this.arr.length; i++) {
        if (m.arr[i][j] != this.arr[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  clone() {
    return new Matrix([...this.arr].map(row => [...row]));
    // return Object.assign(new Matrix([]), this);
  }
}

const fn = {
  logMatrix: (m) => {console.table(m.arr)},
  CONSTANTS: {
    ROW_OPS: {
      SUM_SCALAR_ROWS: 'SUM ROW OP'
    }
  }
};

module.exports = { ...fn, Matrix };

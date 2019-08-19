"use strict";

const Matrix = require("./gauss").Matrix;
const logMatrix = require("./gauss").logMatrix;

test("new matrix created", () => {
  expect(new Matrix([
    [1, 2, 3],
    [1, 2, 3].map(val => val + 3),
    [1, 2, 3].map(val => val + 6)
  ])).toBeInstanceOf(Matrix);
});

const m = new Matrix([
  [1, 2, 3],
  [1, 2, 3].map(val => val + 3),
  [1, 2, 3].map(val => val + 6)
]);
// logMatrix(m);

test("outbound error on get matrix element out of range", () => {

  const testFn = () => m.get(0, 1);
  
  expect(testFn).toThrowError(/outbound/);
});

test("get matrix element", () => {
  
  expect(m.get(1, 2)).toBe(2);
  expect(m.get(2, 2)).toBe(5);
  expect(m.get(3, 3)).toBe(9);
});

test("find first no zero col", () => {
  
  expect(m.getFirstNonZeroColumnIndex()).toBe(1);
  const m2 = new Matrix([
    [0, 0, 3],
    [0, 2, 3],
    [0, 2, 3]
  ]);
  // logMatrix(m);
  expect(m2.getFirstNonZeroColumnIndex()).toBe(2);
  // expect(JSON.stringify(m2.getFirstNoZeroColumnIndex({returnIJ: true}))).toBe(JSON.stringify({i: 2, j: 2}));
  expect(m2.getFirstNonZeroColumnIndex({returnIJ: true})).toEqual({i: 2, j: 2});
});

test("matrix equals method", () => {

  expect(m.equals(m.clone())).toBeTruthy();
  const m2 = new Matrix([
    [0, 0, 3],
    [0, 2, 3],
    [0, 2, 3]
  ]);
  expect(m.equals(m2)).not.toBeTruthy();
  const m3 = m2.clone();
  m2.arr[0][0] = 5;
  expect(m3.equals(m2)).not.toBeTruthy();
});


test("swap rows with a matrix", () => {
  const m2 = new Matrix([
    m.arr[1],
    m.arr[0],
    m.arr[2]
  ]);
  expect(m.swapRows(1, 2)).toEqual(m2);
  // expect(m.swapRows(1, 2).equals(m2)).toBeTruthy();
});

test("swap rows operations", () => {

  const m2 = new Matrix([
    [0, 0, 3],
    [0, 2, 3],
    [0, 2, 3]
  ]);

  // 1. Ir a la primera columna no cero de izquierda a derecha.
  const {i, j} = m2.getFirstNonZeroColumnIndex({returnIJ: true});
  
  // 2. Si la primera fila tiene un cero en esta columna, intercambiarlo con otra que no lo tenga.
  if (i != 1) {
    m2.swapRows(1, i);
  }
  expect(JSON.stringify(m2.arr)).toBe(JSON.stringify([
    [0, 2, 3],
    [0, 0, 3],
    [0, 2, 3]
  ]));
});

test("operate scalar row matrix", () => {

  const m2 = new Matrix([
    [0, 2, 3],
    [0, 0, 5],
    [0, 2, 3]
  ]);

  const params = {
    scalar: 2,
    rowToOperate: {i: 3}
  }

  const m3 = m2.clone();
  m2.rowScalar(params);

  expect(m2.get(3, 1)).toBe(m3.get(3, 1) * params.scalar);
  expect(m2.get(3, 2)).toBe(m3.get(3, 2) * params.scalar);
  expect(m2.get(3, 3)).toBe(m3.get(3, 3) * params.scalar);

});

test("operate scalar matrix", () => {

  const m2 = new Matrix([
    [0, 2, 3],
    [0, 0, 5],
    [0, 2, 3]
  ]);

  const params = {
    scalar: 2
  }

  const m3 = m2.clone();
  m2.rowScalar(params);

  expect(m2.get(1, 1)).toBe(m3.get(1, 1) * params.scalar);
  expect(m2.get(2, 2)).toBe(m3.get(2, 2) * params.scalar);
  expect(m2.get(3, 3)).toBe(m3.get(3, 3) * params.scalar);

});



test("col operations to obtain zeros under first no zero value of matrix", () => {

  const m2 = new Matrix([
    [0, 0, 5],
    [0, 2, 3],
    [0, 2, 3]
  ]);

  // 1. Ir a la primera columna no cero de izquierda a derecha.
  const {i, j} = m2.getFirstNonZeroColumnIndex({returnIJ: true});
  
  // 2. Si la primera fila tiene un cero en esta columna, intercambiarlo con otra que no lo tenga.
  if (i != 1) {
    m2.swapRows(1, i);
  }
    // [0, 2, 3],
    // [0, 0, 5],
    // [0, 2, 3]
  /**
   * 3. Luego, obtener ceros debajo de este elemento delantero, sumando 
   * múltiplos adecuados del renglón superior a los renglones debajo de él.
   *  */ 
  m2.colOperations(j);

  expect(m2.get(2, 2)).toBe(0);
  expect(m2.get(3, 2)).toBe(0);
  expect(m2.get(3, 3)).toBe(0);
/*
  expect(JSON.stringify(m2.arr)).toBe(JSON.stringify([
    [0, 2, 3],
    [0, 0, 5],
    [0, 0, 0]
  ]));*/
  // 4. Cubrir el renglón superior y repetir el proceso anterior con la submatriz restante. Repetir con el resto de los renglones (en este punto la matriz se encuentra en forma escalonada).
});
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
logMatrix(m);

test("outbound error on get matrix element out of range", () => {

  const testFn = () => m.get(0, 1);
  
  expect(testFn).toThrowError(/outbound/);
});

test("get matrix element", () => {
  
  expect(m.get(1, 2)).toBe(2);
  expect(m.get(2, 2)).toBe(5);
  expect(m.get(3, 3)).toBe(9);
});

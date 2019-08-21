var linSolve = require("robust-linear-solve")
var A = [ [1, 0, -1, -1/2],
          [1/3, -1, 0, 0],
          [1/3, 1/2, -1, 1/2],
          [1/3, 1/2, 0, -1] ]

var A = [ [1, 0, 0, 0],
          [0, -1, 0, 0],
          [0, 0, 2, 0],
          [0, 0, 0, -1] ]

var b = [0, 0, 0, 0]

var result = linSolve(A, b);
var resultValues = result.reduce((acc, val, i, srcArr) => {
    if (i+1 == srcArr.length) return acc;
    const denom = srcArr[srcArr.length-1];
    const rest = denom.reduce((accd, vald, indd, srdd) => {
        accd[`x${i+1}[${indd}]`] = val / vald;
        return accd;
    }, {});
    acc = {...acc, ...rest};
    return acc;
}, {});
console.log(result);
console.log(resultValues);
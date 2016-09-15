
var calculator = require("./calculator.js");
console.log('[calculatorClient.js] - calculator = ', calculator);

var n1 = 50,
	n2 = 10;

console.log(calculator.add(n1,n2));
console.log(calculator.subtract(n1,n2));
console.log(calculator.multiply(n1,n2));
console.log(calculator.divide(n1,n2));
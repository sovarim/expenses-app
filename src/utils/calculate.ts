export type CalculateFunctionType = '*' | '/' | '+' | '-';

const calculate = (a: number, b: number, type: CalculateFunctionType) => {
  switch (type) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return a + b;
  }
};

export default calculate;

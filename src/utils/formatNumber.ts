const formatNumber = (num: number) => {
  return num
    .toString()
    .split('')
    .reverse()
    .map((digit, i) => (i % 3 === 0 ? `${digit} ` : digit))
    .reverse()
    .join('')
    .trim();
};

export default formatNumber;

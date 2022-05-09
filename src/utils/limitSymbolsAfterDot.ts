export default (str: string, limit: number) => {
  const splitted = str.split('.');
  if (splitted[1]) {
    splitted[1] = splitted[1].slice(0, limit + 1);
  }
  return splitted.join('.');
};

//validate an input for long and lat
const inputValidation = (pattern, value) => {
  if (value.length > 0) {
    const regex = new RegExp(pattern);
    const matches = regex.test(value);
    return matches;
  }
  return true;
};


export { inputValidation };

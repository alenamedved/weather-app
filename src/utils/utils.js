//validate an input for long and lat
const inputValidation = (pattern, value) => {
  if (value.length > 0) {
    const regex = new RegExp(pattern);
    const matches = regex.test(value);
    return matches;
  }
  return true;
};


const formateDate = (str) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(str)
  return date.toLocaleDateString("en-US", options)
}

export { inputValidation, formateDate };

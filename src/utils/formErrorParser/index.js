const addPeriodToString = (string) => {
  if (typeof string === 'string') {
    const punctuation = new Set(['.', ',', ':', '!', '?']);
    if (punctuation.has(string.substr(-1))) {
      return string;
    }
    return `${string}.`;
  }
  return string;
};

const getErrorMessages = (error) => {
  if (typeof error === 'object') {
    // For form validation from DRF, comes back as an object of fields:errors
    if (error.response && error.response.data && typeof error.response.data === 'object') {
      return Object.keys(error.response.data).map(key => addPeriodToString(`${key}: ${error.response.data[key].length ? error.response.data[key] : error.response.data[key][0]}`));
    }
    // Some request responses contain a .message, as well as JS errors let's
    // try to use the request data or message before the or base JS errors check
    const message = (
      error.response && (error.response.data || error.response.message)
    ) || error.message || error;
    return [addPeriodToString(message)];
  }
  if (typeof error === 'string') {
    return [addPeriodToString(error)];
  }
  return ['Unknown error.'];
};

export {
  getErrorMessages,
  addPeriodToString,
};

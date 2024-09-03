export default (data, message, status = false) => {
  return { response: data, message, status };
};

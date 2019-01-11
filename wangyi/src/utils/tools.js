let tools = {};
tools.deleteKey = function (arr, querydata) {
  for (var key in arr) {
    if (arr[key] === '' || arr[key] === null) {
      delete querydata[key];
    }
  }
};
export default tools;
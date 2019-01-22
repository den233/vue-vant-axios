 
export const deleteKey = function  (arr, querydata) {
  var jsonObj = JSON.parse(querydata);
  for (var key in arr) {
    if (arr[key] == "" || arr[key] == null) {
      delete jsonObj[key];
      
    }
  }
  return jsonObj
};
 
export function addToObject(obj, key, value, index) {
  var temp = {};
  var i = 0;
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (i === index && key && value) {
        temp[key] = value;
      }
      temp[prop] = obj[prop];
      i++;
    }
  }
  if (!index && key && value) {
    temp[key] = value;
  }
  return temp;
}

function randomString() {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 30;
  var randomstring = '';
  for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
  }
  return randomstring;
}

function findIndexById(array, id) {
  var index = -1;
  for (var i = 0, num = array.length; i < num; i++) {
    if (array[i].id == id) return i;
  }
  return index;
}


function stringify(array) {
  var str = "[";
  for(var i = 0; i < array.length; i++) {
    str += " "+array[i].id+", ";
  }
  str += "]";
  return str;
}
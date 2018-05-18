const md5 = require('md5');
//生成通行证sign
export const sigin = (params) => {
  let objKeys = Object.keys(params);
  objKeys = objKeys.sort();
  let sign = '';
  for (let i = 0; i < objKeys.length; i++) {
    let keyValue = objKeys[i] + '=' + params[objKeys[i]];
    if (i != 0) {
      keyValue = '&' + keyValue;
    }
    sign += keyValue;
  }
  sign += '671A9493ABCF835F5096D28165FD4562';//固定字符串?
  return md5(sign);
};

//参数转化成特定格式字符串(key=value&key=value&key=value...)
export const paramsToString = (params) => {
  let objKeys = Object.keys(params);
  objKeys = objKeys.sort();
  let paramsString = '';
  for (let i = 0; i < objKeys.length; i++) {
    let keyValue = objKeys[i] + '=' + params[objKeys[i]];
    if (i != 0) {
      keyValue = '&' + keyValue;
    }
    paramsString += keyValue;
  }
  return paramsString;
};

//验签
//serverTimeStamp //服务器获取的时间戳
//serverSaltCode  //服务器获取的盐值
//params          //上行参数
export const serverSign = (serverTimeStamp, serverSaltCode, params = {}) => {

  let stamp = parseInt(serverTimeStamp) * 1000;
  let newDate = new Date(stamp);
  let day = newDate.getDate();

  let ciphertext = serverEncrypt(serverSaltCode, day);

  let sign = ciphertext + JSON.stringify(params) + ciphertext;

  let md5Sign = md5(sign);

  return md5Sign;

};

//服务器加密
export const serverEncrypt = (code, day) => {
  {
    try {
      //转十进制数组
      var encrypt_arr = [];
      //字符串转成字符数组
      //1 正则表达式
      var string = code;
      //var obj = "string".replace(/(.)(?=[^$])/g, "$1,").split(","); //字符串转化为数组
      //2 split
      var obj2 = string.split(''); //字符串转化为数组
      for (var i = 0; i < obj2.length; i++) {
        var tem = obj2[i].charCodeAt();
        encrypt_arr.push(tem);
      }
      //alert(encrypt_arr);

      //1.i为奇数时减去i的2倍+今天的日期day，替换原位（注释部分是上1位替换偶数位）
      for (var i = 0; i < encrypt_arr.length; i++) {
        var t;
        if (i % 2 != 0) {
          t = encrypt_arr[i] - i * 2 + day;
          encrypt_arr[i] = t; //替换掉对应位置的值
          // ios对应代码           [encrypt_arr exchangeObjectAtIndex:i-1 withObjectAtIndex:i];
        }
      }
      //console.log("第一步输出："+encrypt_arr);

      for (var i = 0; i < encrypt_arr.length; i++) {
        var t = encrypt_arr[i];
        //        NSLog(@"-----t:%d",t);
        //2.将第1步的结果跟i模3进行异或运算
        t = t ^ (i % 3);
        //3.将第2步的结果右移3位
        t = t >> 3;

        //4.当i模3等于0时，将第3步的结果向左移2位
        if (i % 3 == 0) {
          t = t << 2;
        } else {
          //否则将第3步的结果和当前数组元素进行异或运算
          t = t ^ encrypt_arr[i];
        }
        encrypt_arr[i] = t; //替换掉对应位置的值
        //[encrypt_arr replaceObjectAtIndex: i withObject: [NSString stringWithFormat: @"%d", t]];
      }
      //console.log("第二步输出："+encrypt_arr);

      //运算结果转字符串 并 md5
      var encrypt_strTemp = encrypt_arr.join('');
      var encrypt_str1 = md5(encrypt_strTemp);
      //console.log("Md5加密后输出："+encrypt_arr);

      return encrypt_str1;
    } catch (e) {
      console.log(e);
    }
  }
};

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

window.onload = function () {
  if (~navigator.userAgent.toLowerCase().indexOf('micromessenger')) {
    alert('微信');
    var $wx_account = wxdata.wx_account, // 自定义数据，见wxShare_data.js
      $wx_share = wxdata.wx_share;   // 自定义数据  ，见wxShare_data.js

//配置微信信息
    wx.config({
      debug: false,    // true:调试时候弹窗
      appId: $wx_account[0],  // 微信appid
      timestamp: $wx_account[1], // 时间戳
      nonceStr: $wx_account[2],  // 随机字符串
      signature: $wx_account[3], // 签名
      jsApiList: [
        // 所有要调用的 API 都要加到这个列表中
        'onMenuShareTimeline',       // 分享到朋友圈接口
        'onMenuShareAppMessage',  //  分享到朋友接口
        'onMenuShareQQ',         // 分享到QQ接口
        'onMenuShareWeibo'      // 分享到微博接口
      ]
    });
    wx.ready(function () {
      // 微信分享的数据
      var shareData = {
        'imgUrl': $wx_share[0],    // 分享显示的缩略图地址
        'link': $wx_share[1],    // 分享地址
        'desc': $wx_share[2],   // 分享描述
        'title': $wx_share[3],   // 分享标题
        success: function () {

          // 分享成功可以做相应的数据处理

          alert('分享成功');
        }
      };
      wx.onMenuShareTimeline(shareData);
      wx.onMenuShareAppMessage(shareData);
      wx.onMenuShareQQ(shareData);
      wx.onMenuShareWeibo(shareData);
    });

    wx.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，
      // 具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
      //对于SPA可以在这里更新签名。
      alert('好像出错了！！');
    });
    var wxdata = {
      wx_account: new Array(4),
      wx_share: new Array(4),
      wx_myuser: new Array('appid', 'appsecret'),

      access_token: '', // 凭证
      token_expires_in: '', // 凭证过期时间 单位：s
      jsapi_ticket: '', // 凭证
      ticket_expires_in: '', // 凭证过期时间 单位：s
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + wxdata.wx_myuser[0] + '&secret=' + wxdata.wx_myuser[1],

      // 获取access_token
      // *注意* 经过实际开发测试，微信分享不支持跨域请求，因此获取access_token的请求必须从服务器发起，否则无法获取到access_token
      get_access_token: function () {
        $.ajax({
          type: 'GET',
          url: wxdata.url,
          dataType: 'jsonp',  // 解决跨域问题，jsonp不支持同步操作
          cache: false,
          //  jsonp :'callback',
          success: function (msg) {
            // 获取正常 {"access_token":"ACCESS_TOKEN","expires_in":7200}
            // 获取失败 {"errcode":40013,"errmsg":"invalid appid"}
            wxdata.access_token = msg.access_token;  // 获取到的交互凭证  需要缓存，存活时间token_expires_in  默认为7200s
            wxdata.token_expires_in = msg.expires_in;  // 过期时间 单位：s
            if (access_token != '' || access_token != null) {
              console.log('get access_token  success： ' + wxdata.access_token);
            } else {
              console.log('get access_token  fail ' + wxdata.access_token);
            }
          },
          error: function (msg) {
            alert('get access_token error!!  ： ');
          }
        });
      },

      // 获取jsapi_ticket
      // *注意* 经过实际开发测试，微信分享不支持跨域请求，因此获取jsapi_ticket的请求必须从服务器发起，否则无法获取到jsapi_ticket
      get_jsapi_ticket: function () {
        $.ajax({
          type: 'GET',
          url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + wxdata.access_token + '&type=jsapi',
          dataType: 'jsonp',
          cache: false,
          async: false,
          jsonp: 'callback',
          success: function (msg) {
            /*
                {
                    "errcode":0,
                    "errmsg":"ok",
                    "ticket":"e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA",
                    "expires_in":7200
                }
            */
            if (msg.errcode == 0) {
              wxdata.jsapi_ticket = msg.ticket;  // 需要缓存，存活时间ticket_expires_in  默认为7200s
              wxdata.ticket_expires_in = msg.expires_in;  // 过期时间 单位：s
              console.log('get jsapi_ticket  success');
            } else {
              console.log('get jsapi_ticket  fail');
            }
          },
          error: function (msg) {
            alert('get jsapi_ticket  error!!! ');
          }
        });
      },
      // 数据签名
      create_signature: function (nocestr, ticket, timestamp, url) {
        var signature = '';
        // 这里参数的顺序要按照 key 值 ASCII 码升序排序
        var s = 'jsapi_ticket=' + ticket + '&noncestr=' + nocestr + '×tamp=' + timestamp + '&url=' + url;
        return hex_sha1(s);
      },

      // 自定义创建随机串 自定义个数0 < ? < 32
      create_noncestr: function () {
        var str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var val = '';
        for (var i = 0; i < 16; i++) {
          val += str.substr(Math.round((Math.random() * 10)), 1);
        }
        return val;
      },

      // 自定义创建时间戳
      create_timestamp: function () {
        return new Date().getSeconds();
      }

    };

//wxdata.get_access_token();  // 1
    wxdata.access_token = 'B06fRIti5GDmvNLKsV5OkJ4fU1qd3YyyW0cgwenxhqI7XwmpTrpwY6Uc7nNtnumdJvnPJXcACAVPD';  //2

//wxdata.get_jsapi_ticket();  //3
    wxdata.jsapi_ticket = 'XGEs8VD-_kgoxt8jcijupT7j_EA-nP07ro_MmUNDVD0oR8unfqY4C_YIMXAQvhztlTk8j2A';  //4

//  ----- 5 开始 ------
    var timestamp = wxdata.create_timestamp();   // timestamp
    var noncestr = wxdata.create_noncestr();  // noncestr
    var url = window.location.href;

    wxdata.wx_account[0] = wxdata.wx_myuser[0];  // appid
    wxdata.wx_account[1] = timestamp;   // timestamp
    wxdata.wx_account[2] = noncestr; // noncestr
    wxdata.wx_account[3] = wxdata.create_signature(noncestr, wxdata.jsapi_ticket, timestamp, url);//signature

    wxdata.wx_share[0] = 'http://www.123456.com/img/123.jpg';  // share_img 分享缩略图图片
    wxdata.wx_share[1] = window.location.href;// share_link  分享页面的url地址，如果地址无效，则分享失败
    wxdata.wx_share[2] = 'this is share_desc';// share_desc
    wxdata.wx_share[3] = 'this is share_title';// share_title
//   --------   5 结束 ----------
  } else {
    // alert('其他');
    console.log(hex_sha1('fasdad'))
  }
};

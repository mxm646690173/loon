const $ = new Env('Amazfit');
$.is_debug = ($.isNode() ? process.env['IS_DEDUG'] : $.getdata('is_debug')) || 'false';  // 调试模式
$.appid = 'wxdc6539f76ccaaca6';  // 小程序 appId
$.kdtid = '17817733';
$.accessToken = ($.isNode() ? process.env['AMAZFIT_ACCESSTOKEN'] : $.getdata('amazfit_access_token')) || '';  // access_token
$.checkinId = '2517973';
$.messages = [];

// function Notify_Demo()
// {
//     var Title,SubTitle,Content;
//     Title = "我是主标题";
//     SubTitle  = "我是子标题";
//     Content = $request;
//     console.log($request);
//     $notification.post(Title,SubTitle,Content);
// }

function getParams(){
    let obj = $request.url.split('?')[1];
    let kdtid = obj.kdt_id;
    let accessToken = obj.access_token;
    Write_PeristentStore('AMAZFIT_KDTID',kdtid);
    Write_PeristentStore("AMAZFIT_ACCESSTOKEN",accessToken);
}

async function main(){
    console.log(`accessToken为：${Read_PeristentStore(AMAZFIT_ACCESSTOKEN)}`);
}

// 脚本执行入口
if (typeof $request !== `undefined`) {
    getParams();
    $.done();
  } else {
    !(async () => {
      await main();  // 主函数
    })()
      .catch((e) => $.messages.push(e.message || e) && $.logErr(e))
      .finally(async () => {
        await sendMsg($.messages.join('\n').trimStart().trimEnd());  // 推送通知
        $.done();
      })
  }

  //读取
  function Read_PeristentStore(key)//读取写入的数据
{
    var ReadKey = key;//上一个API写入数据的KEY名称
    var ReadResult = $peristentStore.read(ReadKey);
    return ReadResult
}

  //存储
  function Write_PeristentStore(key,value)//写入存储区
{
    $peristentStore.write(value,key);//参数分别代表:写入的数据,数据存储的Key名称，用于取出数据
}


  /**
 * 数据脱敏
 * @param {string} string - 传入字符串
 * @param {number} head_length - 前缀展示字符数，默认为 2
 * @param {number} foot_length - 后缀展示字符数，默认为 2
 * @returns {string} - 返回字符串
 */
function hideSensitiveData(string, head_length = 2, foot_length = 2) {
    try {
      let star = '';
      for (var i = 0; i < string.length - head_length - foot_length; i++) {
        star += '*';
      }
      return string.substring(0, head_length) + star + string.substring(string.length - foot_length);
    } catch (e) {
      return string;
    }
  }

  /**
 * 对象属性转小写
 * @param {object} obj - 传入 $request.headers
 * @returns {object} 返回转换后的对象
 */
function ObjectKeys2LowerCase(obj) {
    const _lower = Object.fromEntries(Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v]))
    return new Proxy(_lower, {
      get: function (target, propKey, receiver) {
        return Reflect.get(target, propKey.toLowerCase(), receiver)
      },
      set: function (target, propKey, value, receiver) {
        return Reflect.set(target, propKey.toLowerCase(), value, receiver)
      }
    })
  }

  // 发送消息
async function sendMsg(message) {
    if (!message) return;
    try {
      if ($.isNode()) {
        try {
          var notify = require('./sendNotify');
        } catch (e) {
          var notify = require('./utils/sendNotify');
        }
        await notify.sendNotify($.name, message);
      } else {
        $.msg($.name, '', message);
      }
    } catch (e) {
      $.log(`\n\n----- ${$.name} -----\n${message}`);
    }
  }

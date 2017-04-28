// import Vue from 'vue'
// import VueResource from 'vue-resource'
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true;
Vue.config.devtools = true

// 开发环节RAP，上线发布清空为空字符串
const host = 'http://10.10.11.90:8080/mockjsdata/76'
// const host = ''

function rap(urlList) {
  let obj = {}
  for (var key in urlList) {
    if (urlList.hasOwnProperty(key)) {
      obj[key] = host + urlList[key];
    }
  }
  return obj
}

// 获取url的参数值
function getUrlParam(key) {
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  var r = location.search.substr(1).match(reg)
  if (r) {
    return decodeURI(r[2])
  }
  return ""
};
// 验证手机
function checkphone(phone) {
  let rule = /^1[3,4,5,7,8,9]\d{9}$/
  if (rule.test(phone)) {
    return true
  }
  return false
}
/**
 * 异步获取后台数据
 * @param {string} url 请求的url地址 
 * @param {Object} data 请求的参数对象,默认值为null
 * @return {Promise} 返回一个promise对象
 */
function fetch(url, data = null) {
  let index = url.indexOf('?');
  let clientType = 'qc_client_type=pc';
  if (index > -1) {
    url += '&' + clientType;
  } else {
    url += '?' + clientType;
  }
  return new Promise((resolve, reject) => {
    Vue.http.post(
      url,
      data
    ).then(function(response) {
        let result = response.data
        if(typeof(result) === "string"){
          result = JSON.parse(result);
        }
        if (result.status === 200) {
          resolve(result)
        } else if (result.status === 300) {
          message('请登录');
          setTimeout(function() {
            window.location.href = 'login.html';
          }, 1000);
        } else {
          reject(result)
        }
      },
      function(response) {
        reject({
          status: -1,
          message: '系统错误，请稍后重试'
        })
      })
  })
}


// cookie的set和get，方案来源：http://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/*
 * 信息提示弹窗
 * @param {string} str 信息提示内容
 * @param {number} time 弹窗消失时间 默认为1秒 
 */
function message(str, time) {
    var time = time || 1000;
    var msg = document.querySelector(".messageDig");
    if (msg !== null) {
        msg.innerHTML = str;
        msg.style.display = 'block';
    } else {
        var msg = document.createElement('div');
        msg.setAttribute('class', 'messageDig');
        msg.innerHTML = str;
        document.body.appendChild(msg);
    }
    setTimeout(function() {
        msg.style.display = 'none';
    }, time);
};


function refresh(obj,targetH,callback) { 
  //设备高度 
  let clientH = obj.offsetHeight;   
  // 页面全部高度
  let scrollHeight = obj.scrollHeight;
  // 卷去的页面高度
  let scrollTop =  obj.scrollTop || obj.scrollTop 
  console.log(scrollHeight,scrollTop,clientH)
  // 距离底部50px以内加载数据
  if (scrollHeight - scrollTop - clientH <= targetH) {
    callback()
  }
}

export {
  rap,
  getUrlParam,
  fetch,
  setCookie,
  getCookie,
  message,
  checkphone,
  refresh
}

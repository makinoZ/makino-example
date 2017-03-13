// import Vue from 'vue'
// import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true;

// 开发环节RAP，上线发布清空为空字符串
const host = 'http://rap.qi-cloud.net/mockjsdata/76'
  // const host = ''

function rap(url) {
  let obj = {}
  for (let key in url) {
    if (url.hasOwnProperty(key)) {
      obj[key] = host + url[key]
    }
  }
  return obj
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
// function fetch(url, data = null) {
//   let index = url.indexOf('?')
//   let client = 'qc_client_type=pc'
//   if (index > -1) {
//     url += `&${client}`
//   } else {
//     url += `?${client}`
//   }
//   return new Promise((resolve, reject) => {
//     Vue.http({
//       url: url,
//       method: 'post',
//       params: data
//     }).then(function(response) {
//         let result = response.data
//           // let result
//           // let data = response.data

//         if(typeof data === "string"){
//           result = JSON.parse(data)
//         }else{
//           result = data
//         }

//         if (result.status === 200) {
//           resolve(result)
//         } else {
//           reject(result)
//         }
//       },
//       function(response) {
//         reject({
//           status: -1,
//           message: '系统错误，请稍后重试'
//         })
//       })
//   })
// }

// 获取url的参数值
function getUrlParam(key) {
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  var r = location.search.substr(1).match(reg)
  if (r) {
    return decodeURI(r[2])
  }
  return ""
};

export {
  rap,
  fetch
}

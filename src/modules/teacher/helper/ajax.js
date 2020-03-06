import axios from 'axios';
import Vue from 'vue'

const baseURL = '/jin'
const SUCCESS_CODE = '0'

let getData =  function getData(url) {
  return (data, cb, errorCb) => {
    axios.post(baseURL + url, { ...data })
      .then(result => {
        if(!result) return;
        if(result.code == SUCCESS_CODE) {
          dataBase.loading = false;
          cb && cb(result.data);
        }else {
          dataBase.loading = false;
          Vue.prototype.$alert(result.desc, '提示', {
            confirmButtonText: '确定',
            callback: () => {
              errorCb && errorCb();
            }
          })
        }
      })
  }
}

let getDataSecond = function getDataSecond(url) {
  return (data, cb) => {
    axios.post(baseURL + url, { ...data })
      .then(result => {
        if(!result) return;
        cb(SUCCESS_CODE, result);
      })
  }
}
export {
  getData, getDataSecond
}

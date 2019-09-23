
class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.session = '';
    this.corpID = null;
  }

  fetch({ method, path, header = {}, body = {} }) {
    if (this.session) {
      header = {
        ...header,
        'sessionID': this.session,
      }
    }
    return new Promise((resolve,reject)=>{
      wx.request({
        url:  this.baseUrl + path,
        data:{
          ...body,
          id:this.corpID
        },
        method,
        header,
        success(res){
          resolve(res)
        },
        fail(e){
          reject(e)
        }
      })
    })
  }

  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          console.log("code",res)
          if (res.code) {
            /*api
              .fetch({
                method:"POST",
                path:`/nien-0.0.1-SNAPSHOT/wxmplogin`,
                header:{
                  'content-type': 'application/x-www-form-urlencoded'
                },
                body:{
                  code:res.code,
                  admincode:'pm'
                }
              })
              .then(res => {
                if (res.statusCode === 200 && res.errMsg === 'request:ok' && !res.data.errMsg) {
                  console.log(res);
                  this.session = res.data.sessionID;
                  this.corpID = res.data.corpId;

                  return resolve(res.data)
                } else {
                  return reject(res.data.errMsg)
                }
              })*/
          } else {
            reject(res.errMsg)
          }
        }
      })
    })
  }

  get(path, body) {
    return this.fetch({
      method: 'GET',
      path,
      body
    })
  }

  post(path, body) {
    return this.fetch({
      method: 'POST',
      path,
      body
    })
  }

  put(path, body) {
    return this.fetch({
      method: 'PUT',
      path,
      body
    })
  }

  delete(path, body) {
    return this.fetch({
      method: 'DELETE',
      path,
      body
    })
  }
}

const api = new Api('http:127.0.0.1:3000');
global.api = api;

export default api

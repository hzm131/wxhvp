
class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.sessionId = '';
  }

  fetch ({ method, path, header = {}, body = {} }){
    if (this.sessionId) {
      header = {
        ...header,
        'sessionId': this.sessionId,
      }
    }
    return new Promise((resolve,reject)=>{
      wx.request({
        url:  this.baseUrl + path,
        data:{
          ...body,
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

  login({userInfo} = {}) {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          console.log("code",res)
          if (res.code) {
            api
              .fetch({
                method:"POST",
                path:'/wx/login',
                body:{
                  code:res.code,
                  ...userInfo
                }
              })
              .then(res => {
                  console.log("后台",res)
                if(res.data.status === 200){
                  const sessionId = res.data.sessionId;
                  wx.setStorage({
                    key:"sessionId",
                    data:sessionId
                  })
                  resolve(res.data.data)
                }else{
                  reject(res.err)
                }
              })
          } else {
            reject(res.err)
          }
        }
      })
    })
  }

  get(path, body) {
    const sessionId = wx.getStorageSync('sessionId');
    this.sessionId = sessionId;
    return this.fetch({
      method: 'GET',
      path,
      body
    })
  }

  post(path, body) {
    const sessionId = wx.getStorageSync('sessionId');
    this.sessionId = sessionId;
    return this.fetch({
      method: 'POST',
      path,
      body
    })
  }

  put(path, body) {
    const sessionId = wx.getStorageSync('sessionId');
    this.sessionId = sessionId;
    return this.fetch({
      method: 'PUT',
      path,
      body
    })
  }

  delete(path, body) {
    const sessionId = wx.getStorageSync('sessionId');
    this.sessionId = sessionId;
    return this.fetch({
      method: 'DELETE',
      path,
      body
    })
  }
}

const api = new Api('http://169.254.78.223:3000');

export default api


class Api {
  constructor(baseUrl) {
    wx.getStorage({
      key: 'session_id',
      success (res) {
        console.log("获取到",res.data)
        this.session_id = res.data
      },
    });
    this.baseUrl = baseUrl;
    this.session_id = '';
  }

  fetch({ method, path, header = {}, body = {} }) {
    if (this.session_id) {
      header = {
        ...header,
        'session_id': this.session_id,
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

  login() {
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
                }
              })
              .then(res => {
                  console.log("后台",res)
                if(res.data.status === 200){
                  const session_id = res.data.data.session_id;
                  wx.setStorage({
                    key:"session_id",
                    data:session_id
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

const api = new Api('http://127.0.0.1:3000');
global.api = api;

export default api

import Taro, { Component } from '@tarojs/taro'
import { View, Text,Button } from '@tarojs/components'
import api  from '../../server/api'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () {
    /*wx.getStorage({
      key: 'session_id',
      success (res) {
        console.log(res)

      },
      fail (res) {
        wx.checkSession({
          success () {
            //session_key 未过期，并且在本生命周期一直有效
            console.log("未过期")
          },
          fail () {
            // session_key 已经失效，需要重新执行登录流程
          }
        })
      }
    })*/
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onGotUserInfo = (res)=>{
    console.log("授权",)
    if(res.detail.errMsg ==="getUserInfo:fail auth deny"){
      //取消授权
      return
    }
    const userInfo = res.target.userInfo;
    api.login({
      userInfo
    })
  };
  onQuery = ()=>{
    api.get("/ttt/a").then(res =>{
      console.log("ttt",res)
    })
  }
  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <Button  openType='getUserInfo'  onGetUserInfo={this.onGotUserInfo}>进入小程序</Button>
        <Button    onClick={this.onQuery}>测试</Button>
      </View>
    )
  }
}

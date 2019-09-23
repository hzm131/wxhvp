import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import api from '../../server/api'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () {
    api.login().then((res)=>{
      console.log("res",res)
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}

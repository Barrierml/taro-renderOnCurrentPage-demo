import { Component } from 'react'
import { View, Text,Button } from '@tarojs/components'
import { renderComponentOnCurrentPage, withReactiveRender } from '../../utils/customRender'
import './index.css'

class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onClick = () => {
    renderComponentOnCurrentPage(<Text>我是一个toast！3秒后消失</Text>);
    setTimeout(() => {
      renderComponentOnCurrentPage(null);
    }, 3000);
  }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <Button onClick={this.onClick}>点我为当前页面新加一个元素</Button>
      </View>
    )
  }
}

export default withReactiveRender(Index);

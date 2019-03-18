import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Animated } from 'react-native'
import Alert from '../alert'

export class ContentAwareCard extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { width, style, height, onPress } = this.props
    return (
      <TouchableOpacity onPress={onPress}>
        <Animated.View height={height} width={width} style={style}>
          <Text> textInComponent </Text>
          <Alert />
        </Animated.View>
      </TouchableOpacity>
    )
  }
}

export default ContentAwareCard

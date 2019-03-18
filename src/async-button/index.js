import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated
} from 'react-native'
import PropTypes from 'prop-types'

export default class AsyncButton extends Component {
  static propTypes = {
    buttonWidth: PropTypes.number,
    buttonHeight: PropTypes.number,
    text: PropTypes.string,
    completeText: PropTypes.string,
    completeColor: PropTypes.string,
    loadingColor: PropTypes.string,
    buttonColor: PropTypes.string
  }

  static defaultProps = {
    buttonWidth: 300,
    buttonHeight: 50,
    text: 'GO',
    completeText: 'DONE',
    completeColor: '#36ea8c',
    loadingColor: '#c63ed4',
    buttonColor: '#ee56fc'
  }

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      complete: false,
      buttonBackground: new Animated.Value(300),
      loadingBarWidth: new Animated.Value(0),
      loadingBarOpacity: new Animated.Value(1)
    }

    this._doAsync = this._doAsync.bind(this)
  }

  async _doAsync() {
    this.setState(
      {
        loading: true,
        complete: false,
        loadingBarWidth: new Animated.Value(0),
        loadingBarOpacity: new Animated.Value(1)
      },
      () => {
        Animated.timing(this.state.loadingBarWidth, {
          toValue: this.props.buttonWidth,
          duration: 1000
        }).start(() => {
          this.setState({ loading: false, complete: true })
          Animated.timing(this.state.loadingBarOpacity, {
            toValue: 0,
            duration: 300
          }).start()
        })
      }
    )
  }

  render() {
    const { loadingBarWidth, complete, loadingBarOpacity } = this.state
    const {
      buttonWidth,
      buttonHeight,
      text,
      completeText,
      buttonColor,
      loadingColor,
      completeColor
    } = this.props

    return (
      <View>
        <TouchableOpacity
          style={{
            ...styles.button,
            width: buttonWidth,
            height: buttonHeight,
            backgroundColor: complete ? completeColor : buttonColor
          }}
          onPress={this._doAsync}
        >
          <Text style={{ textAlign: 'center' }}>
            {complete ? completeText : text}
          </Text>

          <Animated.View
            style={{
              ...styles.loadingBar,
              width: loadingBarWidth,
              height: buttonHeight,
              opacity: loadingBarOpacity,
              backgroundColor: loadingColor
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    margin: 10,
    height: 50,
    padding: 5,
    borderRadius: 5
  },
  loadingBar: {
    height: 50,
    borderRadius: 5,
    position: 'absolute',
    top: 0
  }
})

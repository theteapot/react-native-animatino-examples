import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing
} from 'react-native'

export class GrowingMenu extends Component {
  static propTypes = {
    menuHeight: PropTypes.number,
    menuWidth: PropTypes.number,
    buttonWidth: PropTypes.number,
    buttonHeight: PropTypes.number
  }

  static defaultProps = {}

  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false,
      height: new Animated.Value(0),
      width: new Animated.Value(0),
      left: new Animated.Value(100),
      top: new Animated.Value(0),
      opacity: new Animated.Value(0)
    }

    this._openMenu = this._openMenu.bind(this)
  }

  _openMenu() {
    const targetHeight = this.state.menuOpen ? 0 : 200
    const targetWidth = this.state.menuOpen ? 0 : 200
    Animated.parallel([
      Animated.timing(this.state.height, {
        toValue: targetHeight,
        duration: 300
      }),
      Animated.timing(this.state.width, {
        toValue: targetWidth,
        duration: 300
      }),
      Animated.timing(this.state.top, {
        toValue: -targetHeight,
        duration: 300
      }),
      Animated.timing(this.state.left, {
        toValue: -targetWidth + 100,
        duration: 300
      }),
      Animated.timing(this.state.opacity, {
        toValue: this.state.menuOpen ? 0 : 1,
        duration: this.state.menuOpen ? 0 : 150,
        delay: this.state.menuOpen ? 0 : 300
      })
    ]).start()
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  render() {
    const { height, width, left, top, opacity, menuOpen } = this.state
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          style={{
            ...styles.button,
            ...(menuOpen ? styles.buttonOpen : styles.buttonClosed)
          }}
          onPress={this._openMenu}
        >
          <Text>{menuOpen ? 'Close' : 'Open'}</Text>
          <Animated.View style={{ ...styles.menu, height, width, left, top }}>
            <Animated.View style={{ opacity }}>
              {this.props.children}
            </Animated.View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    borderRadius: 5,
    padding: 5
  },
  buttonOpen: { backgroundColor: '#ee56fc' },
  buttonClosed: { backgroundColor: '#9ed2fc' },
  menu: {
    backgroundColor: '#6ab6fc',
    borderRadius: 5,
    position: 'absolute'
  }
})

export default GrowingMenu

import React, { Component } from 'react'
import { Text, View, Animated, StyleSheet, Easing } from 'react-native'
import PropTypes from 'prop-types'

export class Alert extends Component {
  static propTypes = {}

  static defaultProps = {
    alertRadius: 50,
    alertMaxRadius: 55,
    shadowMaxRadius: 60,
    shadowRadius: 50,
    padding: 10,
    shadowColor: '#56c6fc',
    borderColor: '#019ef4',
    alertColor: '#56c6fc'
  }

  constructor(props) {
    super(props)
    const {
      alertRadius,
      shadowRadius,
      alertMaxRadius,
      shadowMaxRadius,
      padding
    } = props

    this.state = {
      radius: new Animated.Value(alertRadius),
      shadowRadius: new Animated.Value(shadowRadius),
      shadowOffset: new Animated.Value(
        7.5 + (shadowMaxRadius - shadowRadius) / 2
      ),
      offset: new Animated.Value(padding + (alertMaxRadius - alertRadius) / 2),
      opacity: new Animated.Value(1)
    }
  }

  componentDidMount() {
    const {
      alertRadius,
      shadowRadius,
      alertMaxRadius,
      shadowMaxRadius,
      padding
    } = this.props

    Animated.loop(
      Animated.parallel([
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 1600
        }),
        Animated.timing(this.state.shadowRadius, {
          toValue: shadowMaxRadius,
          easing: Easing.bounce,
          duration: 1600
        }),
        Animated.timing(this.state.shadowOffset, {
          toValue: 7.5,
          easing: Easing.bounce,
          duration: 1600
        }),

        Animated.sequence([
          Animated.parallel([
            Animated.timing(this.state.radius, {
              toValue: alertMaxRadius,
              duration: 800
            }),
            Animated.timing(this.state.offset, {
              toValue: padding,
              duration: 800
            })
          ]),

          Animated.parallel([
            Animated.timing(this.state.radius, {
              toValue: alertRadius,
              duration: 800
            }),
            Animated.timing(this.state.offset, {
              toValue: 10 + (alertMaxRadius - alertRadius) / 2,
              duration: 800
            })
          ])
        ])
      ])
    ).start()
  }

  render() {
    const { shadowColor, alertColor, borderColor } = this.props
    const { radius, shadowRadius, shadowOffset, offset, opacity } = this.state
    return (
      <View style={styles.alertContainer}>
        <Animated.View
          style={{
            ...styles.alertShadow,
            backgroundColor: alertColor,
            borderRadius: shadowRadius,
            width: shadowRadius,
            height: shadowRadius,
            top: shadowOffset,
            left: shadowOffset,
            opacity: opacity
          }}
        />

        <Animated.View
          style={{
            ...styles.alert,
            backgroundColor: shadowColor,
            borderWidth: 5,
            borderColor: borderColor,
            borderRadius: radius,
            width: radius,
            top: offset,
            left: offset,
            height: radius
          }}
        >
          <Text>!</Text>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  alert: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertContainer: {},
  alertShadow: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Alert

import React from 'react'
import { View, ScrollView, StyleSheet, Animated } from 'react-native'
import Dimensions from 'Dimensions'
import {
  createAppContainer,
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView
} from 'react-navigation'
import { Svg } from 'expo'

export default class CurvyGradientDrawer extends React.Component {
  render () {
    const props = this.props

    const translateX = props.drawerOpenProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100]
    })
    return (
      <Animated.View
        height={Dimensions.get('window').height}
        width={200}
        style={{ opacity: translateX }}
      >
        <Svg
          width={Dimensions.get('window').width}
          height={Dimensions.get('window').height}
          style={{
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          <Svg.Defs>
            <Svg.LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Svg.Stop offset={`0%`} stopColor="#ee0979" stopOpacity="1" />
              <Svg.Stop offset="100%" stopColor="#ff6a00" stopOpacity="1" />
            </Svg.LinearGradient>
          </Svg.Defs>
          <Svg.Path
            d="M25 10 L98 65 L70 25 L16 77 L11 30 L0 4 L90 50 L50 10 L11 22 L77 95 L20 25"
            fill="none"
            stroke="red"
          />
          <Svg.Ellipse
            cx={50}
            cy={Dimensions.get('window').height / 2}
            rx={200}
            ry={Dimensions.get('window').height}
            fill="url(#grad)"
          />
        </Svg>
        <ScrollView>
          <SafeAreaView
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}
          >
            <DrawerItems {...props} />
          </SafeAreaView>
        </ScrollView>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

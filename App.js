import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import AnimatedGratuitousApp from './AnimatedGratuitousApp/AnExApp'
import Dimensions from 'Dimensions'
import { Svg } from 'expo'
import {
  createAppContainer,
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView
} from 'react-navigation'
import CurvyGradientDrawer from './src/curvy-gradient-drawer'
import SlideyTabs from './src/slidey-tabs'
import Card from './src/growing-card'
import ContentAwareList from './src/content-aware-list'

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => <Text>Go</Text>
  }

  componentDidMount() {
    // this.props.navigation.openDrawer()
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            height: 100,
            width: 100,
            position: 'absolute',
            top: 0,
            left: 0
          }}
          source={require('./assets/icon.png')}
        />
        <Text>Home1</Text>
      </View>
    )
  }
}

class MyHomeScreen2 extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home2',
    drawerIcon: ({ tintColor }) => <Text>Go</Text>
  }

  componentDidMount() {
    // this.props.navigation.openDrawer()
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            height: 100,
            width: 100,
            position: 'absolute',
            top: 0,
            left: 0
          }}
          source={require('./assets/icon.png')}
        />
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    )
  }
}

const MyDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: SlideyTabs
    },
    Home2: {
      screen: ContentAwareList
    }
  },
  {
    drawerBackgroundColor: 'transparent',
    contentComponent: CurvyGradientDrawer
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default createAppContainer(MyDrawerNavigator)

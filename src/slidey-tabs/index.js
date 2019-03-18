import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import {
  createAppContainer,
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView,
  createMaterialTopTabNavigator
} from 'react-navigation'
import Cards from '../growing-card'
import ContentAwareList from '../content-aware-list'
import GrowingMenu from '../menu-grow'
import AsyncButton from '../async-button'
import Alert from '../alert'

class SlideyTabs extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => <Text>Go</Text>
  }

  componentDidMount() {
    // this.props.navigation.openDrawer()
  }

  render() {
    return <Cards />
  }
}
const MyTabNavigator = createMaterialTopTabNavigator({
  Alert: Alert,
  AsyncButton: AsyncButton,
  GrowMenu: GrowingMenu,
  Home: SlideyTabs,
  Home2: SlideyTabs,
  List: ContentAwareList
})

export default MyTabNavigator

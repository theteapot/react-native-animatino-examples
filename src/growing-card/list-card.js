import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated
} from 'react-native'
import { createAppContainer } from 'react-navigation'
import { Transition, FluidNavigator } from 'react-navigation-fluid-transitions'
import Alert from '../alert'

export default class ListCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      fadeAnim: new Animated.Value(0)
    }
  }

  componentDidMount = () => {
    Animated.timing(this.state.fadeAnim, {
      delay: this.props.index * 100,
      toValue: 1,
      duration: 200
    }).start()
  }

  render() {
    const { item, index } = this.props
    return (
      <Animated.View style={{ opacity: this.state.fadeAnim }}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            this.props.navigation.navigate('details', { item, index })
          }}
        >
          <Transition shared={`image${index}`}>
            <Image style={styles.image} source={{ uri: item.url }} />
          </Transition>
          <View style={styles.textContainer}>
            <Text style={styles.caption}>Image URI:</Text>
            <Text>{item.url}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    margin: 10,
    padding: 10,
    backgroundColor: '#ECECEC',
    borderColor: '#CCC',
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#EEE',
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    flexDirection: 'row',
    elevation: 3
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 18,
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  caption: {
    fontWeight: 'bold',
    fontSize: 14
  },
  largeImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width
  },
  bottomContainer: {
    backgroundColor: '#ECECEC',
    flex: 1,
    padding: 20
  },
  button: {
    padding: 12,
    backgroundColor: '#CECECE',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

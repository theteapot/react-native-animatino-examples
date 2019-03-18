import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native'
import ContentAwareCard from './card'

export default class ContentAwareList extends Component {
  static defaultProps = {
    cards: [
      {
        height: 200,
        width: Dimensions.get('window').width,
        style: { backgroundColor: 'green' }
      },
      {
        height: 200,
        width: Dimensions.get('window').width,
        style: { backgroundColor: 'yellow' }
      },
      {
        height: 200,
        width: Dimensions.get('window').width,
        style: { backgroundColor: 'red' }
      },
      {
        height: 200,
        width: Dimensions.get('window').width,
        style: { backgroundColor: 'blue' }
      }
    ]
  }

  constructor(props) {
    super(props)

    this.state = {
      height: 200,
      expandedHeight: 500,
      collapsedHeight: 200,
      cards: this.props.cards
    }
  }

  render() {
    const { cards, collapsedHeight, expandedHeight } = this.state
    return (
      <View style={{ flex: 1 }}>
        <ScrollView ref={view => (this._scrollView = view)} style={{ flex: 1 }}>
          {this.state.cards.map(({ height, width, style }, index) => (
            <ContentAwareCard
              key={index}
              index={index}
              height={height}
              width={width}
              style={style}
              expandedHeight={this.state.expandedHeight}
              collapsedHeight={this.state.collapsedHeight}
              scrollViewRef={this._scrollView}
              onPress={async () => {
                let cards = this.state.cards.map((card, i) => ({
                  ...card,
                  height:
                    i === index
                      ? card.height === expandedHeight
                        ? collapsedHeight
                        : expandedHeight
                      : collapsedHeight
                }))
                this.setState({ cards }, () => {
                  setTimeout(() => {
                    const scrollPos = cards.reduce((acc, curr, i) => {
                      if (i <= index) {
                        acc += curr.height
                      }
                      return acc
                    }, 0)
                    const { height } = Dimensions.get('window')
                    const topOffset = (height - expandedHeight) / 2
                    let y = scrollPos - expandedHeight - topOffset
                    this._scrollView.scrollTo({
                      y
                    })
                  }, 15)
                })
              }}
            />
          ))}
        </ScrollView>
      </View>
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

/* eslint-disable curly */
/* eslint-disable no-spaced-func */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {Animated, Dimensions, Modal, PanResponder, View} from 'react-native';

import React from 'react';

export default class BottomModal extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      panY: new Animated.Value (Dimensions.get ('window').height),
      visible: false,
    };
    this.resetPositionAnim = Animated.timing (this.state.panY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    });
    this.closeAnim = Animated.timing (this.state.panY, {
      toValue: Dimensions.get ('window').height,
      duration: 500,
      useNativeDriver: false,
    });

    this.panResponders = PanResponder.create ({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event ([null, {dy: this.state.panY}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gs) => {
        if (gs.dy > 0 && gs.vy > 2) {
          return this.closeAnim.start (this.closeModal);
        }
        return this.resetPositionAnim.start ();
      },
    });
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.visible !== this.state.visible && this.state.visible)
      this.resetPositionAnim.start ();
  }

  openModal = () => this.setState ({visible: true});
  closeModal = () => this.setState ({visible: false});

  handleDismiss = () => this.closeAnim.start (this.closeModal);

  render () {
    const top = this.state.panY.interpolate ({
      inputRange: [-1, 0, 1],
      outputRange: [0, 0, 1],
    });

    return (
      <Modal
        animationType="fade"
        visible={this.state.visible}
        transparent
        onRequestClose={this.handleDismiss}
      >
        <View
          style={{
            backgroundColor: 'rgba(73, 76, 82, 0.66)',
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <Animated.View
            {...this.panResponders.panHandlers}
            style={[
              {
                backgroundColor: 'white',
                paddingTop: 12,
                borderTopRightRadius: 12,
                borderTopLeftRadius: 12,
              },
              {top},
            ]}
          >
            {this.props.children}
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

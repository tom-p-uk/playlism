import React, { Component } from 'react';
import { View } from 'react-native';
import Hamburger from '../components/Hamburger';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AllSongsScreen extends Component {
  onHamburgerPress = () => {
    const { drawerIsOpen, openDrawer, closeDrawer, navigation } = this.props;

    if (drawerIsOpen) {
      closeDrawer();
      navigation.navigate('DrawerClose')
    } else {
      openDrawer();
      navigation.navigate('DrawerOpen')
    }
  }


  render() {
    return (
      <Hamburger
        active={this.props.drawerIsOpen}
        onPress={this.onHamburgerPress}
        color='#F26C4F'
      />
    )
  }
};

const mapStateToProps = ({ nav: { drawerIsOpen } }) => {
  return {
    drawerIsOpen,
  };
};

export default connect(mapStateToProps, actions)(AllSongsScreen);

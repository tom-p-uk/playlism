import React, { Component } from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';

const SearchBarComponent = props => {
  const { input, ...inputProps } = props;

  return (
    <View>
      <SearchBar
        {...inputProps}
        round
        lightTheme
        autoFocus
        // autoCapitalize={false}
        autoCorrect={false}
        // onChangeText={text => this.onChangeText(text)}
        placeholder='Search here...'
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        // value={this.props.searchBarText}
      />
    </View>
  );
};

export default SearchBarComponent;

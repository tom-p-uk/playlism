import React, { Component } from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';

const SearchBarComponent = ({ input, inputProps, showLoadingIcon }) => {
  return (
    <View>
      <SearchBar
        {...inputProps}
        round
        lightTheme
        autoFocus
        autoCapitalize='none'
        autoCorrect={false}
        showLoadingIcon={showLoadingIcon || false}
        placeholder='Search here...'
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
      />
    </View>
  );
};

export default SearchBarComponent;

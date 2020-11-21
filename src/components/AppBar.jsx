import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: 'flex',    
    backgroundColor: theme.colors.appBar.background,    
    // ...
  },
  caption: {
      color: theme.colors.appBar.foreground,
      fontWeight: theme.fontWeights.bold,
  }
  // ...
});

const AppBar = () => {
  return (
    <TouchableWithoutFeedback>
        <View style={styles.container}>
            <Text style={styles.caption}>Repositories</Text>
        </View>
    </TouchableWithoutFeedback>
  );
};

export default AppBar;
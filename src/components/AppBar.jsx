import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import {Link} from 'react-router-native';

import Text from './Text';
import theme from '../theme';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: 'flex',    
    backgroundColor: theme.colors.appBar.background,    
  },
  caption: {
      color: theme.colors.appBar.foreground,
      fontWeight: theme.fontWeights.bold,
      padding: 10
  }
});

const AppBarTab = (props) => {
  return(
    <Link to={props.to} component={TouchableWithoutFeedback}>
      <Text style={styles.caption}>{props.title}</Text>
    </Link>    
  );
};


const AppBar = () => {
  return (
        <View style={styles.container}>
          <ScrollView horizontal>
           <AppBarTab title="Repositories" to="/"/>
           <AppBarTab title="Sign in" to="/sign" />         
           </ScrollView>
        </View>    
  );
};

export default AppBar;
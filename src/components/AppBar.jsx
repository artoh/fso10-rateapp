import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import {Link} from 'react-router-native';

import Text from './Text';
import theme from '../theme';

import useCurrentUser from '../hooks/useCurrentUser';
import useSignOut from '../hooks/useSignOut';

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

const SignOutTab = () => {
  const signOut = useSignOut();

  const onClick = async () => {
    await signOut();
  };

  return(
    <TouchableWithoutFeedback onPress={onClick}>
      <Text style={styles.caption}>Sign out</Text>
    </TouchableWithoutFeedback>
  )
}


const AppBar = () => {

  const currentUserData = useCurrentUser();
  const isLogged = currentUserData && currentUserData.data;

  return (
        <View style={styles.container}>
          <ScrollView horizontal>
           <AppBarTab title="Repositories" to="/"/>
           { isLogged && <AppBarTab title="Create a review" to="/review" />}           
           { isLogged && <AppBarTab title="My reviews" to="/myreviews" />}
  { !isLogged && <AppBarTab title="Sign in" to="/sign" />  }
  { !isLogged && <AppBarTab title="Sign up" to="/signup" />}
  { isLogged && <SignOutTab/>} 
           </ScrollView>
        </View>    
  );
};

export default AppBar;
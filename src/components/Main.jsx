import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect} from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SingleRepositoryView from './SingleRepositoryView';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviewList from './MyReviewList';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackgroud,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>      
      <Switch>
        <Route path="/" exact>
          <RepositoryList/>
        </Route>
        <Route path="/sign" exact>
          <SignIn/>
        </Route>
        <Route path="/signup" exact>
          <SignUp/>
        </Route>
        <Route path="/repositories/:id" exact>
          <SingleRepositoryView/>
        </Route>
        <Route path="/review" exact>
          <CreateReview/>
        </Route>
        <Route path="/myreviews" exact>
          <MyReviewList/>
        </Route>
        <Redirect to="/"/>
      </Switch>      
    </View>
  );
};

export default Main;
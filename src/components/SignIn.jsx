import React from 'react';

import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Formik } from 'formik';


const initialValues = {
    username: '',
    password: ''
};

const styles = StyleSheet.create ({
    view: {    
        backgroundColor: "white"
    }
});

const SignInForm = ({onSubmit}) => {

  return (
      <View style={styles.view}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" secureTextEntry />
          <TouchableWithoutFeedback onPress={onSubmit}>
              <Text button='primary'>Sign in</Text>
          </TouchableWithoutFeedback>
      </View>
  );
};


const SignIn = () => {
    const onSubmit = values => {
        console.log(values);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({handleSubmit}) => <SignInForm onSubmit={handleSubmit}/>}
        </Formik>
    );
};

export default SignIn;
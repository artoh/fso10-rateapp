import React from 'react';

import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-dom';


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

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required("Username is required"),
    password: yup
        .string()
        .required('Password is required'),
});

const SignIn = () => {    
    const [signIn] = useSignIn();
    const history = useHistory();

    const onSubmit = async values => {
        const { username, password} = values;
        try {
            await signIn({username, password});            
            history.push("/");
            
        } catch(e) {
            console.log(e);
        }
        
    };

    return (
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({handleSubmit}) => <SignInForm onSubmit={handleSubmit}/>}
        </Formik>
    );
};

export default SignIn;
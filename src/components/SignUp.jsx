import React from 'react';

import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Formik } from 'formik';
import * as yup from 'yup';

import { CREATE_USER} from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

const initialValues = {
    username: '',
    password: '',
    repeat: ''
};

const styles = StyleSheet.create({
    view: {
        backgroundColor: "#ffffff"
    }
});

const SignUpForm = ({onSubmit}) => {
    return(
        <View style={styles.view}>
            <FormikTextInput name="username" placeholder="Username"/>
            <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
            <FormikTextInput name="repeat" placeholder="Password confirmation" secureTextEntry/>
            <TouchableWithoutFeedback onPress={onSubmit} >
                <Text button="primary">Sign up</Text>
            </TouchableWithoutFeedback>            
        </View>
    );
};

const validationSheme = yup.object().shape({
    username: yup
        .string()
        .required("Username is required")
        .min(1)
        .max(30),
    password: yup
        .string()
        .required("Password is required")
        .min(5)
        .max(50),
    repeat: yup
        .string()
        .oneOf([yup.ref('password')],"Passwords do not match")
});

const SignUpContainer = ({onSubmit}) => {
    return(
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSheme}
            >
            {({handleSubmit}) => <SignUpForm onSubmit={handleSubmit}/>}
        </Formik>
    );
};

const SignUp = () => {

    const [mutate] = useMutation(CREATE_USER, {
        onError: (error) => { console.log(error);}        
    });

    const [signIn] = useSignIn();
    const history = useHistory();

    const onSubmit = async values => {
        try {
            console.log("Sign up", values);
            const {username, password} = values;
            await mutate({variables: {username, password}});
            await signIn({username, password});
            history.push("/");
        } catch(e) {
            console.log(e);
        }
    };

    return(
        <SignUpContainer onSubmit={onSubmit}/>
    );    
};

export default SignUp;
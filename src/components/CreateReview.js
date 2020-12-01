import React from 'react';

import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Formik } from 'formik';
import * as yup from 'yup';

import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';

const initialValues = {
    repositoryName: '',
    ownerName: '',
    rating: undefined,
    text: ''
};

const styles = StyleSheet.create ({
    view: {
        backgroundColor: "#ffffff"
    }
});

const CreateReviewForm = ({onSubmit}) => {
    return (
        <View style={styles.view}>
            <FormikTextInput name="ownerName" placeholder="Repository owner name" />
            <FormikTextInput name="repositoryName" placeholder="Repository name" />
            <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
            <FormikTextInput name="text" placeholder="Review" />
            <TouchableWithoutFeedback onPress={onSubmit} >
                <Text button="primary">Create a review</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required("Repository owner name is required"),
    repositoryName: yup
        .string()
        .required("Repository name is required"),
    rating: yup
        .number()
        .required("Rating is required")
        .min(0)
        .max(100),
    text: yup
        .string()
});


const CreateReviewContainer = ({onSubmit}) => {
    return( 
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            >
            {({handleSubmit}) => <CreateReviewForm onSubmit={handleSubmit}/>}
        </Formik>
    );
};

const CreateReview = () => {

    const history = useHistory();
    const [mutate]  = useMutation(CREATE_REVIEW, {
        onError: (error) => { console.log(error);},
        onCompleted: () => { history.push("/"); }
    });

    const onSubmit = values => {
        console.log(values);
        mutate({variables: {...values, rating: parseInt(values.rating) }});
    };

    return(
        <CreateReviewContainer onSubmit={onSubmit} />
    );        
};

export default CreateReview;

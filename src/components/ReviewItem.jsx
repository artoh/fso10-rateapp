import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Alert} from 'react-native';
import * as Linking from 'expo-linking';

import { DELETE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/react-hooks';

import Text from './Text';

import theme from '../theme';


const styles = StyleSheet.create({
    review : {
        marginTop: 12,
        backgroundColor: theme.colors.repository.background,        
        padding: 8,
        display: 'flex',
        flexDirection: 'column',
        
    },
    reviewTop: {
        display: 'flex',
        flexDirection: 'row',
    },
    rating: {
        padding: 10,
        alignItems: "flex-start",
        marginBottom: 'auto'
    },
    ratingText: {
        borderColor: theme.colors.primary,
        borderWidth: 2,
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 'auto',
        paddingTop: 8,
        paddingBottom: 8,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.primary
    },
    user: {
        fontWeight: theme.fontWeights.bold,
        padding: 4
    },
    date: {
        color: theme.colors.textSecondary,
        padding: 4
    },    
    text: {
        padding: 4,
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flex: 1
    },
    textContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flex: 1,
        justifyContent: 'flex-start'
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    }

});


const ReviewButtons = ({repository, id, refetch}) => {

    const [mutate] = useMutation(DELETE_REVIEW, {
        variables: {id: id},
        onError: (error) => { console.log(error);},
        onCompleted: () => { console.log("Deleted"); refetch();}
    });

    const open = () => {
        Linking.openURL(repository.url);
    };

    const deleteReview = () => {
        console.log("View alert");
        Alert.alert(
            'Delete review',
            'Are you sure you want to delete this review?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log("Canceled"),
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: mutate
                }
            ]
        );
    };
    
    
    return (
        <View style={styles.buttonsContainer}>
            <TouchableWithoutFeedback onPress={open}>
                <View style={styles.buttonContainer}>
                    <Text button="primary">View repository</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={deleteReview}>
                <View style={styles.buttonContainer}>
                    <Text button="danger">Delete review</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};


const ReviewItem = ({review, refetch}) => {
    const formatDate = (date) => {
        return date.substring(5,7) + "." + date.substring(8,10) + "." + date.substring(0,4);
    };    

    return (
        <View style={styles.review}>
            <View style={styles.reviewTop}>
                <View style={styles.rating}>
                    <Text style={styles.ratingText}>{review.rating}</Text>
                </View>
                <View style={styles.textContainer}>
                    <View>
                        { review.user &&  <Text style={styles.user}>{review.user.username}</Text> }
                        { review.repository && <Text style={styles.user}>{review.repository.fullName}</Text>}
                    </View>
                    <View>
                        <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{review.text}</Text>
                    </View>
                </View>
            </View>
            { review.repository && <ReviewButtons repository={review.repository} refetch={refetch} id={review.id}/> }
        </View>        
    );
};

export default ReviewItem;

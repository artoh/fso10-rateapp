import React from 'react';
import { View, StyleSheet} from 'react-native';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
    review : {
        marginTop: 12,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.colors.repository.background,        
        padding: 8
        
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
    }
});



const ReviewItem = ({review}) => {
    const formatDate = (date) => {
        return date.substring(5,7) + "." + date.substring(8,10) + "." + date.substring(0,4)
    };    

    return (
        <View style={styles.review}>
            <View style={styles.rating}>
                <Text style={styles.ratingText}>{review.rating}</Text>
            </View>
            <View style={styles.textContainer}>
                <View>
                    <Text style={styles.user}>{review.user.username}</Text>
                </View>
                <View>
                    <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{review.text}</Text>
                </View>
            </View>
        </View>        
    );
};

export default ReviewItem;

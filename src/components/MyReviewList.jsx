import React from 'react';
import { FlatList } from 'react-native';
import ReviewItem from './ReviewItem';
import {ItemSeparator} from './RepositoryList';
import useCurrentUser from '../hooks/useCurrentUser';

const MyReviewsListContainer = ({reviews, refetch}) => {

    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({item}) => (<ReviewItem review={item} refetch={refetch} />)}
            keyExtractor={(item) => item.id}
        />
    );
};

const MyReviewList = () => {
    const user = useCurrentUser(true);    
    console.log(user)
    const reviews = user ? user.data.reviews.edges.map(edges => edges.node) : [];        
    const refetch = user ? user.refetch : null;    

    return (
        <MyReviewsListContainer reviews={reviews} refetch={refetch} />
    );
};

export default MyReviewList;



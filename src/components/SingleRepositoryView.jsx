import React from 'react';
import { useParams } from 'react-router-dom';
import { FlatList } from 'react-native';
import useRepository from '../hooks/useRepository';

import RepositoryItem from './RepositoryItem'
import ReviewItem from './ReviewItem'
import { ItemSeparator } from './RepositoryList'


const SingleRepositoryView = () => {
    const { id } = useParams();
    const { repository, loading } = useRepository(id);

    if(loading)
        return null;

    return (
        <FlatList 
            data={repository.reviews.edges}
            renderItem={({item}) => <ReviewItem review={item.node} />}
            keyExtractor={({item}) => item.id}
            ListHeaderComponent={() => <RepositoryItem item={repository} />}
            ItemSeparatorComponent={ItemSeparator}
        />        
    );

};

export default SingleRepositoryView;
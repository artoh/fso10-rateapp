import React from 'react';
import {View, Text} from 'react-native';

const RepositoryItem = (props) => {
    return (
        <View>
            <Text>
                Full name: {props.item.fullName}<br/>
                Description: {props.item.description}<br/>
                Language: {props.item.language}<br/>
                Stars: {props.item.stargazersCount}<br/>
                Forks: {props.item.forksCount}<br/>
                Reviews: {props.item.reviewCount}<br/>
                Rating: {props.item.ratingAverage}
            </Text>
        </View>
    );
};

export default RepositoryItem;

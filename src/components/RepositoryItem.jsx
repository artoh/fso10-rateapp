import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import theme from '../theme';
import Statistic from './Statistic';

const styles = StyleSheet.create({
    flexcontainer: {
      display: 'flex',         
      flexDirection: 'column', 
      backgroundColor: theme.colors.repository.background,

      // ...
    },
    caption: {
        display: 'flex',
        flexDirection: 'row', 
    },
    description: {
        color: 'gray',
        marginTop: 4,
        marginBottom: 4
    },    
    information : {
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center'
    },
    name: {
        fontWeight: theme.fontWeights.bold,        
    },
    languageContainer:
    {
        display: 'flex',
        flexDirection: 'row'
    },
    language: {
        backgroundColor: 'blue',
        color: 'white',
        padding: 4,
        borderRadius: 4,
        flexGrow: 0,        
    },
    avatar: {
        width: 62,
        height: 62,
        borderRadius: 6,     
        margin: 8,
        flexGrow: 0
    },
    statistics: {
        display: 'flex',
        flexDirection: 'row'
    }
    // ...
  });

const RepositoryItem = (props) => {
    return (
        <View style={styles.flexcontainer}>  
            <View style={styles.caption}>
                <Image source={{uri: props.item.ownerAvatarUrl}} style={styles.avatar}/>
                <View style={styles.information}>                
                    <View>
                        <Text style={styles.name}>{props.item.fullName}</Text>
                    </View>
                    <View>
                        <Text style={styles.description}>{props.item.description}</Text>                
                    </View>
                    <View style={styles.languageContainer}>
                        <Text style={styles.language}>{props.item.language}</Text>                
                    </View>                    
                </View>
            </View>
            <View style={styles.statistics}>
                <Statistic title="Stars" count={props.item.stargazersCount}/>
                <Statistic title="Forks" count={props.item.forksCount}/>
                <Statistic title="Reviews" count={props.item.reviewCount}/>
                <Statistic title="Rating" count={props.item.ratingAverage}/>
            </View>                        
        </View>
    );
};

export default RepositoryItem;

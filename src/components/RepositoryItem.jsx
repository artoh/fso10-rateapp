import React from 'react';
import {View, StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';
import Text from './Text';

import theme from '../theme';
import Statistic from './Statistic';

import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
    flexcontainer: {
      display: 'flex',         
      flexDirection: 'column', 
      backgroundColor: theme.colors.repository.background,

      // ...
    },
    caption: {
        display: 'flex',
        flexDirection: 'row'   
    },
    description: {
        color: 'gray',
        marginTop: 4,
        marginBottom: 4,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flex: 1        
    },    
    descriptionContainer: {
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        flex: 1,
        alignItems: 'flex-start'
    },
    information : {
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flex: 1
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
    },
    gitHubBtton: {
        alignSelf: 'stretch',
        padding: 18,
        borderRadius: 4,
        fontWeight: theme.fontWeights.bold   
    },
    githubView: {
        width: '90 %'
    }
    // ...
  });

const GitHubButton = (props) => {
    const open  = () => {
        Linking.openURL(props.url);
    };

    return (
        <TouchableWithoutFeedback onPress={open} testID="openInGithubButton">
            <View style={styles.githubView}>
                <Text button="primary" style={styles.gitHubBtton}>Open in GitHub</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const RepositoryItem = (props) => {
    return (
        <View style={styles.flexcontainer} testID="Repository">  
            <View style={styles.caption}>
                <Image source={{uri: props.item.ownerAvatarUrl}} style={styles.avatar}/>
                <View style={styles.information}>                
                    <View>
                        <Text style={styles.name} testID="RepoName">{props.item.fullName}</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description} testID="RepoDesc">{props.item.description}</Text>                
                    </View>
                    <View style={styles.languageContainer} testID="RepoLanguages">
                        <Text style={styles.language}>{props.item.language}</Text>                
                    </View>                    
                </View>
            </View>
            <View style={styles.statistics}>
                <Statistic title="Stars" count={props.item.stargazersCount} />
                <Statistic title="Forks" count={props.item.forksCount} />
                <Statistic title="Reviews" count={props.item.reviewCount} />
                <Statistic title="Rating" count={props.item.ratingAverage} />
            </View>    
            { props.item.url && <GitHubButton url={props.item.url}/> }                    
        </View>
    );
};

export default RepositoryItem;

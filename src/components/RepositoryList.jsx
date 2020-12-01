import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-dom';

const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });

const ItemSeparator = () => <View style={styles.separator} />;

const LinkedRepositoryItem = ({item}) => {
  const history = useHistory();

  const onClick = () => {    
    console.log("goto " + item.id);
    history.push("/repositories/" + item.id);  
  };

  return (    
    <TouchableOpacity onPress={onClick}>      
        <RepositoryItem item={item}/>              
    </TouchableOpacity>        
  );
};


export const RepositoryListContainer = ({repositories}) => {
  
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      testID="RepositoriesContainer"
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (          
          <LinkedRepositoryItem item={item}/>
        )}
      // other props
    />
  );
};
  
const RepositoryList = () => {
  const { repositories } = useRepositories();
  
  return <RepositoryListContainer repositories={repositories}/>;
};


export default RepositoryList;
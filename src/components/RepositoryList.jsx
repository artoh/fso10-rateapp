import React, {useState} from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-dom';

import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });

export const ItemSeparator = () => <View style={styles.separator} />;

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


const OrderPicker = (order, setOrder) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => { if(value !== order) setOrder(value); }}
      value={order}
      items={[
        { label: "Latest repositories", value:"latest"},
        { label: "Highest rated repositories", value:"highest"},
        { label: "Lowest rated repositories", value:"lowest"}
      ]}
      />
  );
};

export const RepositoryListContainer = ({repositories, order, setOrder}) => {

  
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
    
  console.log("Order in listContainer ", order);

  return (    
    <FlatList
      testID="RepositoriesContainer"
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={OrderPicker(order, setOrder)}
      renderItem={({item}) => (          
          <LinkedRepositoryItem item={item}/>
        )}
      // other props
    />
  );
};
  
const RepositoryList = () => {
  const [order, setOrder] = useState("latest");
  const repositories = useRepositories(order);

  console.log("Order in list", order);
  
  return <RepositoryListContainer repositories={repositories} order={order} setOrder={setOrder}/>;
};


export default RepositoryList;
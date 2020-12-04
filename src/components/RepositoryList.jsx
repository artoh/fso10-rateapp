import React, {useState} from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-dom';

import RNPickerSelect from 'react-native-picker-select';
import { useDebounce } from 'use-debounce/lib';
import theme from '../theme';

const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
    search: {
      backgroundColor: "#ffffff",
      color: theme.colors.textPrimary,
      borderColor: theme.colors.textPrimary,
      borderWidth: 1,
      width: "100%"
    }
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

const RepositorySearch = ({filter, setFilter}) => {
  const change = (value) => { if(value !== filter) setFilter(value);}
  return (
    <TextInput 
      style={styles.search}
      placeholder="Filter repositories"
      onChangeText={change}
      value={filter}
    />
  );  
};


const OrderPicker = ({order, setOrder}) => {
  const change = (value) => { if(value !== order) setOrder(value);}

  return (
    <RNPickerSelect
      onValueChange={change}
      value={order}
      items={[
        { label: "Latest repositories", value:"latest"},
        { label: "Highest rated repositories", value:"highest"},
        { label: "Lowest rated repositories", value:"lowest"}
      ]}
      />
  );
};


const RepositoryListHeader = ({order, setOrder, filter, setFilter}) => {  
  return (
    <View>      
      <RepositorySearch filter={filter} setFilter={setFilter}/>
      <OrderPicker order={order} setOrder={setOrder}/>
    </View>
  );
};


export class RepositoryListContainer extends React.Component {

  renderHeader = () => {    
    const props = this.props;    
    return (
      <RepositoryListHeader order={props.order} setOrder={props.setOrder} filter={props.filter} setFilter={props.setFilter}/>
    );
  }

  render () {    
    const repositoryNodes = this.props.repositories
    ? this.props.repositories.edges.map(edge => edge.node)
    : [];

    const props = this.props;    

    return (    
      <FlatList
        testID="RepositoriesContainer"
        data={repositoryNodes}        
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({item}) => (          
            <LinkedRepositoryItem item={item}/>
          )}
        keyExtractor={(item) => item.id}
        onEndReached={props.onEndReach}
        onEndReachedThreshold={0.8}
      />
    );    
  }
}
  
  
const RepositoryList = () => {
  const [order, setOrder] = useState("latest");
  const [filter, setFilter] = useState("");
  const [delayedFilter] = useDebounce(filter, 200);

  const { repositories, fetchMore } = useRepositories(order, delayedFilter);

  const onEndReach = () => {
    console.log("End reached");
    fetchMore();
  };

  console.log("Order in list", order);
  
  return (
    <RepositoryListContainer 
      repositories={repositories} 
      order={order} 
      setOrder={setOrder} 
      filter={filter} 
      setFilter={setFilter}
      onEndReach={onEndReach}
    />);
};


export default RepositoryList;
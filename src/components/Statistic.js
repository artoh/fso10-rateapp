import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexGrow: 1,
        margin: 5,
        padding: 10        
    },
    count: {        
        margin: 'auto',        
    },
    countText: {
        fontWeight: theme.fontWeights.bold,        
        padding: 5
    },
    title: {        
        margin: 'auto'
    },
    titleText: {
        
    }
  });

const formatStatistic = (n) => {
    if( n < 1000)
        return n.toString();
    else
        return (n / 1000).toFixed(1) + "k";        
}

const Statistic = (props) => {
    return (
        <View style={styles.container}>  
            <View style={styles.count}>
                <Text style={styles.countText} testID="StatisticValue">{formatStatistic(props.count)}</Text>
            </View>
            <View style={styles.title}>
    <Text style={styles.titleText}>{props.title}</Text>
            </View>
        </View>
    );
};

export default Statistic;

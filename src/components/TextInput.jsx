import React from 'react';
import theme from '../theme';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input : {
        margin: 16,
        padding: 8,
        fontSize: theme.fontSizes.body,
        borderStyle: "solid",
        borderColor: "#cccccc",
        borderRadius: 4,
        borderWidth: 1
    }, 
    error: {
        borderColor: theme.colors.error
    }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, error && styles.error, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
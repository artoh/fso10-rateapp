import React from 'react';
import theme from '../theme';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input : {
        margin: 16,
        padding: 8,
        fontSize: theme.fontSizes.body,
        borderStyle: "solid",
        borderColor: "darkGray",
        borderRadius: 4,
        borderWidth: 1
    }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
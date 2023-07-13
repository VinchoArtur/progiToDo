import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
interface IProgiButton {
  title: string;
  onPress: () => void;
  styles?: {
    buttonStyle: ViewStyle;
    textStyle: ViewStyle;
  };
}
const ProgiButton: React.FC<IProgiButton> = ({
  title,
  onPress,
  styles = defaultStyles,
}) => {
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const defaultStyles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  buttonStyle: {
    backgroundColor: '#2d525a',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    opacity: 0.9,
    marginRight: 10,
  },
  textStyle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProgiButton;

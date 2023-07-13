import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  Animated, TextStyle
} from "react-native";

interface IProgiButton {
  title: string;
  onPress: () => void;
  style?: {
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
  };
  isDisabled?: boolean;
}

const ProgiButton: React.FC<IProgiButton> = ({
  title,
  onPress,
  style = {},
  isDisabled,
}) => {
  const scaleValue = new Animated.Value(1);
  const handlePressIn = () => {
    if (!isDisabled) {
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (!isDisabled) {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        tension: 20,
        useNativeDriver: true,
      }).start();
    }
  };

  const animatedButtonStyle = {
    ...defaultStyles.buttonStyle,
    ...style.buttonStyle,
    transform: [{scale: scaleValue}],
  };

  const textStyle = {
    ...defaultStyles.textStyle,
    ...style.textStyle,
  };

  const handlePress = () => {
    if (!isDisabled) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      // @ts-ignore
      style={animatedButtonStyle}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const defaultStyles = StyleSheet.create({
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

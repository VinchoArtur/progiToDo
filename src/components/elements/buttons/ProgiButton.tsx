import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  Animated,
  TextStyle,
  Image,
  Platform,
  Alert,
} from 'react-native';
import {getImageAddIcon} from '../../../utils/ImageLoader';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IProgiButton {
  title: string;
  onPress: () => void;
  icon?: string | null;
  showTitle?: boolean;
  style?: {
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
  };
  isDisabled?: boolean;
  iconSize?: number;
}

const ProgiButton: React.FC<IProgiButton> = ({
  title,
  onPress,
  style = {},
  isDisabled,
  icon,
  showTitle = true,
  iconSize = 24,
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
      {/*{requireIcon && <Image source={requireIcon.uri} />}*/}
      {(showTitle && title) && <Text style={textStyle}>{title}</Text>}
      {icon && (
        <Text style={textStyle}>
          <Icon name={icon} size={iconSize} />
          {/* Отображение иконки */}
        </Text>
      )}
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

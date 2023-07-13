import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {setTopLevelNavigator} from './Navigation';
import HomeScreen from '../components/screens/HomeScreen';
import EditTaskScreen from '../components/screens/EditTaskScreen';
import {BackHandler, Platform, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ProgiButton from '../components/elements/buttons/ProgiButton';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const Navigation: React.FC = () => {
  const handleExit = () => {
    // Код для выхода из приложения
    // В зависимости от платформы, вы можете использовать разные методы выхода
    // Например, для iOS вы можете использовать `Linking` или `AppState`, для Android - `BackHandler`, `Intent` и т.д.
    // Пример:
    if (Platform.OS === 'ios') {
      // Linking.exitApp();
    } else if (Platform.OS === 'android') {
      BackHandler.exitApp();
    }
  };

  const headerOptions = {
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerTintColor: '#fff',
    headerRight: () => <ProgiButton onPress={handleExit} title={'Exit'} />,
  };

  const screenOptions = {
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerTintColor: '#fff',
    headerRight: () => <ProgiButton onPress={handleExit} title={'Exit'} />,
    headerBackground: () => (
      <LinearGradient
        colors={['#316267', '#13434f']}
        style={styles.gradientBackground}
      />
    ),
  };

  return (
    <NavigationContainer theme={MyTheme} ref={setTopLevelNavigator}>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'ToDo App',
            ...headerOptions,
          }}
        />
        <Stack.Screen
          name="EditTask"
          // @ts-ignore
          component={EditTaskScreen}
          options={{
            title: 'Edit Task',
            ...headerOptions,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
});

export default Navigation;

import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {setTopLevelNavigator} from './Navigation';
import HomeScreen from '../components/screens/HomeScreen';
import EditTaskScreen from '../components/screens/EditTaskScreen';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const Navigation: React.FC = () => {
  return (
    <NavigationContainer theme={MyTheme} ref={setTopLevelNavigator}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'ToDo App'}}
        />
        <Stack.Screen
          name="EditTask"
          component={EditTaskScreen}
          options={{title: 'Edit Task'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

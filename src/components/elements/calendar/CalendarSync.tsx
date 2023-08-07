import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import * as RNCalendarEvents from 'react-native-calendar-events';

const CalendarSyncScreen: React.FC = () => {
  const [permissionsGranted, setPermissionsGranted] = React.useState(false);

  React.useEffect(() => {
    checkCalendarPermissions();
  }, []);

  const checkCalendarPermissions = async () => {
    try {
      const result = await RNCalendarEvents.default.checkPermissions();
      setPermissionsGranted(result === 'authorized');
    } catch (error) {
      console.error('Error checking calendar permissions:', error);
    }
  };

  const requestCalendarPermissions = async () => {
    try {
      const result = await RNCalendarEvents.default.requestPermissions();
      setPermissionsGranted(result === 'authorized');
    } catch (error) {
      console.error('Error requesting calendar permissions:', error);
    }
  };

  return (
    <View>
      {/*<Text>Calendar Sync Screen</Text>*/}
      {/*{!permissionsGranted && (*/}
      {/*  <TouchableOpacity onPress={requestCalendarPermissions}>*/}
      {/*    <Text>Request Calendar Permissions</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*)}*/}
      {/*{permissionsGranted && <Text>Calendar Permissions Granted</Text>}*/}
    </View>
  );
};

export default CalendarSyncScreen;

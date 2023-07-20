import React, {useEffect, useState} from 'react';
import {Task} from '../../redux/actions/types';
import {useDispatch} from 'react-redux';
import {navigateToEditScreen} from '../../navigation/Navigation';
import {deleteTask} from '../../redux/actions/todoActions';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles/styles';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import RNCalendarEvents from 'react-native-calendar-events';

const useTaskItem = (item: Task) => {
  const [progress, setProgress] = useState(0);

  return progress;
};

const TaskItem: React.FC<{item: Task}> = ({item}) => {
  const progress = useTaskItem(item);
  const dispatch = useDispatch();

  const handleTaskPress = () => {
    navigateToEditScreen(item.id);
  };

  const handleDeleteTask = async () => {
    // Удаляем событие из календаря перед удалением задачи
    await deleteCalendarEvent(item.title, new Date(item.dueDate));

    // Затем удаляем задачу из Redux-хранилища
    dispatch(deleteTask(item.id));
  };

  const deleteCalendarEvent = async (title: string, dueDate: Date) => {
    const permissions = await requestCalendarPermissions();

    if (permissions === RESULTS.GRANTED) {
      try {
        const events = await RNCalendarEvents.fetchAllEvents(
          // @ts-ignore
          dueDate.getTime() - 3600000, // Задаем интервал в один час для поиска события
          dueDate.getTime() + 3600000,
        );

        const eventToDelete = events.find(
          event =>
            event.title === title && event.startDate === dueDate.toISOString(),
        );

        if (eventToDelete) {
          await RNCalendarEvents.removeEvent(eventToDelete.id);
        }
      } catch (error) {
        console.error('Error deleting calendar event:', error);
      }
    } else {
      console.log('Calendar permissions not granted');
    }
  };

  const requestCalendarPermissions = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.WRITE_CALENDAR);
      return result;
    } catch (error) {
      console.error('Error requesting calendar permissions:', error);
      return RESULTS.DENIED;
    }
  };

  return (
    <TouchableOpacity onPress={handleTaskPress}>
      <View style={[styles.taskItem, item.isClosest && styles.closestTask]}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={{color: '#fff'}}>
          {item?.dueDate?.toLocaleString() || 'Нет даты исполнения'}
          {/* Отображение даты исполнения задачи */}
        </Text>
        <TouchableOpacity onPress={handleDeleteTask}>
          <Text style={styles.deleteIcon}>X</Text>
        </TouchableOpacity>
        <View style={[styles.progressBar, {width: `${progress}%`}]} />
      </View>
    </TouchableOpacity>
  );
};

export default TaskItem;

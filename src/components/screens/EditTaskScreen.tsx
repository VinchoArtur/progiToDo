import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {useNavigateBack} from '../../navigation/Navigation';
import {addTask, updateTask} from '../../redux/actions/todoActions';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {RootStackParamList, Task} from '../../redux/actions/types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ProgiButton from '../elements/buttons/ProgiButton';
import {nanoid} from 'nanoid';
import {RESULTS} from 'react-native-permissions';
import RNCalendarEvents from 'react-native-calendar-events';
import CalendarSyncScreen from '../elements/calendar/CalendarSync';

type EditTaskScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditTask'
>;

type EditTaskScreenRouteProp = RouteProp<ParamListBase, 'EditTask'>;

type EditTaskScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'EditTask'>;
  route: RouteProp<RootStackParamList, 'EditTask'>;
  taskId: string;
};

const EditTaskScreen: React.FC<EditTaskScreenProps> = ({
  navigation,
  route,
  taskId,
}: EditTaskScreenProps) => {
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find(t => t.id === route.params.taskId),
  );
  const permission = useSelector((state: RootState) => {
    return state.calendarPermission.calendarPermission;
  });
  const dispatch = useDispatch();
  const navigateBack = useNavigateBack();

  const [newTitle, setNewTitle] = useState(task?.title || '');
  const [newDueDate, setNewDueDate] = useState<Date | undefined>(
    task?.dueDate ? new Date(task.dueDate) : undefined,
  );
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [newDescription, setNewDescription] = useState(task?.description || '');

  useEffect(() => {
    if (!task) {
      setNewTitle('');
      setNewDueDate(undefined);
      setNewDescription('');
    } else {
      setNewTitle(task.title);
      setNewDueDate(new Date(task.dueDate));
      setNewDescription(task.description);
    }
  }, [task]);

  const handleCreateTask = async () => {
    const newTask: Task = {
      id: nanoid(),
      title: newTitle,
      dueDate: newDueDate || new Date(), // Сохраняем в формате ISO строку даты
      description: newDescription,
    };
    dispatch(addTask(newTask));

    // Создаем событие в календаре
    await createCalendarEvent(newTask.title, newDueDate);

    navigateBack();
  };

  const handleUpdateTask = async () => {
    if (!task) {
      handleCreateTask();
      return;
    }

    const updatedTask: Task = {
      ...task,
      title: newTitle,
      dueDate: newDueDate || '', // Сохраняем в формате ISO строку даты
      description: newDescription,
    };
    dispatch(updateTask(updatedTask));

    // Обновляем событие в календаре
    await updateCalendarEvent(updatedTask.title, newDueDate, task);

    navigateBack();
  };

  const handleCancel = () => {
    navigateBack();
  };

  const handleDateConfirm = (date: Date) => {
    setNewDueDate(date);
    setIsDateTimePickerVisible(false);
  };

  const handleOpenDateTimePicker = () => {
    setIsDateTimePickerVisible(true);
  };

  const handleCloseDateTimePicker = () => {
    setIsDateTimePickerVisible(false);
  };

  const createCalendarEvent = async (
    title: string,
    dueDate: Date | undefined,
  ) => {
    const permissions = permission;

    if (permissions === RESULTS.GRANTED) {
      try {
        await RNCalendarEvents.saveEvent(title, {
          startDate: dueDate?.toISOString() || '',
          endDate: dueDate?.toISOString() || '',
          allDay: false,
          notes: newDescription,
          alarms: [{date: -30}], // Оповещение за 30 минут до события
        });
      } catch (error) {
        console.error('Error saving calendar event:', error);
      }
    } else {
      console.log('Calendar permissions not granted');
    }
  };

  const updateCalendarEvent = async (
    title: string,
    dueDate: Date | undefined,
    taskToUpdate: Task,
  ) => {
    if (permission === RESULTS.GRANTED) {
      try {
        const existingEventParams = {
          title: taskToUpdate.title,
          startDate: new Date()?.toISOString(),
          endDate: new Date(taskToUpdate.dueDate)?.toISOString(),
          allDay: false,
          notes: taskToUpdate.description,
          alarms: [{date: -30}], // Оповещение за 30 минут до события
        };

        await RNCalendarEvents.saveEvent(title, {
          ...existingEventParams,
          // @ts-ignore
          occurrenceDate: newDueDate?.toISOString(),
        });
      } catch (error) {
        console.error('Error updating calendar event:', error);
      }
    } else {
      console.log('Calendar permissions not granted');
    }
  };

  const requestCalendarPermissions = async () => {
    try {
      permission;
    } catch (error) {
      console.error('Error requesting calendar permissions:', error);
      return RESULTS.DENIED;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Title</Text>
        <TextInput
          style={styles.input}
          value={newTitle}
          onChangeText={setNewTitle}
        />
      </View>
      <CalendarSyncScreen />
      <TouchableOpacity onPress={handleOpenDateTimePicker}>
        <DateTimePickerModal
          isVisible={isDateTimePickerVisible}
          mode="datetime"
          display="default" // Отображение только даты и времени без временной зоны
          onConfirm={handleDateConfirm}
          onCancel={handleCloseDateTimePicker}
        />
        <Text style={styles.input}>
          {newDueDate
            ? newDueDate.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : 'Select Due Date'}
        </Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={styles.descriptionInput}
          value={newDescription}
          onChangeText={setNewDescription}
          multiline={true}
          placeholderTextColor={'#fff'}
          placeholder="Enter description" // Добавлен placeholder
        />
      </View>

      <View style={styles.buttonContainer}>
        <ProgiButton
          icon={null}
          title={task ? 'Update Task' : 'Create Task'}
          onPress={task ? handleUpdateTask : handleCreateTask}
          style={{
            buttonStyle: {
              backgroundColor: 'rgba(23,211,98,0.24)',
            },
            textStyle: {
              fontWeight: '800',
              fontSize: 20,
              opacity: 1,
            },
          }}
          isDisabled={!newTitle || !newDueDate} // Добавлено условие disabled
        />
        <View style={styles.buttonSpacer} />
        <ProgiButton
          title={'Cancel'}
          onPress={handleCancel}
          icon={null}
          style={{
            buttonStyle: {
              backgroundColor: 'rgba(229,17,79,0.24)',
            },
            textStyle: {
              fontWeight: '800',
              fontSize: 20,
              opacity: 1,
            },
          }}
        />
      </View>
    </View>
  );
};

export default EditTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#133b45',
  },
  inputContainer: {
    marginBottom: 10,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    color: '#fff',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    paddingTop: 10,
    borderRadius: 5,
  },
  descriptionInput: {
    width: '100%',
    color: '#fff',
    height: 120, // Высота текстового поля для ввода описания
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10, // Отступ сверху
  },
  buttonSpacer: {
    width: 10, // Ширина отступа между кнопками
  },
});

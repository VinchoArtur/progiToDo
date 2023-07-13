import React, {useState, useEffect} from 'react';
import {
  Alert,
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
  const dispatch = useDispatch();
  const navigateBack = useNavigateBack();

  const [newTitle, setNewTitle] = useState(task?.title || '');
  const [newDueDate, setNewDueDate] = useState(task?.dueDate || '');
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [newDescription, setNewDescription] = useState(task?.description || '');

  useEffect(() => {
    if (!task) {
      setNewTitle('');
      setNewDueDate('');
      setNewDescription('');
    } else {
      setNewTitle(task.title);
      setNewDueDate(task.dueDate);
      setNewDescription(task.description);
    }
  }, [task]);

  const handleCreateTask = () => {
    const newTask: Task = {
      id: nanoid(),
      title: newTitle,
      dueDate: newDueDate,
      description: newDescription,
    };
    dispatch(addTask(newTask));
    navigateBack();
  };

  const handleUpdateTask = () => {
    if (!task) {
      handleCreateTask();
      return;
    }

    const updatedTask: Task = {
      ...task,
      title: newTitle,
      dueDate: newDueDate,
      description: newDescription,
    };
    dispatch(updateTask(updatedTask));
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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={newTitle}
        onChangeText={setNewTitle}
      />
      <TouchableOpacity onPress={handleOpenDateTimePicker}>
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
      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode="datetime"
        display="default" // Отображение только даты и времени без временной зоны
        onConfirm={handleDateConfirm}
        onCancel={handleCloseDateTimePicker}
      />
      <TextInput
        style={styles.input}
        value={newDescription}
        onChangeText={setNewDescription}
        multiline={true}
      />
      <Text style={styles.buttonContainer}>
        <ProgiButton
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
        <View style={styles.buttonSpacer} /> {/* Отступ */}
        <ProgiButton
          title={'Cancel'}
          onPress={handleCancel}
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
      </Text>
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
  input: {
    width: '80%',
    color: '#fff',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    paddingTop: 10,
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

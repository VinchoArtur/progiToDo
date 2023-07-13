import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {useNavigateBack} from '../../navigation/Navigation';
import {updateTask} from '../../redux/actions/todoActions';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {RootStackParamList, Task} from '../../redux/actions/types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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

  const handleUpdateTask = () => {
    // Обновляем задачу с новыми данными
    if (task) {
      const updatedTask: Task = {
        ...task,
        title: newTitle,
        dueDate: newDueDate,
        description: newDescription,
      };
      dispatch(updateTask(updatedTask));
    }
    navigateBack(); // Возвращаемся на предыдущий экран
  };

  const handleCancel = () => {
    navigateBack(); // Возвращаемся на предыдущий экран
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
          {newDueDate ? newDueDate.toString() : 'Select Due Date'}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={handleCloseDateTimePicker}
      />
      <TextInput
        style={styles.input}
        value={newDescription}
        onChangeText={setNewDescription}
        multiline={true}
      />
      <Button title="Update Task" onPress={handleUpdateTask} />
      <Button title="Cancel" onPress={handleCancel} />
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
  },
});

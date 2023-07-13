import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {useNavigateBack} from '../../navigation/Navigation';
import {updateTask} from '../../redux/actions/todoActions';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList, Task} from '../../redux/actions/types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type EditTaskScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditTask'
>;

type EditTaskScreenRouteProp = RouteProp<RootStackParamList, 'EditTask'>;

type EditTaskScreenProps = {
  navigation: EditTaskScreenNavigationProp;
  route: EditTaskScreenRouteProp;
};

const EditTaskScreen: React.FC<EditTaskScreenProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
  route,
}: EditTaskScreenProps) => {
  const dispatch = useDispatch();
  const taskId = route.params.taskId;
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find(t => t.id === taskId),
  );
  const navigateBack = useNavigateBack();

  const [newTitle, setNewTitle] = useState(task?.title || '');
  const [newDueDate, setNewDueDate] = useState(
    task?.dueDate?.toISOString() || '',
  );
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

  // if (!task) {
  //   return (
  //     <View>
  //       <Text>Task not found</Text>
  //     </View>
  //   );
  // }

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default EditTaskScreen;

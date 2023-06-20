import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {useNavigateBack} from '../../navigation/Navigation';
import {updateTask} from '../../redux/actions/todoActions';

interface EditTaskScreenProps {
  route: {
    params: {
      taskId: string;
    };
  };
}

const EditTaskScreen: React.FC<EditTaskScreenProps> = ({route}) => {
  const dispatch = useDispatch();
  const taskId = route.params.taskId;
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find(t => t.id === taskId),
  );
  const navigateBack = useNavigateBack();

  const handleUpdateTask = () => {
    // Обновляем задачу с новыми данными
    if (task) {
      const updatedTask = {
        ...task,
        title: newTitle,
        dueDate: newDueDate,
      };
      dispatch(updateTask(updatedTask));
    }
    navigateBack(); // Возвращаемся на предыдущий экран
  };

  const handleCancel = () => {
    navigateBack(); // Возвращаемся на предыдущий экран
  };

  if (!task) {
    return (
      <View>
        <Text>Task not found</Text>
      </View>
    );
  }

  const {title, dueDate} = task;

  let newTitle = title;
  let newDueDate = dueDate;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={newTitle}
        onChangeText={text => (newTitle = text)}
      />
      <TextInput
        style={styles.input}
        value={newDueDate}
        onChangeText={text => (newDueDate = text)}
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

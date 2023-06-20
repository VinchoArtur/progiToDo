import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {Task} from '../../redux/actions/types';
import {navigateToEditScreen} from '../../navigation/Navigation';
import {deleteTask} from '../../redux/actions/todoActions';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks); // Обновлено получение задач

  useEffect(() => {
    // Здесь можно выполнить получение задач из локального хранилища устройства
  }, []);

  const handleTaskPress = (task: Task) => {
    navigateToEditScreen(task.id); // Функция для перехода на экран редактирования задачи
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
    // Здесь можно выполнить удаление задачи из локального хранилища устройства
  };

  const renderTaskItem = ({item}: {item: Task}) => (
    <TouchableOpacity onPress={() => handleTaskPress(item)}>
      <View style={[styles.taskItem, item.isClosest && styles.closestTask]}>
        <Text>{item.title}</Text>
        <Text>{item.dueDate}</Text>
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const sortedTasks = [...tasks].sort(
    (a: Task, b: Task) =>
      new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
  ); // Обновлено сравнение задач

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedTasks}
        renderItem={renderTaskItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.taskList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Полупрозрачный фон
    padding: 10,
  },
  taskList: {
    flexGrow: 1,
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  closestTask: {
    backgroundColor: '#ffcccc', // Цвет для ближайшей задачи
  },
});

export default HomeScreen;

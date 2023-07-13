import React, {useEffect} from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {Task} from '../../redux/actions/types';
import {navigateToEditScreen} from '../../navigation/Navigation';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import TaskItem from './TaskItem';
import ProgiButton from '../elements/buttons/ProgiButton';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    // Здесь можно выполнить получение задач из локального хранилища устройства
  }, []);

  const handleCreateTask = () => {
    navigateToEditScreen(nanoid());
  };

  const sortedTasks = [...tasks].sort(
    (a: Task, b: Task) =>
      new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
  );

  const createFirstTask = () => {
    navigateToEditScreen(nanoid());
  };

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            Please Create your first task.
          </Text>
          <TouchableOpacity>
            <ProgiButton
              title={'Create task'}
              onPress={createFirstTask}
              isDisabled={false}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={sortedTasks}
            renderItem={({item}) => <TaskItem item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.taskList}
          />
          <Button title="Add Task" onPress={handleCreateTask} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#133b45',
    padding: 10,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },
  taskList: {
    flexGrow: 1,
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTitle: {
    flex: 1,
    fontWeight: 'bold',
    marginRight: 10,
  },
  deleteIcon: {
    color: 'red',
    fontSize: 18,
    marginLeft: 10,
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'purple',
  },
  closestTask: {
    backgroundColor: '#ffcccc',
  },
});

export default HomeScreen;

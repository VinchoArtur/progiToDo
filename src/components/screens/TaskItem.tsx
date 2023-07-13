import React, {useEffect, useState} from 'react';
import {Task} from '../../redux/actions/types';
import {useDispatch} from 'react-redux';
import {navigateToEditScreen} from '../../navigation/Navigation';
import {deleteTask} from '../../redux/actions/todoActions';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const useTaskItem = (item: Task) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const dueDate = item.dueDate.getTime();
      const progressPercentage = ((dueDate - currentTime) / dueDate) * 100;
      setProgress(progressPercentage);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [item]);

  return progress;
};

const TaskItem: React.FC<{item: Task}> = ({item}) => {
  const progress = useTaskItem(item);
  const dispatch = useDispatch();

  const handleTaskPress = () => {
    navigateToEditScreen(item.id);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(item.id));
    // Здесь можно выполнить удаление задачи из локального хранилища устройства
  };

  return (
    <TouchableOpacity onPress={handleTaskPress}>
      <View style={[styles.taskItem, item.isClosest && styles.closestTask]}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text>{progress}</Text>
        <Text>
          {item?.dueDate?.getTime()?.toString() || 'Нет даты исполнения'}
        </Text>
        <TouchableOpacity onPress={handleDeleteTask}>
          <Text style={styles.deleteIcon}>X</Text>
        </TouchableOpacity>
        <View style={[styles.progressBar, {width: `${progress}%`}]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    height: '160%',
    opacity: 0.3,
    backgroundColor: '#ffcccc',
  },
  closestTask: {
    backgroundColor: '#ffcccc',
  },
});

export default TaskItem;

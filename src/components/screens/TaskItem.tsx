import React, {useEffect, useState} from 'react';
import {Task} from '../../redux/actions/types';
import {useDispatch} from 'react-redux';
import {navigateToEditScreen} from '../../navigation/Navigation';
import {deleteTask} from '../../redux/actions/todoActions';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles/styles';

const useTaskItem = (item: Task) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const dueDate = item.dueDate.getTime();
      const remainingTime = dueDate - currentTime;
      const progressPercentage =
        ((dueDate - currentTime) / remainingTime) * 100;
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
        <Text style={{color: '#fff', marginRight: 1}}>{progress.toFixed(2)}%,</Text>
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

import React, {Dispatch, useEffect} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {Task} from '../../redux/actions/types';
import {navigateToEditScreen} from '../../navigation/Navigation';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import TaskItem from './TaskItem';
import ProgiButton from '../elements/buttons/ProgiButton';
import {
  addTask,
  requestCalendarPermission,
  setTasks,
} from '../../redux/actions/todoActions';
import {PERMISSIONS, request} from 'react-native-permissions';
import {loadTasksFromMemory} from '../../services/WriteReadService';

const HomeScreen: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();

  // @ts-ignore
  useEffect(() => {
    const fetchCalendarPermission = async () => {
      const permission = await request(PERMISSIONS.ANDROID.WRITE_CALENDAR);
      dispatch(requestCalendarPermission(permission));
    };
    fetchCalendarPermission().then(result => {
      console.log(result);
    });
  }, [dispatch]);

  useEffect(() => {
    const fetchTasksFromMemory = async () => {
      const tasksFromMemory: Task[] = await loadTasksFromMemory();
      if (tasksFromMemory.length > 0) {
        // Диспатчим полученные задачи в Redux для обновления состояния
        dispatch(setTasks(tasksFromMemory));
      }
    };
    fetchTasksFromMemory().then(result => {
      console.log(result);
    });
  }, [dispatch]);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const handleCreateTask = () => {
    navigateToEditScreen(nanoid());
  };

  const sortedTasks = [...tasks].sort(
    (a: Task, b: Task) =>
      new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
  );

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            Please create your first task.
          </Text>
          <TouchableOpacity>
            <ProgiButton
              icon={'add-circle-outline'}
              title={'Create task'}
              onPress={handleCreateTask}
              isDisabled={false}
              showTitle={false}
              iconSize={30}
              style={{
                buttonStyle: {
                  width: 50,
                  height: 50,
                  paddingVertical: 10,
                  paddingHorizontal: 0,
                  paddingLeft: 0,
                  paddingRight: 4,
                  borderRadius: 25,
                },
              }}
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
          <TouchableOpacity>
            <ProgiButton
              title={'Add Task'}
              onPress={handleCreateTask}
              isDisabled={false}
              icon={'add-circle-outline'}
              showTitle={false}
            />
          </TouchableOpacity>
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

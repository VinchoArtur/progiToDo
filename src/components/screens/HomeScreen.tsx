import React, { Dispatch, useEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Task } from "../../redux/actions/types";
import { navigateToEditScreen } from "../../navigation/Navigation";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import TaskItem from "./TaskItem";
import ProgiButton from "../elements/buttons/ProgiButton";
import { requestCalendarPermission, setTasks } from "../../redux/actions/todoActions";
import { PERMISSIONS, request } from "react-native-permissions";
import { loadTasksFromMemory } from "../../services/WriteReadService";
import {styles} from "./styles/home-screen.style"
import { components } from "@eva-design/eva/mapping";

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
      new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
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
              icon={"add-circle-outline"}
              title={"Create task"}
              onPress={handleCreateTask}
              isDisabled={false}
              showTitle={false}
              iconSize={50}
              style={
                {
                  buttonStyle: {
                    width: 70,
                    borderRadius: 92,
                    backgroundColor: '#133b45',
                    marginRight: 0,
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                  },
                  textStyle: {
                    textAlign: 'center'
                  }
                }
              }
            />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={sortedTasks}
            renderItem={({ item }) => <TaskItem item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.taskList}
          />
          <TouchableOpacity style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.2)",
            height: 55,
          }}>
            <ProgiButton
              title={""}
              onPress={handleCreateTask}
              isDisabled={false}
              icon={"add-circle-outline"}
              showTitle={false}
              iconSize={50}
              style={
                {
                  buttonStyle: {
                    width: 70,
                    borderRadius: 15,
                    backgroundColor: '#133b45',
                    marginRight: 0,
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                  },
                  textStyle: {
                    textAlign: 'center'
                  }
                }
              }
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};



export default HomeScreen;

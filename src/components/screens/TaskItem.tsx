import React, { useEffect, useRef, useState } from "react";
import { Task } from "../../redux/actions/types";
import { useDispatch } from "react-redux";
import { navigateToEditScreen } from "../../navigation/Navigation";
import { deleteTask } from "../../redux/actions/todoActions";
import { Animated, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles/styles";
import { PERMISSIONS, request, RESULTS } from "react-native-permissions";
import RNCalendarEvents from "react-native-calendar-events";
import ProgiButton from "../elements/buttons/ProgiButton";
import { deleteCalendarEvent, requestCalendarPermissions } from "../../services/Calendar.service";

const useTaskItem = (item: Task) => {
  const [progress, setProgress] = useState(0);

  return progress;
};

const TaskItem: React.FC<{ item: Task }> = ({ item }) => {
  const progress = useTaskItem(item);
  const dispatch = useDispatch();
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const currentDate = new Date();
  let taskStyles = {
    backgroundColor: currentDate > new Date(item?.dueDate) ? "rgba(216,11,11,0.7)" :
      currentDate >= new Date(item?.startDate) && currentDate <= new Date(item?.dueDate) ? "rgba(27,94,216,0.75)" :
        'rgba(255,255,255, 0.3)',
  };
  const handleTaskPress = () => {
    navigateToEditScreen(item.id);
  };
  const slideOutAndDelete = () => {
    Animated.timing(slideAnimation, {
      toValue: -1000, // Смещение элемента за пределы экрана
      duration: 500, // Продолжительность анимации в миллисекундах
      useNativeDriver: true // Использовать нативный драйвер
    }).start(() => {
      // По завершению анимации
      handleDeleteTask(); // Вызываем функцию удаления
    });
  };
  const handleDeleteTask = async () => {
    // Удаляем событие из календаря перед удалением задачи
    await deleteCalendarEvent(item.title, new Date(item.dueDate));

    // Затем удаляем задачу из Redux-хранилища
    dispatch(deleteTask(item.id));
  };


  return (
    <ScrollView>
      <TouchableOpacity onPress={handleTaskPress}>
        <Animated.View
          style={[
            styles.taskItem,
            item.isClosest && styles.closestTask,
            taskStyles, // Применяем стили для фона
            {
              transform: [{ translateX: slideAnimation }]
            }
          ]}
        >
          <View>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <View style={styles.timeDescription}>
              <Text style={{ color: "#fff" }}>
                {/* Отображение даты исполнения задачи */}
                {new Date(item?.startDate).toLocaleString() ||
                  "Нет даты начала исполнения"}
              </Text>
              <Text style={{ color: "#fff" }}> - </Text>
              <Text style={{ color: "#fff" }}>
                {/* Отображение даты исполнения задачи */}
                {new Date(item?.dueDate).toLocaleString() ||
                  "Нет даты окончания исполнения"}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <ProgiButton
              icon={"delete"}
              title={""}
              onPress={slideOutAndDelete}
              isDisabled={false}
              showTitle={false}
              iconSize={20}
              style={{
                buttonStyle: {
                  marginRight: 0,
                  borderRadius: 25,
                }
              }}
            />
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TaskItem;

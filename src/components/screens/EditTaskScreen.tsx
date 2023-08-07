import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useNavigateBack } from "../../navigation/Navigation";
import { addTask, updateTask } from "../../redux/actions/todoActions";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList, Task } from "../../redux/actions/types";
import ProgiButton from "../elements/buttons/ProgiButton";
import { nanoid } from "nanoid";
import { RESULTS } from "react-native-permissions";
import RNCalendarEvents from "react-native-calendar-events";
import CalendarSyncScreen from "../elements/calendar/CalendarSync";
import { Picker } from "@react-native-picker/picker";
import { addDays, addMonths } from "date-fns";
import {
  createCalendarEvent, deleteCalendarEvent,
  getEventById,
  removeEventById,
  requestCalendarPermissions
} from "../../services/Calendar.service";
import { styles } from "./styles/edit-task.style";
import DatePicker from "../elements/input/DatePicker";

type EditTaskScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "EditTask">;
  route: RouteProp<RootStackParamList, "EditTask">;
  taskId: string;
};

const EditTaskScreen: React.FC<EditTaskScreenProps> = ({
                                                         navigation,
                                                         route,
                                                         taskId
                                                       }: EditTaskScreenProps) => {
  const task = useSelector((state: RootState) =>
    // @ts-ignore
    state.tasks.tasks.find(t => t.id === route.params.taskId)
  );
  const permission = useSelector((state: RootState) => {
    return state.calendarPermission.calendarPermission;
  });
  const dispatch = useDispatch();
  RNCalendarEvents.requestPermissions().then(r => console.log(r));
  const navigateBack = useNavigateBack();
  const [newTitle, setNewTitle] = useState(task?.title || "");
  const [newDueDate, setNewDueDate] = useState<Date | undefined>(
    task?.dueDate ? new Date(task.dueDate) : undefined
  );
  const [newStartDate, setNewStartDueDate] = useState<Date | undefined>(
    task?.startDate ? new Date(task.startDate) : undefined
  );
  const [newDescription, setNewDescription] = useState(task?.description || "");
  const [notificationTime, setNotificationTime] = useState<number>(
    task?.notificationTime | 1
  );
  const [taskDuration, setTaskDuration] = useState<"day" | "week" | "month">(
    "day"
  );
  const handleTaskDurationChange = (value: "day" | "week" | "month") => {
    setTaskDuration(value);
  };

  const calculateDueDate = (duration: "day" | "week" | "month"): Date => {
    const currentDate = new Date();
    if (duration === "week") {
      currentDate.setDate(currentDate.getDate() + 7);
    } else if (duration === "month") {
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return currentDate;
  };
  useEffect(() => {
    if (!task) {
      setNewTitle("");
      setNewStartDueDate(undefined);
      setNewDueDate(undefined);
      setNewDescription("");
    } else {
      setNewTitle(task.title);
      setNewStartDueDate(new Date(task.startDate));
      setNewDueDate(new Date(task.dueDate));
      setNewDescription(task.description);
    }
  }, [task]);
  const handleCreateTask = async () => {

    const eventId = await createCalendarEvent(
      newTitle,
      // @ts-ignore
      newStartDate,
      newDueDate,
      notificationTime,
      newDescription,
      taskDuration
    );
    const newTask: Task = {
      id: nanoid(),
      eventId: eventId,
      title: newTitle,
      // @ts-ignore
      startDate: newStartDate,
      dueDate: newDueDate || calculateDueDate(taskDuration),
      description: newDescription,
      notificationTime: notificationTime
    };
    dispatch(addTask(newTask));
    navigateBack();
  };

  const handleUpdateTask = async () => {
    if (!task) {
      handleCreateTask();
      return;
    }
    const updatedTask: Task = {
      ...task,
      title: newTitle,
      startDate: newStartDate,
      dueDate: newDueDate || "", // Сохраняем в формате ISO строку даты
      description: newDescription,
      notificationTime: notificationTime
    };
    // Обновляем событие в календаре
    await updateCalendarEvent(
      updatedTask.title,
      // @ts-ignore
      newStartDate,
      // @ts-ignore
      calculateDueDate(taskDuration),
      updatedTask,
    );
    dispatch(updateTask(updatedTask));
    navigateBack();
  };
  const handleCancel = () => {
    navigateBack();
  };
  const handleDurationChange = (value: "day" | "week" | "month") => {
    // @ts-ignore
    setTaskDuration(value);
    let newDate: Date;

    if (value === "week") {
      newDate = addDays(new Date(), 7);
    } else if (value === "month") {
      newDate = addMonths(new Date(), 1);
    } else {
      newDate = addDays(new Date(), 1); // По умолчанию добавляем на один день
    }
    setNewDueDate(newDate);
  };
  const handleNotificationTimeChange = (value: number) => {
    setNotificationTime(value);
  };
  const updateCalendarEvent = async (
    title: string,
    startDate: Date,
    dueDate: Date | undefined,
    taskToUpdate: Task
  ) => {
    if (permission === RESULTS.GRANTED) {
      try {
        const alarmDate = new Date(
          // @ts-ignore
          (dueDate?.getTime() || 0) - notificationTime * 60 * 1000
        );
        // @ts-ignore
        await deleteCalendarEvent(task.title, task.dueDate)
        // @ts-ignore
        const existingEventParams = {
          title: taskToUpdate.title,
          startDate: new Date(startDate)?.toISOString(),
          endDate: new Date(taskToUpdate.dueDate)?.toISOString(),
          allDay: false,
          notes: taskToUpdate.description,
          alarms: [{date: notificationTime}],

        };
        // @ts-ignore
        taskToUpdate.eventId = await RNCalendarEvents.saveEvent(taskToUpdate.title, {
          ...existingEventParams
        });
      } catch (error) {
        console.error("Error updating calendar event:", error);
      }
    } else {
      console.log("Calendar permissions not granted");
    }
  };
  return (
    <ScrollView style={styles.scrollViewContainer}
                contentContainerStyle={styles.scrollContentContainer}
                keyboardShouldPersistTaps="handled"
    >
      <View
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Title</Text>
          <TextInput
            style={styles.input}
            value={newTitle}
            onChangeText={setNewTitle}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Продолжительность задачи</Text>
          <Picker // Компонент Picker для выбора продолжительности
            selectedValue={taskDuration}
            onValueChange={itemValue => handleDurationChange(itemValue)}>
            <Picker.Item label="На день" value="day" />
            <Picker.Item label="На неделю" value="week" />
            <Picker.Item label="На месяц" value="month" />
          </Picker>
        </View>
        <CalendarSyncScreen />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Notification Time (minutes)</Text>
          <TextInput
            style={styles.input}
            value={notificationTime?.toString()}
            onChangeText={text => handleNotificationTimeChange(Number(text))}
            keyboardType="numeric"
          />
        </View>

        {/*Select start due date*/}
        <DatePicker
          setData={setNewStartDueDate}
          date={newStartDate}
          style={styles.input}
          placeholderText={"Select Start Due Date"}
        />
        {/*Select end due date*/}
        <DatePicker
          setData={setNewDueDate}
          date={newDueDate}
          style={styles.input}
          placeholderText={"Select Due Date"}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            value={newDescription}
            onChangeText={setNewDescription}
            multiline={true}
            placeholderTextColor={"#fff"}
            placeholder="Enter description"
          />
        </View>
        <View style={styles.buttonContainer}>
          <ProgiButton
            icon={null}
            title={task ? "Update Task" : "Create Task"}
            onPress={task ? handleUpdateTask : handleCreateTask}
            style={{
              buttonStyle: {
                backgroundColor: "rgba(23,211,98,0.24)"
              },
              textStyle: {
                fontWeight: "800",
                fontSize: 20,
                opacity: 1
              }
            }}
            isDisabled={!newTitle || !newDueDate}
          />
          <View style={styles.buttonSpacer} />
          <ProgiButton
            title={"Cancel"}
            onPress={handleCancel}
            icon={null}
            style={{
              buttonStyle: {
                backgroundColor: "rgba(229,17,79,0.24)"
              },
              textStyle: {
                fontWeight: "800",
                fontSize: 20,
                opacity: 1
              }
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditTaskScreen;

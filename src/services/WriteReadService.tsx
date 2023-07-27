// Вспомогательная функция для преобразования данных в формат JSON
import {Task} from '../redux/actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const toJSON = (data: any) => JSON.stringify(data);

// Вспомогательная функция для преобразования JSON обратно в объект
const fromJSON = (json: string) => JSON.parse(json);

// Функция для сохранения списка задач в памяти телефона
export const saveTasksToMemory = async (tasks: Task[]) => {
  try {
    const tasksJSON = toJSON(tasks);
    console.log(`tasksJSON`);
    console.log(tasksJSON);
    console.log(`tasksJSON`);
    // Сохраняем в памяти телефона (здесь можно использовать AsyncStorage или другой подход для сохранения)
    await AsyncStorage.setItem('tasks', tasksJSON);
  } catch (error) {
    console.error('Error saving tasks to memory:', error);
  }
};

// Функция для загрузки списка задач из памяти телефона
export const loadTasksFromMemory = async (): Promise<Task[]> => {
  try {
    // Загружаем данные из памяти телефона (здесь можно использовать AsyncStorage или другой подход для загрузки)
    const tasksJSON: string | null = await AsyncStorage.getItem('tasks');
    return tasksJSON ? fromJSON(tasksJSON) : [];
  } catch (error) {
    console.error('Error loading tasks from memory:', error);
    return [];
  }
};

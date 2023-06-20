import {v4 as uuidv4} from 'uuid';
import {Task} from './types';

export const addTask = (title: string, dueDate: string) => ({
  type: 'ADD_TASK',
  payload: {
    id: uuidv4(),
    title,
    dueDate,
  },
});

export const deleteTask = (taskId: string) => ({
  type: 'DELETE_TASK',
  payload: taskId,
});

export const updateTask = (task: Task) => ({
  type: 'UPDATE_TASK',
  payload: task,
});

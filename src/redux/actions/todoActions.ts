import {Task} from './types';

export const addTask = (task: Task) => ({
  type: 'ADD_TASK',
  payload: task,
});

export const setTasks = (tasks: Task[]) => ({
  type: 'SET_TASKS',
  payload: tasks,
});

export const deleteTask = (taskId: string) => ({
  type: 'DELETE_TASK',
  payload: taskId,
});

export const updateTask = (task: Task) => ({
  type: 'UPDATE_TASK',
  payload: task,
});

export const requestCalendarPermission = (permission: string) => ({
  type: 'UPDATE_CALENDAR_PERMISSION',
  payload: permission,
});

export const createTaskGroup = (groupName: string, tasks: Task[]) => ({
  type: 'CREATE_TASK_GROUP',
  payload: {groupName, tasks},
});

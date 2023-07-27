import {Task} from '../redux/actions/types';
import {saveTasksToMemory} from '../services/WriteReadService';

export const SaveSingleTask = (tasks: Task[]) => {
  saveTasksToMemory(tasks)
    .then(() => console.log('single task was saved'))
    .catch(err => console.log(err));
  return tasks;
};
export const UpdateTaskBeforeSave = (tasks: Task[], action: any): Task[] => {
  const updatedTasks: Task[] = tasks.map(task =>
    task.id === action.payload.id ? action.payload : task,
  );
  saveTasksToMemory(updatedTasks)
    .then(() => console.log('saved'))
    .catch(err => {
      console.log(err);
    });
  return updatedTasks;
};

export const PrepareToDelete = (tasks: Task[], action: any): Task[] => {
  const updatedTasks: Task[] = tasks.filter(
    (task: Task) => task.id !== action.payload,
  );
  saveTasksToMemory(updatedTasks)
    .then(() => {
      console.log('tasks was updated');
    })
    .catch(err => {
      console.log(err);
    });
  return updatedTasks;
};

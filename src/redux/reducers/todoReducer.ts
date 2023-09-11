import {combineReducers} from 'redux';
import {Task} from '../actions/types';
import {
  PrepareToDelete,
  SaveSingleTask,
  UpdateTaskBeforeSave,
} from '../../utils/TaskWorker';
import { nanoid } from "nanoid";

interface TaskState {
  tasks: Task[];
  taskGroups: [],
  calendarPermission: any;
}

const initialState: TaskState = {
  tasks: [],
  calendarPermission: null,
  taskGroups: [],
};

const tasksReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: SaveSingleTask([...state.tasks, action.payload]),
      };
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: PrepareToDelete(state.tasks, action),
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: UpdateTaskBeforeSave(state.tasks, action),
      };
    case 'UPDATE_CALENDAR_PERMISSION':
      return {...state, calendarPermission: action.payload};
    case 'CREATE_TASK_GROUP':
      const newGroup = {
        groupId: nanoid(),
        groupName: action.payload,
        tasks: [],
      };
      return {
        ...state,
        taskGroups: [...state.taskGroups, newGroup],
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
  calendarPermission: tasksReducer,
  taskGroups: tasksReducer
});

export default rootReducer;

import {combineReducers} from 'redux';
import {Task} from '../actions/types';
import { PrepareToDelete, SaveSingleTask, UpdateTaskBeforeSave } from "../../utils/TaskWorker";

interface TaskState {
  tasks: Task[];
  calendarPermission: any;
}

const initialState: TaskState = {
  tasks: [],
  calendarPermission: null,
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
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
  calendarPermission: tasksReducer,
});

export default rootReducer;

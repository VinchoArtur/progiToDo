import {combineReducers} from 'redux';
import {Task} from '../actions/types';

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
        tasks: [...state.tasks, action.payload],
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task: Task) => task.id !== action.payload),
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task,
        ),
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

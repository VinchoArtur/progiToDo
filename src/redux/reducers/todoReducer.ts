import {combineReducers} from 'redux';
import {Task} from '../actions/types';

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
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
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export default rootReducer;

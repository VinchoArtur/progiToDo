import React, {useEffect} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './src/redux/store/store';
import Navigation from './src/navigation';
import {requestCalendarPermission} from './src/redux/actions/todoActions';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;

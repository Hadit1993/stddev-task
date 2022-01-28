import React from 'react';

import {Provider} from 'react-redux';
import {store} from './src/store';

import NavigationConfig from './src/utils/navigation/navigation.config';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationConfig />
    </Provider>
  );
};

export default App;

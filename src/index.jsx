import { Provider } from 'react-redux';
import { store } from 'store/index';
import AppRoute from 'components/AppRoute';
import ReactDOM from 'react-dom';
import React from 'react';

const App = () => {

  return (
    <Provider store={store}>
      <AppRoute />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
import React from 'react';
import { Provider } from 'react-redux';
import Toolbar from './containers/Toolbar';
import MainLayout from './layouts/MainLayout';
import { store } from './redux/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <MainLayout>
        {{
          toolbar: <Toolbar />,
          playground: <div />,
        }}
      </MainLayout>
    </Provider>
  );
}

export default App;
import React from 'react';
import { Provider } from 'react-redux';
import Playground from './containers/Playground';
import Toolbar from './containers/Toolbar';
import MainLayout from './layouts/MainLayout';
import EventListenerProvider from './providers/EventListenerProvider';
import { store } from './redux/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <EventListenerProvider>
        <MainLayout>
          {{
            toolbar: <Toolbar />,
            playground: <Playground />,
          }}
        </MainLayout>
      </EventListenerProvider>
    </Provider>
  );
}

export default App;
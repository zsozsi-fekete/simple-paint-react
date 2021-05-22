import React from 'react';
import MainLayout from './layouts/MainLayout';

function App(): JSX.Element {
  return (
    <MainLayout>
      {{
        toolbar: <div />,
        playground: <div />,
      }}
    </MainLayout>
  );
}

export default App;
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MantineProvider, Loader } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        colors: {
          leaf: [
            '#eaf8ef',
            '#d6f1df',
            '#b0e4c2',
            '#89d6a5',
            '#63c988',
            '#3dbb6b',
            '#2fae5f',
            '#269454',
            '#1e7a47',
            '#155f39',
          ],
          gray: [
            '#f8f9fa',
            '#f1f3f5',
            '#e9ecef',
            '#dee2e6',
            '#ced4da',
            '#adb5bd',
            '#868e96',
            '#495057',
            '#343a40',
            '#212529',
          ],
        },
        primaryShade: 5,
        primaryColor: 'leaf',
        defaultRadius: 'md',
        components: {
          Loader: Loader.extend({ defaultProps: { type: 'dots' } }),
        },
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);

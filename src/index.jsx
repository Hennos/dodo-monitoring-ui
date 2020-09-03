import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import registerServiceWorker from './registerServiceWorker';

import client from './apollo';
import App from './components/App';

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('interactiveMapRoot')
);

registerServiceWorker();

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { onError } from 'apollo-link-error';

import { ApolloProvider } from '@apollo/react-hooks';

import registerServiceWorker from './registerServiceWorker';
import buildStore from './store';

import App from './components/App';

const store = buildStore();

const httpLink = new HttpLink({
  uri: `http://${window.location.hostname}:15031/graphql`
});

const wsLink = new WebSocketLink({
  uri: `ws://${window.location.hostname}:15031/graphql`,
  options: {
    reconnect: true
  }
});

const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(
        ({ message }) => console.error(`[GraphQL error]: ${message}`) //eslint-disable-line
      );
    if (networkError) console.error(`[Network error]: ${networkError}`); //eslint-disable-line
  }),
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
  )
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('interactiveMapRoot')
);

registerServiceWorker();

import React from 'react';
import { render } from 'react-dom';

import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { onError } from 'apollo-link-error';

import { ApolloProvider } from '@apollo/react-hooks';

import registerServiceWorker from './registerServiceWorker';

import App from './components/App';

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
    if (networkError) console.error(`[Network error]: ${networkError.message}`); //eslint-disable-line
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
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('interactiveMapRoot')
);

registerServiceWorker();

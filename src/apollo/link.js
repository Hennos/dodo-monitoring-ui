import { from, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({ uri: `http://${window.location.hostname}:15031/graphql` });

const wsLink = new WebSocketLink({
  uri: `ws://${window.location.hostname}:15031/graphql`,
  options: { reconnect: true }
});

const link = from([
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

export default link;

import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import config from './config';

let apolloClient: ApolloClient<NormalizedCacheObject>;
let { httpApiUrl, wsApiUrl } = config;

const httpLink = new HttpLink({
  uri: httpApiUrl
});

const wsLink = process.browser ? new WebSocketLink({
  uri: wsApiUrl,
  options: {
    reconnect: true
  }
}) : null;

const link = process.browser ? split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  <WebSocketLink>wsLink,
  httpLink
) : httpLink;

export const initializeApollo = () => {
  apolloClient ??= new ApolloClient({
    link,
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache()
  });
  return apolloClient;
}

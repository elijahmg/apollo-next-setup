import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

let apolloClient: ApolloClient<NormalizedCacheObject | null>;

const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: 'https://api.spacex.land/graphql/', // Server URL (must be absolute)
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (
  initialState = {},
  ctx?: any
): ApolloClient<NormalizedCacheObject | null> => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    const existingCache = _apolloClient.extract();

    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
};

export const useApollo = (
  initialState = {}
): ApolloClient<NormalizedCacheObject | null> => {
  return useMemo(() => initializeApollo(initialState), [initialState]);
};

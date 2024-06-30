import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import App from './App';
import { supabase, supabaseUrl, supabaseKey } from './supabase';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Environment variables REACT_APP_SUPABASE_ANON_KEY and REACT_APP_SUPABASE_URL must be set');
}

const client = new ApolloClient({
  uri: `${supabaseUrl}/graphql/v1`,
  cache: new InMemoryCache(),
  headers: {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

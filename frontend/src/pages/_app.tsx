import '../../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../utils/hooks';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo();
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />;
    </ApolloProvider>
  )
}

export default App;
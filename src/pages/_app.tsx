import React from 'react';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary.tsx';
import { ThemeProvider } from '../components/ThemeProvider/ThemeContext.tsx';
import { AppProps } from 'next/app';
import { wrapper } from '../store/store.ts';

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...props.pageProps} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;

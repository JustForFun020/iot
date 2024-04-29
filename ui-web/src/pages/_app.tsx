import { AppProps } from 'next/app';
import '../styles/globalStyle.scss';
import { Provider } from 'react-redux';
import store from '@/redux/store';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;

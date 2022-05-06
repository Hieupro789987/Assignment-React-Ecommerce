import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'theme/base';
import { BrowserRouter } from 'react-router-dom';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { store } from './stores/store';
import 'nprogress/nprogress.css';
import { Provider } from 'react-redux';

const container: any = document.getElementById('root');

const root = createRoot(container);

root.render(
  <PayPalScriptProvider
    options={{
      'client-id':
        'AarWYi5cWtuAyebBFDnRatuAjH5wZCGTe2koK6bEcZSK_AYfW5ZjdeNnY5i348I6yAEfR0momL6NmhfY',
    }}
  >
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </PayPalScriptProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

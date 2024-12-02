import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import './index.css';
import App from './App';
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

//able to preserve state of rendered data (no need to fetch API over and over again)
const queryClient = new QueryClient()

//globalizes variables


if (process.env.NODE_ENV === 'production'){
  disableReactDevTools();
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
  </React.StrictMode>
);


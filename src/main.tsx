import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { PokemonsList } from './components/PokemonList';

const rootElement = document.getElementById('root');
console.log(store)
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <PokemonsList />
      </Provider>
    </React.StrictMode>
  );
}

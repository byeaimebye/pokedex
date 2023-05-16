// store.js
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' // Middleware para manejar acciones asíncronas
import rootReducer from './reducers/root.reducer'


const store = createStore(rootReducer, applyMiddleware(thunk))

export default store

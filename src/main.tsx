import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { allReducers } from './reducers/index.ts'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore(allReducers)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)

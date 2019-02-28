import { Provider } from 'react-redux'
import { configureStore } from 'redux-starter-kit'
import { reducer as surveyList } from './SurveyList'
import { reducer as newSurveyForm } from './NewSurveyForm'
import { reducer as surveyDetail } from './SurveyDetail'
import './index.css'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import io from 'socket.io-client'

const store = configureStore({
  reducer: {
    surveyList,
    newSurveyForm,
    surveyDetail,
  }
})


const socket = io(process.env.REACT_APP_SOCKET_URL)


socket.on('newSurvey', survey => {
  console.warn('NEW SURVEY', survey);
})


console.warn(store.dispatch({ type: 'foobar' }))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

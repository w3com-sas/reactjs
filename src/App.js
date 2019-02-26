import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import SurveyList from './SurveyList';
import NewSurvey from './NewSurvey';

export default () => {
  const [ loading, setLoading ] = useState(true)
  const [ surveys, setSurveys ] = useState([])

  useEffect(() => {
    console.warn ('FETCHING SURVEYS');
    fetch('/surveys.json')
      .catch(error => {
        console.alert('Mission Abort !!!')
      })
      .then(response => response.json())
      .catch(error => {
        console.warn('Invalid Json at /sureys.json');
        console.error(error);

        return [];
      })
      .then(surveys => {
        setLoading(false);
        setSurveys(surveys);
      })
  }, [true])

  return loading
    ? <h1>Connecting to the NASA ...</h1>
    : (
      <div className="App">
        <Header />
        <SurveyList surveys={surveys} />
        <Footer />
        <NewSurvey />
      </div>
    )
}

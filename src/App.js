import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import SurveyList from './SurveyList';
import NewSurvey from './NewSurvey';

export default () => {
  const [ loading, setLoading ] = useState(true)
  const [ surveys, setSurveys ] = useState([])

  useEffect(() => {
    fetch('http://localhost:9090/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{ surveys { id, name, by, nbAnswers, createdAt } }`,
        variables: {},
      })
    })
      .catch(error => {
        console.alert('Mission Abort !!!')

        throw error;
      })
      .then(response => response.json())
      .catch(error => {
        console.warn('Invalid Json at /sureys.json');
        console.error(error);

        return [];
      })
      .then(({ data: { surveys } }) => {
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

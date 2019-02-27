import { graphQuery } from './Util'
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import SurveyList from './SurveyList';
import NewSurvey from './NewSurvey';

export default () => {
  const [ loading, setLoading ] = useState(true)
  const [ surveys, setSurveys ] = useState([])

  useEffect(() => {
    graphQuery(`{ surveys { id, name, nbAnswers, createdAt, by } }`)
      .then(({ surveys }) => {
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

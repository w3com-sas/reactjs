import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SurveyList from './SurveyList';
import NewSurvey from './NewSurvey';

export default () =>
  <div className="App">
    <Header />
    <SurveyList />
    <Footer />
    <NewSurvey />
  </div>

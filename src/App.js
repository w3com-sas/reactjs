import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SurveyList from './SurveyList';
import NewSurveyForm from './NewSurveyForm';
import SurveyDetail from './SurveyDetail';

export default () =>
  <div className="App">
    <Header />
    <SurveyList />
    <Footer />
    <NewSurveyForm />
    <SurveyDetail />
  </div>

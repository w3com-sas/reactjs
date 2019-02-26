import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import SurveyList from './SurveyList';

// gist.github.co/Djeg
const surveys = [
  { id: 1, name: 'Que pensez vous de react ?', nbAnswers: 4, by: 'John Doe' },
  { id: 2, name: 'Que pensez vous de react ?', nbAnswers: 4, by: 'John Doe' },
  { id: 3, name: 'Que pensez vous de react ?', nbAnswers: 4, by: 'John Doe' },
  { id: 4, name: 'Que pensez vous de react ?', nbAnswers: 4, by: 'John Doe' },
  { id: 5, name: 'Que pensez vous de react ?', nbAnswers: 4, by: 'John Doe' },
  { id: 6, name: 'Que pensez vous de react ?', nbAnswers: 4, by: 'John Doe' },
  { id: 7, name: 'Que pensez vous de react ?', nbAnswers: 4, by: 'John Doe' },
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SurveyList surveys={surveys} />
        <Footer />
      </div>
    );
  }
}

export default App;
